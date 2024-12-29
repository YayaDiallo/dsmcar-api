FROM node:22-alpine3.20
# To set the working directory
# @see https://stackoverflow.com/questions/55624168/how-do-i-setup-dockerfile-to-run-babel-after-install
WORKDIR /usr/src/app/api

COPY yarn.lock package.json ./

# Enable corepack and set yarn to use the version defined in package.json
RUN corepack enable && corepack prepare yarn@stable --activate

# To copy files/directories
COPY . .

# To run commands
RUN yarn install

# To document the port the container is listening on
EXPOSE 8080

# To set the default command/program
# @see https://stackoverflow.com/questions/40454470/how-can-i-use-a-variable-inside-a-dockerfile-cmd
CMD ["sh", "-c", "yarn dev"]
