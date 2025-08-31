# Go 1.25の公式イメージをベースに使用
FROM golang:1.25.0-alpine

# 作業ディレクトリを設定
WORKDIR /app

# システムパッケージを更新し、必要なパッケージをインストール
# build-baseパッケージにはGCC、make、その他のビルドツールが含まれています
RUN apk add --no-cache \
    git \
    ca-certificates \
    build-base

# Goコードをコピー
COPY ../go_code/ ./go_code/

# 作業ディレクトリをgo_codeに変更
WORKDIR /app/go_code

# Goモジュールの依存関係をダウンロード
RUN go mod download

# ポート8003とトレースビューアー用ポート8080を公開
EXPOSE 8003 8080

# コンテナ起動時のコマンド（より柔軟な起動）
CMD ["sh", "-c", "go run main.go"]
