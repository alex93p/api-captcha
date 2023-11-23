FROM alpine:3.17 AS builder
RUN apk add --update nodejs yarn
WORKDIR /app
COPY . .
RUN rm -rf dist
RUN yarn install
RUN yarn run build
ENV NODE_OPTIONS \
  --max-old-space-size=128 \
  --trace-warnings \
  --trace-deprecation
EXPOSE 8080
CMD [ "node", "dist/src/main.js" ]
