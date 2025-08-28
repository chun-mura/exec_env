# OpenJDK 17の公式イメージをベースに使用
FROM openjdk:17-jdk-slim

# 作業ディレクトリを設定
WORKDIR /app

# システムパッケージを更新
RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

# Javaコードをコピー
COPY ../java_code/ ./java_code/

# 作業ディレクトリをjava_codeに変更
WORKDIR /app/java_code

# Javaコードをコンパイル
RUN javac *.java

# コンテナ起動時のコマンド（対話的に実行できるように）
CMD ["/bin/bash"]
