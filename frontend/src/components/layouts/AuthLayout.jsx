import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function AuthLayout() {
    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <Outlet />
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
    },
};

export default AuthLayout;
