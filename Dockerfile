FROM node:10

RUN mkdir /code
WORKDIR /code

RUN npm install -g serve

ADD package.json /code
ADD package-lock.json /code

RUN npm install

ADD . /code

RUN npm run build

EXPOSE 3000

CMD npm run serve
