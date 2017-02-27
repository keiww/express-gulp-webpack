# express-gulp-webpack

### Developement

```
yarn dev
```

- Express to serve site
- Gulp to build precss, copy static file from `client` to `public`
- Webpack to build modular js

### Production

```
yarn build
yarn start-pro
```

- Gulp to add reversion hash and cdn prefix to all static assets
- [TODO] add cdn uploader

```
├── app.js
├── bin
│   └── www
├── cdn
│   ├── css
│   ├── fonts
│   ├── img
│   └── js
├── client
│   ├── fonts
│   ├── img
│   ├── js
│   └── scss
├── config
│   ├── default.js
│   ├── production.js
│   ├── webpack.config.base.js
│   ├── webpack.config.dev.js
│   └── webpack.config.pro.js
├── gulpfile.js
├── helpers
│   └── asset-path.js
├── package.json
├── public
│   ├── css
│   ├── fonts
│   ├── img
│   └── js
├── rev-manifest.json
├── routes
│   ├── index.js
│   └── users.js
├── views
    ├── error.pug
    ├── index.pug
    └── layout.pug
```
