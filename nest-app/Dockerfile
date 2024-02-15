FROM node:18-buster-slim as builder

WORKDIR /build

COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . .
RUN npm run build 

# -----------------------------
FROM node:18-buster-slim

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.0 /lambda-adapter /opt/extensions/lambda-adapter
ENV PORT 3000
ENV HOME /tmp


WORKDIR /app

COPY --from=builder /build/node_modules node_modules 
COPY --from=builder /build/dist dist
COPY --from=builder /build/package.json . 

EXPOSE 3000 
CMD [ "npm", "run", "start:prod" ]