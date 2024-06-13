
## start and build local environment

docker compose up database

docker compose up

# extract template

npx directus-template-cli@latest extract

# apply template

npx directus-template-cli@latest apply
