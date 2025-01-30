import { Card } from "react-bootstrap";
import * as PropTypes from "prop-types";
import { Component } from "react";
import {FaStar} from "react-icons/fa";

function renderStars(rating) {
	let stars = [];
	for (let i = 0; i < Math.floor(rating); i++) {
		stars.push(<FaStar key={i} className="text-yellow-500" />);
	}
	return stars.length > 0 ? stars : <span>No reviews</span>;
}

class AdminProductTile extends Component {
	render() {
		let { product} = this.props;
		return (
			<Card className="h-100 shadow-lg border-0">
				<Card.Img
					variant="top"
					src={product.image}
					alt={product.title}
					className="product-img"
					style={styles.cardImg}
				/>
				<Card.Body className="d-flex flex-column">
					<Card.Title>{product.title}</Card.Title>
					<Card.Text>{product.description.substring(0, 100)}...</Card.Text>
					<div className="d-flex justify-content-between align-items-center mt-auto">
						<h5>${product.price.toFixed(2)}</h5>
						<div>
							<strong>Stars: </strong>
							<div className="d-flex">{renderStars(product.averageReview)}</div>
						</div>
					</div>
				</Card.Body>
			</Card>
		);
	}
}

AdminProductTile.propTypes = {
	product: PropTypes.object.isRequired,
	handleDelete: PropTypes.func.isRequired,
	handleEdit: PropTypes.func.isRequired
}

export default AdminProductTile;

const styles = {
	cardImg: {
		height: '200px',
		width: '100%',
		objectFit: 'contain',
		objectPosition: 'center'
	}
};