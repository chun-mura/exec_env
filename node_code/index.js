const express = require('express');
const app = express();
const port = 3000;

// JSONボディパーサーを有効化
app.use(express.json());

// 基本的なルート
app.get('/', (req, res) => {
  res.json({
    message: 'Node.js アプリケーションが起動しています！',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// ユーザー情報を返すエンドポイント
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: '田中太郎', email: 'tanaka@example.com' },
    { id: 2, name: '佐藤花子', email: 'sato@example.com' },
    { id: 3, name: '鈴木一郎', email: 'suzuki@example.com' }
  ];
  res.json(users);
});

// POSTリクエストの例
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: '名前とメールアドレスは必須です'
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    createdAt: new Date().toISOString()
  };

  res.status(201).json(newUser);
});

// サーバー起動
app.listen(port, () => {
  console.log(`🚀 サーバーがポート ${port} で起動しました`);
  console.log(`📱 ブラウザで http://localhost:${port} にアクセスしてください`);
  console.log(`🔍 ヘルスチェック: http://localhost:${port}/health`);
  console.log(`👥 ユーザー一覧: http://localhost:${port}/api/users`);
});
