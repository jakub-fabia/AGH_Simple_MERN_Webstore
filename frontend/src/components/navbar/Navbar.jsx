import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>Fabson&Gontarsky</h2>
            <div style={styles.links}>
                <Link to="/auth/login" style={styles.link}>Login</Link>
                <Link to="/auth/register" style={styles.link}>Register</Link>
            </div>
        </nav>
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
    }
};

export default Navbar;
