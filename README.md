# trix-experiments

To install dependencies, run

```shell
yarn install
```

To run the node server, run the following command

```shell
yarn run start
```

Once the server is started, you can view the site at
[http://localhost:9000](http://localhost:9000)

## Build for distribution

```
npx webpack --config webpack.config.js && cp ./public/* ./docs && rm public/bundle.js && rm bundle.js.map
```
