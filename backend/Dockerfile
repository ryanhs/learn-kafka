FROM node:8.11-alpine
MAINTAINER ryanhs <mr.ryansilalahi@gmail.com>

# build
RUN mkdir -p /app
ADD . /app
WORKDIR /app
RUN yarn && yarn build && npm i -g pm2

# default env
ENV NODE_ENV=production \
	APP_NAME=app-engine \
	APP_PORT=4000 \
	APP_GRAPHQL_SUBSCRIPTION=false

# Expose ports needed
EXPOSE 4000

# Start pm2.json process file
CMD ["pm2-runtime", "start", "pm2.json"]
