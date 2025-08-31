# Node.js 開発環境

この環境では、Node.js、TypeScript、Reactを使用した開発が可能です。

## 含まれるツール

- **Node.js 20** (Alpine Linuxベース)
- **TypeScript** - JavaScriptの型付きスーパーセット
- **ts-node** - TypeScriptファイルを直接実行
- **React** - ユーザーインターフェース構築ライブラリ
- **Vite** - 高速なビルドツール
- **nodemon** - ファイル変更の監視と自動再起動
- **concurrently** - 複数のコマンドを並行実行

## 使用方法

### 1. 環境の起動
```bash
docker-compose up node-app
```

### 2. コンテナ内での作業
```bash
# コンテナに入る
docker exec -it node-app sh

# 新しいReactプロジェクトの作成
npx create-react-app my-app --template typescript

# 既存プロジェクトの依存関係インストール
npm install

# 開発サーバーの起動
npm start

# TypeScriptファイルの実行
npx ts-node app.ts
```

### 3. ポート
- **3000**: React開発サーバー（デフォルト）

## サンプルコード

`node_code/` ディレクトリにサンプルコードが用意されています。

## 開発のヒント

- ホットリロードが有効になっているため、コードの変更は自動的に反映されます
- TypeScriptの型チェックは `npx tsc --noEmit` で実行できます
- 本番ビルドは `npm run build` で実行できます
