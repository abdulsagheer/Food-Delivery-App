import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
	const {
		query: { id },
	} = req;

	await dbConnect();

	switch (req.method) {
		case "GET":
			try {
				const order = await Order.findById(id);
				res.status(200).json(order);
			} catch (err) {
				res.status(500).json(err);
			}
		case "PUT":
			try {
				const order = await Order.findByIdAndUpdate(id, req.body, {
					new: true,
				});
				res.status(200).json(order);
			} catch (err) {
				res.status(500).json(err);
			}
		default:
			res.status(405).json({ message: "Method not allowed" });
			break;
	}
};

export default handler;
