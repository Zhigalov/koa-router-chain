const Koa = require('koa');
const request = require('supertest');

describe('Koa router chain', () => {
    it('should chain controllers', async () => {
        const router = require('..')({ prefix: '/v1' });

        router
            .useController(require('./controllers/user'))
            .get('/users', 'findList')
            .get('/user/:uid', 'findOne')

            .useController(require('./controllers/post'))
            .post('/post', 'save');

        const app = new Koa();

        app.use(router.routes());

        await request(app.listen())
            .get('/v1/users')
            .expect(['@YuuKohaku', '@zhigalov']);

        await request(app.listen())
            .get('/v1/user/1111')
            .expect({ uid: '1111', login: '@zhigalov' });

        await request(app.listen())
            .post('/v1/post')
            .expect(201);
    });

    it('should save controller context', async () => {
        const router = require('..')({ prefix: '/v1' });

        router
            .useController(require('./controllers/post'))
            .get('/post', 'findOne');

        const app = new Koa();

        app.use(router.routes());

        await request(app.listen())
            .get('/v1/post')
            .expect({ title: 'About soft drugs' });
    });

    it('should use middlewares', async () => {
        const router = require('..')({ prefix: '/v1' });
        const auth = require('./middlewares/auth');
        const access = require('./middlewares/access');

        router
            .useController(require('./controllers/user'))
            .get('/user/:uid', auth, access, 'findOne');

        const app = new Koa();

        app.use(router.routes());

        await request(app.listen())
            .get('/v1/user/2222')
            .expect({
                uid: '2222',
                login: '@zhigalov',
                hasAccess: true
            });
    });
});
