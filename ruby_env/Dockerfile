# Ruby 3.2の公式イメージをベースに使用
FROM ruby:3.2-slim

# 作業ディレクトリを設定
WORKDIR /app

# システムパッケージを更新し、必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Rubyコードをコピー
COPY ../ruby_code/ ./ruby_code/

# 作業ディレクトリをruby_codeに変更
WORKDIR /app/ruby_code

# 必要なRubyパッケージをインストール
RUN gem install sinatra json rackup puma

# ポート8001を公開
EXPOSE 8001

# コンテナ起動時のコマンド
CMD ["ruby", "app.rb"]
