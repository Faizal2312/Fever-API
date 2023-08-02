import Order from "../models/order.mode.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId);
    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "temp",
    });
    await newOrder.save();
    res.send(201).status("New OrderCreated");
  } catch (error) {
    next(error);
  }
};
export const getOrder = async (req, res, next) => {
  try {
    const order = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });
    if (!order) return next(createError(403, "Orders Not found"));
    res.status(200).send(order);
  } catch (error) {
    next(error);
  }
};
