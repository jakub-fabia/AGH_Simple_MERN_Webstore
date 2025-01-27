const mongoose =  require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:  {
        type: String,
        required: true,
    },
    category:  {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    averageReview: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;