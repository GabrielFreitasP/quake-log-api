#!/bin/bash

# Script to initialize the project

# Set the default environment to "dev"
ENV=${1:-dev}

# Install dependencies
npm install

# Run docker-compose
npm run compose:up -d

# Run migrations
npm run migration:run

# Start the server based on the provided environment
case "$ENV" in
  "dev")
    npm run start:dev
    ;;
  "debug")
    npm run start:debug
    ;;
  "prod")
    npm run start:prod
    ;;
  *)
    echo "Unrecognized environment. Use 'dev', 'debug', or 'prod'."
    exit 1
    ;;
esac
