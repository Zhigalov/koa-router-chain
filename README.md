# Wrapper for koa-router in chaining style

## Install
```
$ npm install koa-router-chain
```

## Usage
```javascript
const v1 = require('koa-router-chain')({ prefix: '/v1' });
const app = new Koa();

v1
    .useController(require('./controllers/user'))
    .get('/users', 'findList')
    .get('/user/:uid', 'findOne')

    .useController(require('./controllers/post'))
    .post('/post', 'save');

app.use(v1.routes());
app.listen(80);
```

## API
```
require('koa-router-chain')([opts], [methods]);
```

- `opts` - object, optionals. Options for `koa-router`, [detals](https://www.npmjs.com/package/koa-router#new-routeropts).
- `methods` - array, optionals. List of allowed methods. Defaults `['get', 'post', 'patch', 'delete']`

## License
MIT
