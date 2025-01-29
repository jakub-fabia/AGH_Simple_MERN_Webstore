import { Card, Button } from "react-bootstrap";
import * as PropTypes from "prop-types";
import {Component} from "react";

class AdminProductTile extends Component {
	render() {
		let {product, handleDelete, handleEdit} = this.props;
		return (
			<Card className="h-100 shadow-sm border-0">
				<Card.Img
					variant="top"
					src={product.image}
					alt={product.title}
					className="product-img"
				/>
				<Card.Body className="d-flex flex-column">
					<Card.Title className="text-truncate">{product.title}</Card.Title>
					<Card.Text className="text-muted text-truncate">
						{product.description}
					</Card.Text>
					<p className="mb-1"><strong>Category:</strong> {product.category}</p>
					<p className="mb-1"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
					<p className="mb-1"><strong>Stars:</strong> {product.averageReview} ⭐</p>
					<p className="mb-3"><strong>Stock:</strong> {product.stock}</p>

					<div className="mt-auto d-flex justify-content-between">
						<Button
							variant="primary"
							onClick={() => handleEdit(product._id)}
						>
							Modify
						</Button>
						<Button
							variant="danger"
							onClick={() => handleDelete(product._id)}
						>
							Delete
						</Button>
					</div>
				</Card.Body>
			</Card>
		);
	}
}

AdminProductTile.propTypes = {
	product: PropTypes.any,
	handleDelete: PropTypes.any,
	handleEdit: PropTypes.any
}

export default AdminProductTile;
