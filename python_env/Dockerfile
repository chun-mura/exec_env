# Python 3.11の公式イメージをベースに使用
FROM python:3.11-slim

# 作業ディレクトリを設定
WORKDIR /app

# システムパッケージを更新し、必要なパッケージをインストール
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Pythonコードをコピー
COPY ../python_code/ ./python_code/

# 必要なPythonパッケージをインストール
RUN pip install flask

# 作業ディレクトリをpython_codeに変更
WORKDIR /app/python_code

# ポート8000を公開
EXPOSE 8000

# コンテナ起動時のコマンド
CMD ["python", "app.py"]
