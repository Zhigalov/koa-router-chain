class Post {
    static get default() {
        return { title: 'About soft drugs' };
    }

    static save(ctx) {
        ctx.status = 201;
    }

    static findOne(ctx) {
        ctx.body = this.default;
    }
}

module.exports = Post;
