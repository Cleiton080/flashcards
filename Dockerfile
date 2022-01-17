FROM node:16-alpine AS development

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY ./ ./

RUN npm i -g @nestjs/cli

ENTRYPOINT ["npm", "run", "start:dev"]

EXPOSE 3333
