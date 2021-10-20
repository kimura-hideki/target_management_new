# target-management

目標管理用のリポジトリ

## 要約

要約ってほどのことは無いが、目標管理のネタ  
今回はReact.jsを使用してなにかを作るらしいので公開するにはかなりイケてないがアップします。  
（なにかの役に立てばよいが・・・）、あと間違ってたらすいません。

## 用意するもの

* wsl(ubuntu)
* vscode
* Node.js
* yarn or npm
* python(pyenv pipenv想定)
* mysql

## 実行前の準備

詳しい手順は自身で調べてください。

* wsl(ubuntu)にGit,Node.js,yarn or npmをインストール  
* pyenv pipenvをインストール
* 上記に必要なパッケージはaptなどでインストールしてください。
* vscodeにはJS・Reactに必要な拡張機能をインストールしておく

## 実行方法

キチンと必要なものがインストール・設定がされていれば動くはず

Gitでclone作成後に該当ディレクトリで以下を実行

```shell
pipenv install
```

別のコンソールで以下(vscodeでターミナルの切替でもOK)

```shell
yarn install
または 
npm install
```

バックエンド側(Python 3.9想定)  
必要なパッケージがダウンロード・インストールされます。  
詳しくは```Pipfile```を参照してください。  

フロントエンド側(JS)については  
まずはこれでコンパイル・実行に必要な```node_module```がカレントディレクトリに  
ダウンロードされてきます。  
詳しくは```package.json```を参照してください。  

少し問題は残ってますが、フロントエンドとバックエンドを結合させた環境となっております。  
起動方法については以下  

```shell
pipenv run start  ← バックエンドが起動します(localhost:3000)
yarn start ← フロントエンドが起動します(localhost:5000)
または
npm run start ← フロントエンドが起動します(localhost:5000)
```

この時点でブラウザが立ち上がってくると思いますので、動かしながらソースの修正等をおこなってください。  
(http://localhost:5000)で立ち上がってきます。  
JS側を修正するとブラウザに反映されますが、コンパイルされたファイルは作成されません。(メモリ上展開)  
なのでバックエンド側(localhost:3000)でアクセスすると404になります。  
バックエンド側で起動したい場合は...  

```shell
yarn dev
または
npm run dev
```

いちどJSをコンパイルしてlocalhost:3000でアクセスしてください。  
この状態でもソース変更に伴い再コンパイルは発生しますが、ブラウザキャッシュされてしまうため  
変更の際はキャッシュクリアしてください。  

どの様にフロントエンドとバックエンドを連携しているかについては  
```webpack.config.js, package.json```を参照したり、Flask側/app配下のソースを参照すると  
わかるかもしれません、見て調べるのものありです。

## 現在のディレクトリ・ファイル構成(2021/10/20時点)

```shell
.
├── Pipfile
├── Pipfile.lock
├── README.md
├── app
│   ├── __init__.py
│   ├── api
│   │   ├── cars.py
│   │   ├── items.py
│   │   ├── login.py
│   │   ├── menu.py
│   │   ├── users.py
│   ├── frontend
│   │   ├── App.js
│   │   ├── components
│   │   │   ├── form
│   │   │   │   └── CheckBoxControl.js
│   │   │   │   └── MakerSeleCtcontrol.js
│   │   │   │   └── TextCtcontrol.js
│   │   │   ├── Item.tsx
│   │   │   └── ItemList.js
│   │   │   └── LogoutButton.js
│   │   └── pages
│   │       ├── cars
│   │       │   └── CarAddForm.js
│   │       │   └── CarComplete.js
│   │       │   └── CarForm.js
│   │       │   └── CarsList.js
│   │       │   └── index.js
│   │       ├── items
│   │       │   └── index.js
│   │       ├── login
│   │       │   ├── LoginFrom.js
│   │       │   └── index.js
│   │       └── menu
│   │           └── index.js
│   │       └── users
│   │           └── index.js
│   │           └── UserAddForm.js
│   │           └── UserForm.js
│   │           └── UserRegisterButtonControl.js
│   │           └── UsersList.js
│   ├── models
│   │   ├── __init__.py
│   │   ├── car.py
│   │   ├── item.py
│   │   ├── login.py
│   │   └── user.py
│   ├── static
│   ├── templates
│   │   ├── dist
│   │   │   └── bundle.js
│   │   └── index.html
│   └── views
│       ├── items.py
│       ├── login.py
│       └── memu.py
├── db
│   ├── cars.sql
│   ├── items.sql
│   └── users.sql
├── db.py
├── package.json
├── server.py
├── settings.py
├── tsconfig.json
├── webpack.config.js
└── yarn.lock
```

## 解説など

2021年5月27日現在、大きく構成を変えてしまったため処理部分の記述を一切しておりません。  
ここは順次対応していきます。  

## その他

JS(React)について。。。  
今回は、なんとなくゼロからの構築みたいになっているが公式にいろいろな  
ツールチェインがあると書いてあるので、試してみるのもありですね。  
<https://ja.reactjs.org/docs/create-a-new-react-app.html#create-react-app>

ESLint(静的解析ツール)を導入しました。  
ESLint ルール 一覧 (日本語)  
<https://garafu.blogspot.com/2017/02/eslint-rules-jp.html>

多少縛りがきついほうが、きれいにかけるかもよ。
ルールは後見直してみます。  


## 作ってみて

部品化したパーツにエラー内容等を連携するのに若干悩みましたが、それ以外は特段手を止めることなく作業を進めることができました。

また、makeStylesを利用して車両情報の検索結果に軽くレイアウトも当ててます。

その他、ログインユーザーの権限を参照して新規登録ができる・できないを分けています。

