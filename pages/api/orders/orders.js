import Order from "@/models/Order";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
	dbConnect();

	switch (req.method) {
		case "GET":
			try {
				const orders = await Order.find();
				res.status(200).json(orders);
			} catch (err) {
				res.status(500).json(err);
			}

		case "POST":
			try {
				const order = await Order.create(req.body);
				res.status(201).json(order);
			} catch (err) {
				res.status(500).json(err);
			}

		default:
			res.status(405).json({ message: "Method not allowed" });
			break;
	}
}
