# Docker環境でのGoトレースビューアーの使用方法

## 概要
この設定により、Dockerコンテナ内でGoのトレースビューアーを起動し、ホストマシンからアクセスできるようになります。

## 手順

### 1. Dockerコンテナを起動
```bash
docker-compose up go-app
```

### 2. 別のターミナルでコンテナに接続
```bash
docker exec -it go-app sh
```

### 3. トレースファイルを生成
```bash
cd go_code/go-basics/11-goroutine
go run main.go
```

### 4. トレースビューアーを起動
```bash
# スクリプトを使用する場合
./start-trace.sh trace.out

# または直接コマンドを実行
go tool trace -http=:8080 trace.out
```

### 5. ブラウザでアクセス
ホストマシンのブラウザで以下のURLにアクセス：
```
http://localhost:8080
```

## 重要なポイント

- **ポート8080**: トレースビューアー用のポートとして設定
- **0.0.0.0:8080**: コンテナ内で全インターフェースにバインド
- **localhost:8080**: ホストマシンからのアクセス用

## トラブルシューティング

### ポートが開かない場合
```bash
# コンテナ内でポートの確認
netstat -tlnp | grep 8080

# コンテナのログを確認
docker logs go-app
```

### 権限エラーの場合
```bash
# スクリプトに実行権限を付与
chmod +x start-trace.sh
```

## 環境変数
- `GOTRACEBACK=all`: トレース情報を有効化
- `APP_ENV=development`: 開発環境として設定
