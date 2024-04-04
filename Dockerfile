FROM node:alpine3.16
WORKDIR /gallery/backend
COPY *.json ./
RUN yarn
COPY . .
EXPOSE 3200
ENV NODE_ENV production
RUN yarn build
CMD ["yarn", "start"]