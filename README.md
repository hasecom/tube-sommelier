# はじめてのNext.js

  
  

動画プレイリスト共有サービス作成（一部未実装）

(利用規約に抵触する恐れがあり断念)

## 環境
- データベース：MySql
- バックエンド：PHP 7.4
- フロントエンド：Next.js
- ユーザインタフェース：Chakra UI / Swiper
- デザイン：Tailwind.css
- パッケージ管理：npm /  Composer
- API：YouTube Data API v3

## 実装機能

### 認証
ステートレス認証をすべく、JWT認証を採用。
ユーザ認証時、公開鍵暗号方式（RS256使用)において、デジタル署名を行なったアクセストークンをCookieにセット、リフレッシュトークンは、データベースにセット。
アクセストークンは30分、リフレッシュトークンは12日間を有効期限とし、アクセストークンのみ期限が切れた場合は、リフレッシュトークンによってアクセストークンを再発行する。リフレッシュトークンの有効期限が切れた場合は、ログインによりトークンを再発行する。

リクエストごとに、アクセストークンによる本人証明かつ改ざん検知を行なった。

withCredentials=trueとし、非ログインユーザ/ログインユーザ/自分自身を分岐処理。
- ログイン
- 新規登録
- 各種リクエスト処理


### ER図

![ER図](./tube.jpg)


### 改善点（反省点）

-  **バックエンドのリポジトリを公開できない。**
メールやAPIの検証として、コードにアドレスやシークレットトークンを記述し、コミットしてしまったので、変更履歴が残ってしまったあー（プライベートポチり)

- **フロントのフォルダ構成がバラバラになってしまった。**
UI部品や、UserActionごとにコンポーネント化してしまったことにより、指向性のない構成となった。
また、Propsや型定義に制約を設けなかったため、
似た処理に対し、定義方法がバラバラになった。
ファイル名も。。慣れてきたので、フォルダ構成を勉強したいな。

- **カスタムフックやproviderを活用する。**
providerやカスタムフックをプロジェクトの途中から使い方を理解できたので、今後は活用し統一化を図る。
  
- **バリデーションライブラリを活用する。**
  VueのVeeValidateのようなライブラリーを活用したい。。
  楽。

