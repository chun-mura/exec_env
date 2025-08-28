# Go 1.21の公式イメージをベースに使用
FROM golang:1.21-alpine

# 作業ディレクトリを設定
WORKDIR /app

# システムパッケージを更新し、必要なパッケージをインストール
RUN apk add --no-cache \
    git \
    ca-certificates

# Goコードをコピー
COPY ../go_code/ ./go_code/

# 作業ディレクトリをgo_codeに変更
WORKDIR /app/go_code

# Goモジュールの依存関係をダウンロード
RUN go mod download

# ポート8003を公開
EXPOSE 8003

# コンテナ起動時のコマンド
CMD ["go", "run", "main.go"]
