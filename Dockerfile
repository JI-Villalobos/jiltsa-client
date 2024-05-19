FROM node:18

COPY [".", "/usr/src"]

WORKDIR /usr/src

RUN yarn install

CMD ["yarn", "build"]
