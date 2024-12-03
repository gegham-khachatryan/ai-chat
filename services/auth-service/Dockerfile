FROM node:18 AS build

ARG NODE_ENV=production

WORKDIR /usr/src/

COPY package.json ./services/auth-service/
COPY package-lock.json ./
COPY tsconfig.json ./services/auth-service/
COPY ./src/ ./services/auth-service/src/
COPY ./libs ./libs

RUN echo "{ \"workspaces\": [\"services/*\", \"libs/*\"] }" > ./package.json
RUN NODE_ENV=development npm ci
RUN npm run build --workspace=services

RUN find . -type d -name "node_modules" -exec rm -rf {} +
RUN find . -type d -name "src" -exec rm -rf {} +
RUN find . -type f -name "tsconfig.*" -exec rm -rf {} +

RUN npm ci --omit=dev

FROM node:18-bullseye-slim

ARG VERSION
ENV VERSION=$VERSION

WORKDIR /usr/src/services/auth-service

EXPOSE 3000
COPY --from=build /usr/src/ /usr/src/

CMD ["npm", "start"]
