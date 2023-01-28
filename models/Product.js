import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
	{
		title: { type: String, required: true, maxLength: 60 },
		description: { type: String, required: true, maxLength: 260 },
		image: { type: String, required: true, maxLength: 260 },
		prices: { type: [Number], required: true },
		extraOptions: {
			type: [
				{
					text: {
						type: String,
						required: true,
					},
					price: {
						type: Number,
						required: true,
					},
				},
			],
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.Product ||
	mongoose.model("Product", ProductSchema);
