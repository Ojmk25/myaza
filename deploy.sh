# # #!/bin/bash -xe
# # #set -e
# # #sudo apt-get update
# # #sudo apt-get upgrade
# # apt-get update -y
# # # curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
# # # apt-get install jq nodejs -y --force-yes
# # # ln -sf /usr/bin/nodejs /usr/bin/node
# # echo $1
# # echo $2

# # CREDENTIALS=`aws sts assume-role --role-arn "$1" --role-session-name cil-web-deploy --output=json`
# # export AWS_DEFAULT_REGION=us-east-1
# # export AWS_ACCESS_KEY_ID=`echo ${CREDENTIALS} | jq -r '.Credentials.AccessKeyId'`
# # export AWS_SECRET_ACCESS_KEY=`echo ${CREDENTIALS} | jq -r '.Credentials.SecretAccessKey'`
# # export AWS_SESSION_TOKEN=`echo ${CREDENTIALS} | jq -r '.Credentials.SessionToken'`
# # aws sts get-caller-identity
# # cd ./web-content
# # npm config set legacy-peer-deps true
# # npm install --legacy-peer-deps
# # npm install npm@latest -g
# # # sudo npm install npm@latest -g
# # #sudo npm cache clean -f
# # # sudo npm update -g nvm
# # # npm config set strict-ssl false
# # npm run build
# # aws s3 sync ./build s3://$2/ --acl private


# #!/bin/bash

# set -e  # Exit on error

# echo "Deploying to AWS Amplify..."

# if [ -z "$AMPLIFY_APP_ID" ] || [ -z "$BRANCH_NAME" ]; then
#   echo "Error: Missing required environment variables AMPLIFY_APP_ID or BRANCH_NAME"
#   exit 1
# fi

# # Install dependencies and build the app
# cd ./web-content
# npm config set legacy-peer-deps true
# npm install --legacy-peer-deps
# npm install npm@latest -g
# npm run build

# # Trigger Amplify deployment
# aws amplify start-job \
#   --app-id $AMPLIFY_APP_ID \
#   --branch-name $BRANCH_NAME \
#   --job-type RELEASE

# echo "Deployment to AWS Amplify started successfully."
