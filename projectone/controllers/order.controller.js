const Order = require("../models/order.model");
const Product = require("../models/product.model");

exports.createOrder = async (req, res) => {
  try {
    const { item } = req.body;
    if (!item || item.length === 0) {
      return res.status(400).json({ message: "Invalid data" });
    }

    let total = 0;
    let orderItems = [];
    let productsToUpdate = [];

    // 🔹 Step 1: เช็ค stock ก่อน
    for (let i of item) {
      const product = await Product.findOne({ productcode: i.productcode });
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${i.productcode} not found` });
      }
      if (product.stock < i.quantity) {
        return res
          .status(400)
          .json({ message: `Stock not enough for ${i.productcode}` });
      }

      productsToUpdate.push({ product, quantity: i.quantity });
    }

    // 🔹 Step 2: คำนวณ + ลด stock
    for (let p of productsToUpdate) {
      const totalprice = p.product.price * p.quantity;

      p.product.stock -= p.quantity;
      await p.product.save();

      orderItems.push({
        productcode: p.product.productcode,
        quantity: p.quantity,
        totalprice,
      });

      total += totalprice;
    }

    const order = await Order.create({
      item: orderItems,
      total,
      customer: req.user.id,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("customer", "firstname lastname");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("customer", "firstname lastname");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
};

exports.getOrdersByCustomer = async (req, res) => {
  try {

    const orders = await Order.find({
      customer: req.params.customerId
    }).populate("customer", "firstname lastname")

    res.json(orders)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

