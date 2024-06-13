FROM directus/directus:latest

USER root
RUN corepack enable
USER node

RUN pnpm install \
  directus-extension-flexible-editor \
  @bicou/directus-extension-tiptap

