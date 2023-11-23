## API Captcha

## How it works
The solution has two endpoints as the documentation OpenApi shows (file: `docs/api/openapi.json`).

---
One endpoint (`POST /captcha`) offers to create a challenge for a client.

It generates an SVG image, based on optional parameters (`size, width, height`), that is returned to the client as URI encoded string besides the captcha id to be referred for the verification step.

The service saves the text verification into a Redis database as a key-value entry. The key is the captcha id for the challenge, the value is the text for the verification.

---
The other one endpoint (`PUT /captcha/:captchaID`) offers to verify the challenge for a client who has requested one before.

It takes the captcha id and the text for the verification and check into Redis if an entry exists with the provided captcha id and if the text matches with the value saved. The service returns to the client the result of the challenge (`true | false`).

The entry, then, is removed from the database to mitigate brute force attacks, in case of failure, and to mitigate reuse of a successful verification text.

## Setup environment
As `.env` file ignored, run the following command to create a new one with variables to test this service in Docker within a docker network.

If you want to test it into another context, feel free to edit the variable that is pointing to Redis host.
```shell
# cat environment variables into .env file
cat > .env << EOF
# CONFIG
NODE_CONFIG_DIR="src/config"
# ENVIRONMENT
NODE_ENV="dev"
# SERVER
SERVER_PORT="8080"
SERVER_URL="http://127.0.0.1:8080"
# PARAMS
CAPTCHA_CONFIG_MIN_SIZE="4"
CAPTCHA_CONFIG_MAX_SIZE="8"
# REDIS
REDIS_HOST="redis-captcha"
REDIS_PORT="6379"
REDIS_TTL="10"
EOF
```

## Docker
```shell
# create docker network
docker network create captcha

# run redis container
docker run -d \
  --name redis-captcha \
  --network=captcha \
  -p 6379:6379 \
  redis:7.2.3
# the binding port is just for the purpose of the exercise if you want to look inside the database
# anyway you can omit the arguments -p if you don't need it

# build microservice image
docker build \
  -t api-captcha:0.0.1-beta1 \
  -f Dockerfile \
  .

# run microservice container
docker run -d \
  --name api-captcha \
  --network=captcha \
  -p 8080:8080 \
  api-captcha:0.0.1-beta1
```

## HTTP call
Feel free to use any http client to test endpoints.

Make a call to `http://localhost:3000/api/v1/captcha` with method `POST` as documentation to create a captcha challenge.

Look into console to get the verification text generated (this is just for purpose of the exercise).

Make a call to `http://localhost:3000/api/v1/captcha/:captchaID` with method `PUT` as documentation to verify a captcha challenge.

