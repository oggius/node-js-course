const LIVR = require('livr');
const DB = require('../initializers/db');

const db = new DB();

const itemsController = {
    async getItems(ctx, next) {
        console.log('method: getItem');
        console.log(ctx.headers);
        ctx.body = await db.getItems();
    },

    getItem(ctx, next) {
        console.log('call: getItem');
        const validator = new LIVR.Validator({
            itemId: ['required', 'positive_integer']
        });

        if (!validator.validate(ctx.params)) {
            ctx.status = 400;
            ctx.body = validator.getErrors();
            return;
        }

        const item = db.getItem(ctx.params.itemId);

        if (!item) {
            ctx.status = 404;
            ctx.body = 'Item not found by ID ' + ctx.params.itemId;
        } else {
            ctx.body = item;
        }
    },

    async createItem(ctx, next) {
        if (ctx.headers.authorization === 'admin') {
            ctx.body = await db.createItem(ctx.request.body);
        } else {
            ctx.status = 401;
            ctx.body = 'you are not allowed';
        }
    },

    async deleteItem(ctx, next) {
        await db.deleteItem(ctx.params.itemId);
        ctx.status = 204;
        ctx.body = 'Item deleted';
    },

    updateItem(ctx) {
        const updatedItem = db.updateItem(
            Number(ctx.params.itemId),
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