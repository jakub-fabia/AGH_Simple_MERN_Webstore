const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth-routes.js");
const adminProductRouter = require("./routes/admin-product-routes.js");
const adminOrdersRouter = require("./routes/admin-orders-routes.js");

dotenv.config()

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

const PORT = 5000;
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products', adminProductRouter)
app.use('/api/admin/orders', adminOrdersRouter)


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));