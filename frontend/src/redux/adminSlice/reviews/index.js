import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchAllProducts, fetchProduct} from "../products/index.js";
import axios from "axios";

const initialState = {
	isLoading: false,
	reviewList: [],
};

export const fetchAllReviews = createAsyncThunk(
	"/reviews/fetchAllReviews",
	async () => {
		const result = await axios.get(
			"http://localhost:5000/api/admin/reviews/get"
		);
		return result?.data;
	}
);

export const deleteReview = createAsyncThunk(
	"/reviews/deleteReview",
	async (id) => {
		const result = await axios.delete(
			`http://localhost:5000/api/admin/reviews/delete/${id}`
		);

		return result?.data;
	}
);

const AdminReviewsSlice = createSlice({
	name: "adminReviews",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllReviews.fulfilled, (state, action) => {
				state.isLoading = false;
				state.productList = action.payload.data;
			})
			.addCase(fetchAllReviews.rejected, (state) => {
				state.isLoading = false;
				state.productList = [];
			})
	},
});

export default AdminReviewsSlice.reducer;