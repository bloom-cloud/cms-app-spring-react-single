# Boot up locally
### Backend
```
1. Run ApiApplication once to create a run config. And close
2. Rename .env.example to .env file and update properties
3. Modify config and activate dotenv plugin in the menu. Specify the .env file in the resources
4. Run app
```

#### Frontend
```
cd ui
npm run dev
```

# Build as docker container and run
Make sure .env file is loaded with real envs
```
docker-compose up --build
```

# Build jar file locally
```
# in root folder
cd ui && npm install && npm run build
cp -r dist/* ../api/src/main/resources/static/
cd ../api && ./mvnw clean package -DskipTests
```
Run it as jar
```
java -jar api-0.0.1-SNAPSHOT.jar --spring.security.oauth2.client.registration.google.client-id= --spring.security.oauth2.client.registration.google.client-secret=
```


# Generate free ssl on server
```
sudo apt update
sudo apt install snapd -y
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

// this will generate perm file
/etc/letsencrypt/live/yourdomain.com/fullchain.pem
/etc/letsencrypt/live/yourdomain.com/privkey.pem
```