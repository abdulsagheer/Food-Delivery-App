import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
	const {
		query: { id },
		cookies,
	} = req;
	const token = cookies.token;

	dbConnect();
	switch (req.method) {
		case "GET":
			try {
				const product = await Product.findById(id);
				res.status(200).json(product);
			} catch (err) {
				res.status(500).json(err);
			}

		case "PUT":
			if (!token || token !== process.env.token) {
				return res.status(401).json("Not authenticated!");
			}
			try {
				const product = await Product.findByIdAndUpdate(id, req.body, {
					new: true,
				});
				res.status(200).json(product);
			} catch (err) {
				res.status(500).json(err);
			}

		case "DELETE":
			if (!token || token !== process.env.token) {
				return res.status(401).json("Not authenticated!");
			}
			try {
				await Product.findByIdAndDelete(id);
				res.status(200).json("The product has been deleted!");
			} catch (err) {
				res.status(500).json(err);
			}
	}
}
