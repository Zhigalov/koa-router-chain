module.exports = async (ctx, next) => {
    ctx.state.hasAccess = ctx.state.uid === '1111';

    await next();
};
