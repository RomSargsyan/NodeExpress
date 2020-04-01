const { Schema, model } = require('mongoose');

const ordersSchema = new Schema({
    courses: [
        {
            course: {
                type: Object,
                required: true
            },
            count: {
                type: Number,
                require: true
            }
        }
    ],
    user: {
        name: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = model('Orders', ordersSchema)