# syntax=docker/dockerfile:1

FROM node:16 as builder
WORKDIR /microservice
COPY package*.json ./
RUN npm set-script prepare "" && npm ci
COPY tsconfig*.json ./
COPY resources ./resources
COPY src ./src
RUN npm run build

FROM node:16 as intermediate
WORKDIR /microservice
COPY package*.json ./
RUN npm set-script prepare "" && npm ci --only=production
COPY --from=builder /microservice/build ./build
COPY --from=builder /microservice/src ./src

FROM gcr.io/distroless/nodejs:16 as final
WORKDIR /microservice
USER nonroot:nonroot
COPY --from=intermediate --chown=nonroot:nonroot /microservice ./
CMD ["build/main"]
