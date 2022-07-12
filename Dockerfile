FROM node:16-alpine AS development

WORKDIR /app

RUN yarn global add @nestjs/cli

COPY ./ ./

RUN yarn

ENTRYPOINT ["yarn", "start:dev"]

EXPOSE 3333
