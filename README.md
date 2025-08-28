# マルチ言語 Docker 実行環境

このプロジェクトは、Python、Java、Ruby、PHP、GoアプリケーションをDockerとdocker-composeで実行するための環境を提供します。

## 前提条件

- Docker
- Docker Compose

## セットアップ

### 1. リポジトリのクローン
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. 環境の起動
```bash
# コンテナのビルドと起動
docker-compose up --build

# バックグラウンドで起動する場合
docker-compose up -d --build
```

### 3. アプリケーションの確認
ブラウザで以下のURLにアクセスしてください：

#### Pythonアプリ（ポート8000）
- メインページ: http://localhost:8000
- ヘルスチェック: http://localhost:8000/health
- アプリ情報: http://localhost:8000/info

#### Rubyアプリ（ポート8001）
- メインページ: http://localhost:8001
- ヘルスチェック: http://localhost:8001/health
- アプリ情報: http://localhost:8001/info
- 計算機能: http://localhost:8001/calculate/add/5/3

#### PHPアプリ（ポート8002）
- メインページ: http://localhost:8002
- ヘルスチェック: http://localhost:8002/health
- アプリ情報: http://localhost:8002/info
- 計算機能: http://localhost:8002/calculate/add/5/3

#### Goアプリ（ポート8003）
- メインページ: http://localhost:8003
- ヘルスチェック: http://localhost:8003/health
- アプリ情報: http://localhost:8003/info
- 計算機能: http://localhost:8003/calculate/add/5/3

## 使用方法

### 基本的なコマンド

```bash
# コンテナの起動
docker-compose up

# バックグラウンドで起動
docker-compose up -d

# コンテナの停止
docker-compose down

# コンテナの再起動
docker-compose restart

# ログの確認
docker-compose logs -f app

# コンテナ内でコマンド実行
docker-compose exec python-app python -c "print('Hello from Python container')"
docker-compose exec ruby-app ruby -e "puts 'Hello from Ruby container'"
docker-compose exec php-app php -r "echo 'Hello from PHP container';"
docker-compose exec go-app go version
docker-compose exec java-app java Hello
```

### 開発時の便利なコマンド

```bash
# 依存関係のインストール（requirements.txtを更新した場合）
docker-compose exec app pip install -r requirements.txt

# テストの実行
docker-compose exec app pytest

# コードフォーマット
docker-compose exec app black .

# リントチェック
docker-compose exec app flake8 .
```

## プロジェクト構造

```
.
├── docker-compose.yml      # サービスの設定
├── python_code/           # Pythonアプリケーション
│   └── app.py            # Pythonサンプルアプリ
├── python_env/            # Python環境
│   └── Dockerfile        # Pythonコンテナの定義
├── java_code/             # Javaアプリケーション
│   └── Hello.java        # Javaサンプルアプリ
├── java_env/              # Java環境
│   └── Dockerfile        # Javaコンテナの定義
├── ruby_code/             # Rubyアプリケーション
│   └── app.rb            # Rubyサンプルアプリ
├── ruby_env/              # Ruby環境
│   └── Dockerfile        # Rubyコンテナの定義
├── php_code/              # PHPアプリケーション
│   ├── app.php           # PHPサンプルアプリ
│   └── composer.json     # PHP依存関係管理
├── php_env/               # PHP環境
│   └── Dockerfile        # PHPコンテナの定義
├── go_code/               # Goアプリケーション
│   ├── main.go           # Goサンプルアプリ
│   └── go.mod            # Goモジュール設定
├── go_env/                # Go環境
│   └── Dockerfile        # Goコンテナの定義
└── README.md              # このファイル
```

## カスタマイズ

### 新しい依存関係の追加

#### Python
`python_env/Dockerfile`の`RUN pip install`コマンドにパッケージを追加し、コンテナを再ビルドしてください。

#### Ruby
`ruby_env/Dockerfile`の`RUN gem install`コマンドにパッケージを追加し、コンテナを再ビルドしてください。

#### PHP
`php_code/composer.json`を編集して依存関係を追加し、コンテナを再ビルドしてください。vendorディレクトリは自動的に作成されます。

#### Go
`go_code/go.mod`ファイルを編集して依存関係を追加し、コンテナを再ビルドしてください。

```bash
docker-compose down
docker-compose up --build
```

### 環境変数の設定
`docker-compose.yml`の`environment`セクションで環境変数を設定できます。

### データベースの追加
コメントアウトされているデータベースサービスを有効にすることで、PostgreSQLを追加できます。

## トラブルシューティング

### ポートが既に使用されている場合
`docker-compose.yml`の`ports`セクションでポート番号を変更してください：

```yaml
ports:
  - "8002:8000"  # ホストの8002ポートをコンテナの8000ポートにマッピング
```

### コンテナが起動しない場合
ログを確認してください：

```bash
docker-compose logs app
```

### 依存関係の問題
コンテナを再ビルドしてください：

```bash
docker-compose down
docker-compose up --build
```

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
