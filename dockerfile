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
RUN npm install

#FROM dependencies as env
#ENV NEXT_TELEMETRY_DISABLED=1

FROM dependencies AS build
# copy the app source code to the container
COPY . .
# build next app
RUN npm run build

FROM build AS run
# start the app
CMD [ "npm", "start" ]
