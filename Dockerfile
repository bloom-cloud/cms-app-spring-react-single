# -----------------------------
# Stage 1: Build React frontend
# -----------------------------
FROM node:18-alpine AS frontend-build

WORKDIR /app/ui

# Copy package.json and package-lock.json
COPY ui/package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy the rest of the source
COPY ui/ ./

# Build React app
# Make sure VITE_API_URL is available for your React app
ARG BACKEND_URL=http://localhost:8080
ARG FRONTEND_URL=http://localhost:8080
ENV VITE_API_URL=${BACKEND_URL}/api

RUN npm run build

# -----------------------------
# Stage 2: Build Spring Boot backend
# -----------------------------
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build

WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY api/mvnw ./mvnw
COPY api/mvnw.cmd ./mvnw.cmd
COPY api/.mvn ./.mvn
COPY api/pom.xml ./pom.xml

# Download dependencies (cached if pom.xml unchanged)
RUN chmod +x ./mvnw && ./mvnw dependency:go-offline -B

# Copy source code
COPY api/src ./src

# Build the Spring Boot JAR
RUN ./mvnw clean package -DskipTests

# -----------------------------
# Stage 3: Runtime image
# -----------------------------
FROM eclipse-temurin:17-jdk AS runtime

ARG FRONTEND_URL
ARG BACKEND_URL

WORKDIR /app

# Copy backend JAR
COPY --from=backend-build /app/target/*.jar app.jar

# Copy React build into Spring Boot static folder
COPY --from=frontend-build /app/ui/dist/ ./static/

# Expose port
EXPOSE 8080

# Set Spring profile for Docker
ENV SPRING_PROFILES_ACTIVE=docker
ENV FRONTEND_URL=${FRONTEND_URL}
ENV BACKEND_URL=${BACKEND_URL}

# Healthcheck (optional)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/api/public || exit 1

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
