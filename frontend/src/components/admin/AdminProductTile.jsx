function AdminProductTile({ product, handleDelete, handleEdit }) {
	return (
		<div className="border rounded-lg shadow-lg p-4 w-64 flex flex-col">
			{/* Product Image */}
			<div className="h-48 w-full mb-4 bg-gray-200 flex items-center justify-center overflow-hidden">
				<img
					src={product.image}
					alt={product.title}
					className="object-cover h-full w-full"
				/>
			</div>

			{/* Product Details */}
			<div className="flex flex-col space-y-2 mb-4">
				<h2 className="text-lg font-bold truncate">{product.title}</h2>
				<p className="text-gray-600 truncate">{product.description}</p>
				<p className="text-gray-800 font-semibold">Category: {product.category}</p>
				<p className="text-gray-800 font-semibold">Price: ${product.price}</p>
				<p className="text-gray-800 font-semibold">Stock: {product.stock}</p>
			</div>

			{/* Action Buttons */}
			<div className="mt-auto flex space-x-2">
				<button
					onClick={() => handleEdit(product?._id)}
					className="flex-1 bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600"
				>
					Modify Product
				</button>
				<button
					onClick={() => handleDelete(product?._id)}
					className="flex-1 bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
				>
					Delete Product
				</button>
			</div>
		</div>
	);
}

export default AdminProductTile;
