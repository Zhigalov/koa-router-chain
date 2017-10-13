module.exports = {
    findList: ctx => ctx.body = ['@YuuKohaku', '@zhigalov'],
    findOne: ctx => ctx.body = {
        uid: ctx.params.uid,
        login: '@zhigalov',
        hasAccess: ctx.state.hasAccess
    }
};
