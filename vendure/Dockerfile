FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY . .
RUN yarn install
RUN yarn build

# PhantomJS fix https://github.com/bazelbuild/rules_closure/issues/351
ENV OPENSSL_CONF=/dev/null

# Run the web service on container startup.
CMD [ "yarn", "start" ]
