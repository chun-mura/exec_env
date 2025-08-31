# Node.js サンプルコード

このディレクトリには、Node.js、TypeScript、Reactのサンプルコードが含まれています。

## 📁 ディレクトリ構成

```
node_code/
├── package.json          # メインプロジェクトの設定
├── tsconfig.json         # TypeScript設定
├── index.js             # 基本的なNode.jsアプリケーション
├── app.ts               # TypeScriptサンプルアプリケーション
├── react-app/           # React TypeScriptアプリケーション
│   ├── package.json     # Reactアプリの設定
│   ├── tsconfig.json    # React用TypeScript設定
│   ├── public/          # 静的ファイル
│   └── src/             # ソースコード
└── README.md            # このファイル
```

## 🚀 使用方法

### 1. 環境の起動

```bash
# Node.js環境を起動
docker-compose up node-app

# バックグラウンドで起動する場合
docker-compose up -d node-app
```

### 2. コンテナ内での作業

```bash
# コンテナに入る
docker exec -it node-app sh

# 作業ディレクトリに移動
cd /app/node_code
```

### 3. 基本的なNode.jsアプリケーションの実行

```bash
# 依存関係のインストール
npm install

# アプリケーションの起動
npm start

# 開発モード（ファイル変更を監視）
npm run dev
```

**アクセス先**: http://localhost:3000

### 4. TypeScriptアプリケーションの実行

```bash
# TypeScriptファイルの実行
npm run ts

# 開発モード（ファイル変更を監視）
npm run ts:dev

# TypeScriptのコンパイル
npm run build
```

### 5. Reactアプリケーションの実行

```bash
# Reactアプリのディレクトリに移動
cd react-app

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start
```

**アクセス先**: http://localhost:3000

## 📚 サンプルコードの説明

### index.js - 基本的なNode.jsアプリ
- Express.jsを使用したWebサーバー
- RESTful APIエンドポイント
- JSONレスポンス
- ヘルスチェック機能

### app.ts - TypeScriptサンプル
- インターフェースとクラスの使用
- ジェネリック関数
- ユニオン型とリテラル型
- 型安全性のデモンストレーション

### Reactアプリケーション
- TypeScriptを使用したReactコンポーネント
- 状態管理（useState）
- ユーザー管理システム
- モダンなUIデザイン
- レスポンシブレイアウト

## 🔧 開発のヒント

### ホットリロード
- `npm run dev` や `npm run ts:dev` を使用すると、ファイル変更時に自動的に再起動されます
- Reactアプリは `npm start` でホットリロードが有効になります

### TypeScriptの型チェック
```bash
# 型チェックのみ実行
npx tsc --noEmit

# コンパイルしてJavaScriptファイルを生成
npm run build
```

### デバッグ
- Node.jsアプリは `console.log` でログ出力
- Reactアプリはブラウザの開発者ツールでデバッグ

## 🌐 利用可能なエンドポイント

### Node.jsアプリ（index.js）
- `GET /` - アプリケーション情報
- `GET /health` - ヘルスチェック
- `GET /api/users` - ユーザー一覧
- `POST /api/users` - 新規ユーザー作成

### Reactアプリ
- ユーザー管理インターフェース
- 統計情報の表示
- ユーザーの追加・削除機能

## 📝 カスタマイズ

各サンプルコードは学習目的で作成されています。必要に応じて以下のカスタマイズが可能です：

- データベース接続の追加
- 認証機能の実装
- 追加のAPIエンドポイント
- より複雑なReactコンポーネント
- テストコードの追加

## 🐛 トラブルシューティング

### ポートが既に使用されている場合
```bash
# 使用中のポートを確認
lsof -i :3000

# プロセスを終了
kill -9 <PID>
```

### 依存関係の問題
```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### Dockerの問題
```bash
# コンテナを再ビルド
docker-compose down
docker-compose build --no-cache node-app
docker-compose up node-app
```
