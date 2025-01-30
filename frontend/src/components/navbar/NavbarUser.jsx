import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/authSlice/index.js";

function NavbarUser() {
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logoutUser());
    }

    return (
        <div>
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>Fabson&Gontarsky</h2>
                <div style={styles.links}>
                    <Link to="/shop/home" style={styles.link}>Home</Link>
                    <Link to="/shop/cart" style={styles.link}>Cart</Link>
                    <Link to="/shop/orders" style={styles.link}>Orders</Link>
                    <button style={styles.logout} onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <div style={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#222",
        color: "#fff",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    },
    logo: {
        margin: 0,
        fontSize: "22px",
        fontWeight: "bold",
        letterSpacing: "1px",
    },
    links: {
        display: "flex",
        gap: "20px",
        alignItems: "center",
    },
    link: {
        color: "#fff",
        textDecoration: "none",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "color 0.3s, transform 0.2s",
        padding: "5px 10px",
    },
    linkHover: {
        color: "#f8b400",
        transform: "scale(1.05)",
    },
    logout: {
        backgroundColor: "#f44336",
        color: "#fff",
        border: "none",
        padding: "8px 15px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "background 0.3s, transform 0.2s",
    },
    logoutHover: {
        backgroundColor: "#d32f2f",
        transform: "scale(1.05)",
    },
    content: {
        padding: "20px",
    },
};

export default NavbarUser;
