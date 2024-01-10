FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

CMD ["node", "build"]