// TypeScriptの基本的な機能をデモンストレーション

// インターフェースの定義
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // オプショナルプロパティ
}

// 列挙型の定義
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// クラスの定義
class UserManager {
  private users: User[] = [];

  constructor(initialUsers: User[] = []) {
    this.users = initialUsers;
  }

  // ユーザーの追加
  addUser(user: User): void {
    this.users.push(user);
    console.log(`ユーザー "${user.name}" が追加されました`);
  }

  // ユーザーの検索
  findUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  // ユーザー一覧の取得
  getAllUsers(): User[] {
    return [...this.users]; // 配列のコピーを返す
  }

  // ユーザー数の取得
  getUserCount(): number {
    return this.users.length;
  }
}

// ジェネリック関数の例
function createArray<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

// ユニオン型とリテラル型の例
type Status = 'success' | 'error' | 'loading';
type ApiResponse<T> = {
  status: Status;
  data?: T;
  message?: string;
};

// 関数の型定義
type MathFunction = (a: number, b: number) => number;

// 実際の使用例
function main(): void {
  console.log('=== TypeScript サンプルアプリケーション ===\n');

  // ユーザーマネージャーの初期化
  const initialUsers: User[] = [
    { id: 1, name: '田中太郎', email: 'tanaka@example.com', age: 30 },
    { id: 2, name: '佐藤花子', email: 'sato@example.com', age: 25 }
  ];

  const userManager = new UserManager(initialUsers);

  // 新しいユーザーの追加
  const newUser: User = {
    id: 3,
    name: '鈴木一郎',
    email: 'suzuki@example.com',
    age: 35
  };

  userManager.addUser(newUser);

  // ユーザー一覧の表示
  console.log('\n--- ユーザー一覧 ---');
  const allUsers = userManager.getAllUsers();
  allUsers.forEach(user => {
    console.log(`ID: ${user.id}, 名前: ${user.name}, メール: ${user.email}, 年齢: ${user.age || '未設定'}`);
  });

  // 特定のユーザーの検索
  console.log('\n--- ユーザー検索 ---');
  const foundUser = userManager.findUserById(2);
  if (foundUser) {
    console.log(`検索結果: ${foundUser.name} (${foundUser.email})`);
  }

  // ジェネリック関数の使用
  console.log('\n--- ジェネリック関数 ---');
  const numberArray = createArray(5, 42);
  const stringArray = createArray(3, 'hello');
  console.log('数値配列:', numberArray);
  console.log('文字列配列:', stringArray);

  // ユニオン型の使用
  console.log('\n--- ユニオン型 ---');
  const responses: ApiResponse<User>[] = [
    { status: 'success', data: newUser },
    { status: 'error', message: 'ユーザーが見つかりません' },
    { status: 'loading' }
  ];

  responses.forEach((response, index) => {
    console.log(`レスポンス ${index + 1}:`, response);
  });

  // 数学関数の型定義の使用
  console.log('\n--- 数学関数 ---');
  const add: MathFunction = (a, b) => a + b;
  const multiply: MathFunction = (a, b) => a * b;

  console.log(`5 + 3 = ${add(5, 3)}`);
  console.log(`5 × 3 = ${multiply(5, 3)}`);

  // 統計情報の表示
  console.log('\n--- 統計情報 ---');
  console.log(`総ユーザー数: ${userManager.getUserCount()}`);
  console.log(`平均年齢: ${calculateAverageAge(allUsers)}`);
}

// ヘルパー関数
function calculateAverageAge(users: User[]): number {
  const usersWithAge = users.filter(user => user.age !== undefined);
  if (usersWithAge.length === 0) return 0;

  const totalAge = usersWithAge.reduce((sum, user) => sum + (user.age || 0), 0);
  return Math.round(totalAge / usersWithAge.length);
}

// アプリケーションの実行
main();

export { User, UserRole, UserManager, createArray, ApiResponse, MathFunction };
