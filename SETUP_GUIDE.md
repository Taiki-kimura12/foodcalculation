# セットアップガイド

## 必要な環境
- Node.js 16.0以上
- npm または yarn

## インストール手順

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```

### 3. ブラウザでアクセス
http://localhost:5173

## 本番環境へのデプロイ

### Vercelへのデプロイ
```bash
npm run build
vercel
```

## トラブルシューティング
問題が発生した場合は、以下を試してください:
1. `node_modules` を削除して再インストール
2. キャッシュをクリア
3. Node.jsのバージョンを確認
