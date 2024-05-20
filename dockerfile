FROM node:22-alpine as base
# expose the port the app will run on
EXPOSE 3000
# container's working dir
WORKDIR /app
# copy npm deps file
COPY package.json .
COPY package-lock.json .

FROM base AS dependencies
# configure npm to disable update notifier
RUN npm config set update-notifier false
# install dependencies
RUN npm install --omit=dev

FROM dependencies AS build
ENV NEXT_TELEMETRY_DISABLED=1
COPY .next .

FROM build AS run
# start the app
CMD [ "npm", "start" ]
