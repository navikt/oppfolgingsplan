FROM node:16-alpine
WORKDIR /oppfolgingsplan

ENV NODE_ENV production

COPY server.js package.json ./

COPY node_modules ./node_modules
COPY dist ./dist
COPY server ./server

CMD ["node", "server.js"]

EXPOSE 8080
