# base
# ------------------------------------------------
FROM node:18-bookworm-slim as base

RUN mkdir /app
WORKDIR /app

# Required for building the api and web distributions
FROM base as dependencies

COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml
COPY package.json package.json
COPY web/package.json web/package.json
COPY api/package.json api/package.json
COPY yarn.lock yarn.lock

RUN --mount=type=cache,target=/root/.yarn/berry/cache \
    --mount=type=cache,target=/root/.cache yarn install --immutable

COPY redwood.toml .
COPY graphql.config.js .

# web build
# ------------------------------------------------
FROM dependencies as web_build

COPY web web
RUN yarn rw build web

# api build
# ------------------------------------------------
FROM dependencies as api_build

EXPOSE 8910

COPY api api
RUN yarn rw build api

FROM dependencies

ENV NODE_ENV production

COPY --from=web_build /app/web/dist /app/web/dist
COPY --from=api_build /app/api /app/api
COPY --from=api_build /app/node_modules/.prisma /app/node_modules/.prisma

COPY .fly .fly

ENTRYPOINT ["sh"]
CMD [".fly/start.sh"]
