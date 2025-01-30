import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaStar } from 'react-icons/fa';

function ShopProductTile({ product }) {
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < Math.floor(rating); i++) {
            stars.push(<FaStar key={i} className="text-yellow-500" />);
        }
        return stars.length > 0 ? stars : <span>No reviews</span>;
    };

    return (
        <Link to={`/shop/product/${product._id}`} key={product._id} className="text-decoration-none">
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
                    <div className="mt-3 d-flex justify-content-between">
                        <Button variant="dark">View</Button>
                    </div>
                </Card.Body>
            </Card>
        </Link>
    );
}

ShopProductTile.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number,
        averageReview: PropTypes.number,
    }).isRequired,
};

export default ShopProductTile;

const styles = {
    cardImg: {
        height: '200px',
        width: '100%',
        objectFit: 'contain',
        objectPosition: 'center'
    }
};