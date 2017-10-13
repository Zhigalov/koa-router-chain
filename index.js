const Router = require('koa-router');

module.exports = (options, methods = ['get', 'post', 'patch', 'delete']) => {
    const router = new Router(options);
    const result = {};

    result.routes = router.routes.bind(router);
    result.allowedMethods = router.allowedMethods.bind(router);

    result.useController = controller => {
        result._controller = controller;

        return result;
    };

    methods.forEach(verb => {
        result[verb] = function (path, ...middlewares) {
            const methodName = middlewares.pop();
            const method = result._controller[methodName].bind(result._controller);
            const params = []
                .concat(path)
                .concat(middlewares)
                .concat(method);

            router[verb](...params);

            return result;
        };
    });

    return result;
};
