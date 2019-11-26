const itemsController = {
    async getItems(ctx) {
        const items = await ctx.app.db.getItems();
        ctx.body = items;
    },
    async createItem(ctx) {
        if (ctx.headers.authorization === 'admin') {
            const id = await ctx.app.db.createItem(ctx.request.body);
            ctx.status = 201;
            ctx.body = await ctx.app.db.getItem(id);
        } else {
            ctx.status = 401;
            ctx.body = {error: 'you are not allowed'};
        }
    },
    async deleteItem(ctx) {
        await ctx.app.db.deleteItem(ctx.params.itemId);
        ctx.status = 204;
        ctx.body = '';
    },
    async updateItem(ctx) {
        const updatedItem = await ctx.app.db.updateItem(
            ctx.params.itemId,
            ctx.request.body
        );

        if (updatedItem) {
            ctx.body = updatedItem;
        } else {
            ctx.status = 404;
        }
    }
};

module.exports = itemsController;
