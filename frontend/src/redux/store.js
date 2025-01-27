import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice";
import adminProductsReducer from "./adminSlice/products/index.js";
import adminOrdersReducer from "./adminSlice/orders/index.js";
import adminReviewsReducer from "./adminSlice/reviews/index.js"

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducer,
        adminOrders: adminOrdersReducer,
        adminReview: adminReviewsReducer,
    }
});

export default store;