const LIVR = require('livr');
const db = require('../db_old');

const itemsController = {

    getItems(ctx, next) {
        console.log('method: getItem');
        console.log(ctx.headers);
        ctx.body = db.getItems();
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

    createItem(ctx, next) {
        if (ctx.headers.authorization === 'admin') {
            db.writeItem(ctx.request.body);
            ctx.body = 'created item';
        } else {
            ctx.status = 401;
            ctx.body = 'you are not allowed';
        }
    },

    deleteItem(ctx, next) {
        db.deleteItem(Number(ctx.params.itemId));
        ctx.status = 204;
        ctx.body = '';
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