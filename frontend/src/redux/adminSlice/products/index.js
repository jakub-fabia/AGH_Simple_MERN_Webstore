import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	isLoading: false,
	productList: [],
};

export const addNewProduct = createAsyncThunk(
	"/products/add",
	async (formData) => {
		const result = await axios.post(
			"http://localhost:5000/api/admin/products/add",
			formData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return result?.data;
	}
);

export const fetchAllProducts = createAsyncThunk(
	"/products/fetchAllProducts",
	async () => {
		const result = await axios.get(
			"http://localhost:5000/api/admin/products/get"
		);

		return result?.data;
	}
);

export const editProduct = createAsyncThunk(
	"/products/editProduct",
	async ({ id, formData }) => {
		const result = await axios.put(
			`http://localhost:5000/api/admin/products/edit/${id}`,
			formData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		return result?.data;
	}
);

export const deleteProduct = createAsyncThunk(
	"/products/deleteProduct",
	async (id) => {
		const result = await axios.delete(
			`http://localhost:5000/api/admin/products/delete/${id}`
		);

		return result?.data;
	}
);

export const fetchProduct = createAsyncThunk(
	"/products/fetchProduct",
	async (id) => {
		const result = await axios.get(
			`http://localhost:5000/api/admin/products/get/${id}`
		);
		return result?.data;
	}
);

const AdminProductsSlice = createSlice({
	name: "adminProducts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productList = action.payload.data;
			})
			.addCase(fetchAllProducts.rejected, (state) => {
				state.isLoading = false;
				state.productList = [];
			})
			.addCase(fetchProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.product = action.payload.data;
			})
			.addCase(fetchProduct.rejected, (state) => {
				state.loading = false;
				state.error = null;
			});
	},
});

export default AdminProductsSlice.reducer;