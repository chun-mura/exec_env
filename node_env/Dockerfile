FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /app

# パッケージマネージャーの設定
RUN npm config set registry https://registry.npmjs.org/

# グローバルにTypeScriptとReact関連のツールをインストール
RUN npm install -g typescript ts-node @types/node create-react-app vite

# 開発用のツールもインストール
RUN npm install -g nodemon concurrently

# ポート3000を公開（Reactのデフォルトポート）
EXPOSE 3000

# 開発用のコマンドを設定
CMD ["sh"]
