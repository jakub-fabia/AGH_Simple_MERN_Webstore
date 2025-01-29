const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: String,
    address: {
        country: String,
        city: String,
        zipcode: String,
        street: String,
        house: String,
    },
    phone: Number,
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        }
    ],
    orderStatus: {
        type: String,
        default: "New",
        enum: ["New", "Paid", "Sent", "Delivered"],
        required: true
    }
}, {
    timestamps: true,
});

const Order =  mongoose.model('Order', orderSchema);

module.exports = Order;