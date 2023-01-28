import Product from "@/models/Product";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
	dbConnect();

	switch (req.method) {
		case "GET":
			try {
				const products = await Product.find();
				return res.status(200).json(products);
			} catch (error) {
				return res.status(500).json(error);
			}

		case "POST":
			try {
				const product = await Product.create(req.body);
				return res.status(200).json(product);
			} catch (error) {
				return res.status(500).json(error);
			}

		default:
			res.status(405).json({ message: "Method not allowed" });
			break;
	}
}
