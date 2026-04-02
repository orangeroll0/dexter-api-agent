# ベースイメージ（公式）
FROM node:20-alpine

# 作業ディレクトリ
WORKDIR /app

# 依存関係を先にコピー（キャッシュ最適化）
COPY package*.json ./

# install
RUN npm install

# ソースコードコピー
COPY . .

# ビルド（TypeScriptの場合）
RUN npm run build

# ポート
EXPOSE 3000

# 起動
CMD ["node", "dist/index.js"]
