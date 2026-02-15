# 企業HP（AI×Web受託）テンプレ

このフォルダ（`hp/`）は、AI×Webサービス開発の受託向けに作成した静的な企業サイトです。

## 使い方

- ブラウザで `hp/index.html` を直接開くか、静的サーバーで配信してください。
- 例（Nodeがある場合）:

```bash
npx --yes http-server -p 5173 -c-1
```

起動後、`http://127.0.0.1:5173/hp/` で表示できます。

## 差し替えポイント（最重要）

- **社名/表記**: `hp/index.html` 内の `GJX（仮）`、フッター等
- **問い合わせの宛先メール**: `hp/assets/main.js` の `mailTo`
  - 現在は `contact@example.com` になっています
- **会社情報**: `hp/index.html` の「会社情報」セクション
- **事例**: 実際の実績に置換（公開可否に注意）

## 構成

- `hp/index.html`: 1ページ完結の企業サイト
- `hp/assets/styles.css`: スタイル
- `hp/assets/main.js`: モバイルメニュー、スムーススクロール、問い合わせフォーム（mailto作成）
- `hp/assets/favicon.svg`: SVGファビコン

