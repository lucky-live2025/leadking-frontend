FROM node:18-alpine

WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Copy public folder and static files for standalone mode
RUN cp -r public .next/standalone/
# Fix: Copy static files correctly (avoid double static/static path)
RUN rm -rf .next/standalone/.next/static && cp -r .next/static .next/standalone/.next/static

EXPOSE 3000

WORKDIR /app/.next/standalone

CMD ["node", "server.js"]

