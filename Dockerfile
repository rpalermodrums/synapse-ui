FROM node:lts-bullseye-slim AS base
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev
COPY . .


FROM base as prod
RUN npm run build
CMD ["npm", "run", "preview", "--", "--port", "8080", "--mode", "production"]


FROM base as dev
RUN npm install --include=dev
CMD [ "npm", "run", "dev" ]

