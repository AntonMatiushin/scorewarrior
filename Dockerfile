ARG NODE_VERSION=22.0.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN npm run build
EXPOSE 3000

CMD ["yarn", "dev"]
