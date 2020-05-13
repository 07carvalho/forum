# FROM node
# WORKDIR /app/web
# COPY package.json /app/web
# RUN npm install
# EXPOSE 3000
# CMD ["npm", "start", "-p", "3000"]

FROM node:lts-slim
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
EXPOSE 3000
CMD [ "npm", "start" ]
