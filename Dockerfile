FROM node:6.7.0

RUN mkdir /app

VOLUME /app
WORKDIR /app

CMD npm build && npm start
