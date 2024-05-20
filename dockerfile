FROM node:22-alpine as base
# container's working dir
WORKDIR /app
# copy npm deps file
COPY package.json .
COPY package-lock.json .

FROM base AS dependencies
# configure npm to disable update notifier
RUN npm config set update-notifier false
# install production dependencies
RUN npm ci --omit=dev

FROM dependencies AS build
# disable telemetry
ENV NEXT_TELEMETRY_DISABLED=1
# copy next app build files
# COPY .next . # doesn't work (npm command start not found, did you mean star or stars?)
# copy all other files
COPY . .

FROM build AS run
# expose the port the app will run on
EXPOSE 3000
# start the app
CMD [ "npm", "run", "start" ]
