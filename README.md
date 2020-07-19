
今回の趣旨

- d3 を使って描画する。
- frontend開発の最初を理解する。
- なるべくスタンダードかつ、最新のやり方を学習する。
- react, vue等のフレームワークは使わない。単一ページ。単一要素のページなため。
- typescriptを使う。


環境構築
https://hub.docker.com/_/node/

はまりポイント
`docker-compose run` で起動したコンテナでポートマッピングが効かない
https://qiita.com/sekitaka_1214/items/3b5cfdd15fafb74789fa

yarnの使いかた
https://qiita.com/senou/items/d939601e32c0005ebfe3

とりあえず、最初の一手
https://qiita.com/ritukiii/items/7f28554369d63eb373c3#%E3%83%8E%E3%83%B3%E3%83%96%E3%83%AD%E3%83%83%E3%82%AD%E3%83%B3%E3%82%B0%E3%81%AA%E5%87%A6%E7%90%86%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9

typescript化してみる
yarn add --dev typescript

yarn run tsc -v

typescript requireしたらエラーが出た。
https://qiita.com/Yorinton/items/35fbed6ab19bc689e944

@types/nodeが必要
yarn add @types/node


TypeScriptチュートリアル① -環境構築編-
https://qiita.com/ochiochi/items/efdaa0ae7d8c972c8103

Webpackの導入
webpack-dev-serverでサーバーサイドを書く必要がなくなった

webpack-dev-serverをdockerの外からアクセスする方法
https://tackeyy.com/blog/posts/how-to-access-app-through-the-ip-with-webpack-dev-server


早くするため、node_modulesのものを別チャンクにして取り出す
https://qiita.com/ochiochi/items/cc825671f8179126fa70


Babelとwebpack入門
https://qiita.com/tsuuuuu_san/items/582854a4043d8a1db1c9




docker-compose up d3
docker-compose exec d3 bash

