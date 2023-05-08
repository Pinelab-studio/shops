#!/bin/bash

# format to use:
# ./deploy.sh <cloud run name> <database name> <memory>

export ENV_VARS=$(paste -sd, .env)
gcloud run deploy $1 \
            --quiet \
            --image "eu.gcr.io/pinelab-shops/vendure:latest" \
            --region "europe-west1" \
            --platform "managed" \
            --allow-unauthenticated \
            --project=pinelab-shops \
            --set-env-vars=$ENV_VARS \
            --add-cloudsql-instances="pinelab-shops:europe-west1:$2" \
            --memory=$3 \
            $4
