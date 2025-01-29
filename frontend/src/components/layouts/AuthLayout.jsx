import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar"; // Import Navbar

function AuthLayout() {
    return (
        <div>
            {/* Add Navbar here */}
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
