import { Link, Outlet } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

function AdminProductsLayout() {
	return (
		<Container className="mt-3">
			<Row className="mb-3">
				<Col className="d-flex justify-content-between">
					<Link to="/admin/products/add">
						<Button variant="secondary">Dodaj</Button>
					</Link>
				</Col>
			</Row>
			<Row>
				<Col>
					<Outlet />
				</Col>
			</Row>
		</Container>
	);
}

export default AdminProductsLayout;
