import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice";
import adminProductsReducer from "./adminSlice/products/index.js";
import adminOrdersReducer from "./adminSlice/orders/index.js";
import adminReviewsReducer from "./adminSlice/reviews/index.js"
import shopProductsReducer from "./shopSlice/products/index.js";
import shopReviewReducer from "./shopSlice/reviews/index.js";
import shopCartReducer from "./shopSlice/cart/index.js";
import shopOrderReducer from "./shopSlice/order/index.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducer,
        adminOrders: adminOrdersReducer,
        adminReview: adminReviewsReducer,

        shopProducts: shopProductsReducer,
        shopReview: shopReviewReducer,
        shopCart: shopCartReducer,
        shopOrder: shopOrderReducer,
    }
});

export default store;