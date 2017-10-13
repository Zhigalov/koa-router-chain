module.exports = async (ctx, next) => {
    ctx.state.uid = '1111';

    await next();
};
