FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.27
WORKDIR /usr/share/nginx/html

COPY --from=builder /app/build /usr/share/nginx/html/notes-ui

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
