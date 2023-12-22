# 使用 Node.js 18 作為基礎映像
FROM node:18.18.2

# 設定工作目錄
WORKDIR /app

# 將本地目錄複製到容器中
COPY . .

# 安裝 PM2 全域套件
RUN yarn global add pm2

# 使用 PM2 啟動應用程序
CMD ["pm2-runtime", "start", "ecosystem.config.js"]