FROM node:18 as development
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

RUN npm run build


FROM node:18 as production

ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci --only=production

COPY --from=development /usr/src/app/build ./build

CMD [ "node", "build/server.js"]