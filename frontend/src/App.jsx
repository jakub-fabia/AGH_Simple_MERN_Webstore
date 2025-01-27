import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {checkAuth} from "./redux/authSlice/index.js";
import CheckAuth from "./components/auth/checkAuth.jsx";
import {Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import UnauthorizedPage from "./pages/misc/UnauthorizedPage.jsx";
import NotFound from "./pages/misc/NotFound.jsx";
import AdminLayout from "./components/layouts/AdminLayout.jsx";
import ShopLayout from "./components/layouts/ShopLayout.jsx";
import ShopHome from "./pages/shop/ShopHome.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminSlice from "./redux/adminSlice/products/index.js";
import AdminAddProduct from "./pages/admin/AdminAddProduct.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminEditProduct from "./pages/admin/AdminEditProduct.jsx";
import AdminProductsLayout from "./components/layouts/AdminProductsLayout.jsx";


function App() {
    const {user, isAuthenticated, isLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {dispatch(checkAuth());}, [dispatch]);

    if (isLoading) {
        return <div>Is Loading...</div>
    }

    return (
        <Routes>
            <Route path="/" element={<CheckAuth isAuthenticated={isAuthenticated} user={user}/>}/>
            <Route path="/auth" element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                    <AuthLayout/>
                </CheckAuth>
                }
            >
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
            </Route>
            <Route path="/shop" element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                    <ShopLayout />
                </CheckAuth>
                }
            >
                <Route path="home" element={<ShopHome/>}/>
                {/*Tutaj wszystkie podstrony sklepu*/}
            </Route>
            <Route path="/admin" element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                    <AdminLayout />
                </CheckAuth>
            }
            >
                <Route path="dashboard" element={<AdminDashboard />}/>
                <Route path="products" element={<AdminProductsLayout />}>
                    <Route path="add" element={<AdminAddProduct />}/> {/*to powinno być elementem strony /admin/products ale nie chciało mi się tego porządnie zakodzić, zostawiam bo działa*/}
                    <Route path="all" element={<AdminProducts />}/>
                    <Route path="edit/:id" element={<AdminEditProduct/>}/>
                </Route>
            </Route>
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App