import React, { useState } from 'react';
import './App.css';

// ユーザー情報の型定義
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

// アプリケーションの状態
interface AppState {
  users: User[];
  newUser: Omit<User, 'id'>;
  loading: boolean;
  message: string;
}

function App() {
  const [state, setState] = useState<AppState>({
    users: [
      { id: 1, name: '田中太郎', email: 'tanaka@example.com', age: 30 },
      { id: 2, name: '佐藤花子', email: 'sato@example.com', age: 25 },
      { id: 3, name: '鈴木一郎', email: 'suzuki@example.com', age: 35 }
    ],
    newUser: { name: '', email: '', age: undefined },
    loading: false,
    message: ''
  });

  // 新しいユーザーの追加
  const addUser = () => {
    if (!state.newUser.name || !state.newUser.email) {
      setState((prev: AppState) => ({ ...prev, message: '名前とメールアドレスは必須です' }));
      return;
    }

    const newUser: User = {
      id: Date.now(),
      name: state.newUser.name,
      email: state.newUser.email,
      age: state.newUser.age
    };

    setState((prev: AppState) => ({
      ...prev,
      users: [...prev.users, newUser],
      newUser: { name: '', email: '', age: undefined },
      message: 'ユーザーが追加されました！'
    }));

    // メッセージを3秒後にクリア
    setTimeout(() => {
      setState((prev: AppState) => ({ ...prev, message: '' }));
    }, 3000);
  };

  // ユーザーの削除
  const deleteUser = (id: number) => {
    setState((prev: AppState) => ({
      ...prev,
      users: prev.users.filter((user: User) => user.id !== id),
      message: 'ユーザーが削除されました'
    }));

    setTimeout(() => {
      setState((prev: AppState) => ({ ...prev, message: '' }));
    }, 3000);
  };

  // 入力フィールドの更新
  const updateNewUser = (field: keyof Omit<User, 'id'>, value: string | number | undefined) => {
    setState((prev: AppState) => ({
      ...prev,
      newUser: { ...prev.newUser, [field]: value }
    }));
  };

  // 統計情報の計算
  const stats = {
    totalUsers: state.users.length,
    averageAge: state.users.length > 0
      ? Math.round(state.users.reduce((sum: number, user: User) => sum + (user.age || 0), 0) / state.users.length)
      : 0
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 React TypeScript サンプルアプリ</h1>
        <p>Node.js、TypeScript、Reactを使用したユーザー管理システム</p>
      </header>

      <main className="App-main">
        {/* 統計情報 */}
        <section className="stats-section">
          <h2>📊 統計情報</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>総ユーザー数</h3>
              <p className="stat-number">{stats.totalUsers}</p>
            </div>
            <div className="stat-card">
              <h3>平均年齢</h3>
              <p className="stat-number">{stats.averageAge}歳</p>
            </div>
          </div>
        </section>

        {/* 新規ユーザー追加 */}
        <section className="add-user-section">
          <h2>➕ 新規ユーザー追加</h2>
          <div className="form-group">
            <input
              type="text"
              placeholder="名前"
              value={state.newUser.name}
              onChange={(e) => updateNewUser('name', e.target.value)}
              className="form-input"
            />
            <input
              type="email"
              placeholder="メールアドレス"
              value={state.newUser.email}
              onChange={(e) => updateNewUser('email', e.target.value)}
              className="form-input"
            />
            <input
              type="number"
              placeholder="年齢（オプション）"
              value={state.newUser.age || ''}
              onChange={(e) => updateNewUser('age', e.target.value ? parseInt(e.target.value) : undefined)}
              className="form-input"
            />
            <button onClick={addUser} className="btn btn-primary">
              追加
            </button>
          </div>
        </section>

        {/* メッセージ表示 */}
        {state.message && (
          <div className="message">
            {state.message}
          </div>
        )}

        {/* ユーザー一覧 */}
        <section className="users-section">
          <h2>👥 ユーザー一覧</h2>
          <div className="users-grid">
            {state.users.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <h3>{user.name}</h3>
                  <p>📧 {user.email}</p>
                  {user.age && <p>🎂 {user.age}歳</p>}
                </div>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="btn btn-danger"
                >
                  削除
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="App-footer">
        <p>Node.js + TypeScript + React サンプルアプリケーション</p>
      </footer>
    </div>
  );
}

export default App;
