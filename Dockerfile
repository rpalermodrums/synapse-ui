#############################################
############ BUILDER IMAGE ##################
#############################################

FROM node:lts-bullseye-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install --include=optional

COPY . .
RUN pnpm run build

#############################################
######### DEV / TESTING IMAGE ###############
#############################################

FROM builder as dev
WORKDIR /app

CMD [ "pnpm", "run", "dev" ]

#############################################
############ Production IMAGE ###############
#############################################

FROM node:lts-bullseye-slim as prod
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN pnpm install --omit=dev && pnpm i vite

COPY --from=builder /app/dist ./dist
CMD ["pnpm", "run", "preview", "--", "--port", "8080", "--mode", "production"]
