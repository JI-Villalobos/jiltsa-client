FROM node:22

COPY [".", "/usr/src"]

WORKDIR /usr/src

RUN yarn install

CMD ["yarn", "dev"]
