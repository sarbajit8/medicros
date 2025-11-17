const PcdCart = require("../../models/PcdCart");
const PcdProduct = require("../../models/PcdProducts");

const pcdAddToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Invalid data provided!" });
    }

    const product = await PcdProduct.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let pcdCart = await PcdCart.findOne({ userId });
    if (!pcdCart) {
      pcdCart = new PcdCart({ userId, items: [] });
    }

    const existingIndex = pcdCart.items.findIndex(item => item.productId.toString() === productId);
    if (existingIndex === -1) {
      pcdCart.items.push({ productId, quantity });
    } else {
      pcdCart.items[existingIndex].quantity += quantity;
    }

    await pcdCart.save();
    res.status(200).json({ success: true, data: pcdCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const fetchPcdCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ success: false, message: "User ID is required" });

    const pcdCart = await PcdCart.findOne({ userId });
    if (!pcdCart) return res.status(404).json({ success: false, message: "Cart not found" });

    const productIds = pcdCart.items.map(item => item.productId);
    const products = await PcdProduct.find({ _id: { $in: productIds } });

    const productMap = products.reduce((acc, product) => {
      acc[product._id] = product;
      return acc;
    }, {});

    const populatedItems = pcdCart.items.map(item => ({
      productId: item.productId,
      productname: productMap[item.productId]?.productname || null,
      PcdId: productMap[item.productId]?.PcdId || null,
      distributorName: productMap[item.productId]?.distributorName || null,
      quantity: item.quantity,
    }));

    res.status(200).json({ success: true, data: { ...pcdCart._doc, items: populatedItems } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error" });
  }
};

const updatePcdCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0)
      return res.status(400).json({ success: false, message: "Invalid data" });

    const pcdCart = await PcdCart.findOne({ userId });
    if (!pcdCart) return res.status(404).json({ success: false, message: "Cart not found" });

    const itemIndex = pcdCart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ success: false, message: "Item not in cart" });

    pcdCart.items[itemIndex].quantity = quantity;
    await pcdCart.save();

    res.status(200).json({ success: true, data: pcdCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error updating quantity" });
  }
};

const deletePcdCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    if (!userId || !productId)
      return res.status(400).json({ success: false, message: "Invalid data" });

    const pcdCart = await PcdCart.findOne({ userId });
    if (!pcdCart) return res.status(404).json({ success: false, message: "Cart not found" });

    const initialLength = pcdCart.items.length;
    pcdCart.items = pcdCart.items.filter(item => item.productId.toString() !== productId);

    if (pcdCart.items.length === initialLength)
      return res.status(404).json({ success: false, message: "Product not in cart" });

    await pcdCart.save();

    res.status(200).json({ success: true, data: pcdCart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting item" });
  }
};

module.exports = {
  pcdAddToCart,
  fetchPcdCartItems,
  updatePcdCartItemQty,
  deletePcdCartItem,
};
