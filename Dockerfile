FROM node:20.17.0
WORKDIR /app
COPY package.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --only=production; \
        fi

COPY . .
ENV PORT 8080
EXPOSE $PORT
CMD ["node", "src/index.js"]
