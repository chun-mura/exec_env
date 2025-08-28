# PHP 8.2の公式イメージをベースに使用
FROM php:8.2-fpm

# 作業ディレクトリを設定
WORKDIR /app

# システムパッケージを更新し、必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# PHP拡張機能をインストール
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composerをインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# PHPコードをコピー
COPY ../php_code/ ./php_code/

# 作業ディレクトリをphp_codeに変更
WORKDIR /app/php_code

# Composerの依存関係をインストール
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --ignore-platform-reqs --verbose

# ポート8002を公開
EXPOSE 8002

# PHPの内蔵サーバーで起動
CMD ["php", "-S", "0.0.0.0:8002", "app.php"]
