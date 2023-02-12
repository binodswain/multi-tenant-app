
FROM node:14-alpine

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY . .


# If you are building your code for production
# https://github.com/nodejs/docker-node/issues/282
RUN apk --no-cache --virtual build-dependencies add \
    python3 \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies


USER node
# Bundle app source

EXPOSE 4000

CMD [ "npm", "run", "start" ]