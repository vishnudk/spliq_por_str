FROM --platform=linux/amd64 node:22-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0" , "--poll", "2000"]


# ----------------------- #
# NGINX runtime
# ----------------------- #
# FROM --platform=linux/amd64 nginx:1.27-alpine

# COPY ../Infra/nginx/conf/nginx.conf /etc/nginx/conf/nginx.conf
# RUN rm -rf /usr/share/nginx/html/*

# # IMPORTANT: replace app-ui with actual dist folder name
# COPY --from=builder /app/dist/app-ui/browser /usr/share/nginx/html/

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]