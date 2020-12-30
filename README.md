## storybook setup

```
touch .storybook/config.js
mkdir .storybook
yarn add -D @storybook/react babel-core
```

## gcpの認証

- gcpコンソールの APIとサービス -> 認証情報 -> サービスアカウント から認証用のjsonを作成する
- 環境変数 `GOOGLE_APPLICATION_CREDENTIALS` に作成したjsonのpathを設定する

### ローカル環境の場合

```
export GOOGLE_APPLICATION_CREDENTIALS=${認証用jsonのpath}
```

- ローカルで認証が必要になるのは、プロジェクト立ち上げ時のみで、普段の開発ではおそらく不要

### CircleCI環境の場合

- 認証用のjsonをbase64に変換する
  - `base64 auth.json`
- CircleCIの環境変数`GCLOUD_SERVICE_KEY`にbase64に変換したjsonを登録する
- CircleCIで立ち上げるdocker上で環境変数`GOOGLE_APPLICATION_CREDENTIALS`を設定するために`.circleci/config.yml`に以下の記述をする

```
      - image: regviz/node-xcb
        environment:
          DISPLAY: ":99"
          GOOGLE_APPLICATION_CREDENTIALS: "/root/gcloud-service-key.json"

    working_directory: ~/repo

    steps:
      - checkout
      - run:
          name: setup GCP
          command: echo $GCLOUD_SERVICE_KEY | base64 -d > /root/gcloud-service-key.json
```

## 参考にした記事

- [入門Visual Regression Test](https://qiita.com/kahirokunn/items/a0474e15de92033bbb1f#install)
- [Storybookとreg-suitで気軽にはじめるVisual Regression Testing](https://blog.wadackel.me/2018/storybook-chrome-screenshot-with-reg-viz/)
- [Google Cloud の認証トークンを gcloud コマンドで取得する。環境変数でサービスアカウントファイルを指定する例。](https://qiita.com/YumaInaura/items/ae7c20ba6def8245b522)