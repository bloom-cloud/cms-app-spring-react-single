http://localhost:8080/api/auth/signup
{
  "username": "qwerty",
  "email": "qwerty@qwerty.com",
  "password": "qwerty",
  "firstName": "John",
  "lastName": "Doe"
}

http://localhost:8080/api/auth/signin
{
  "username": "qwerty",
  "password": "qwerty"
}


http://localhost:8080/api/public

docker build -t test
docker run -p 3000:8080 test