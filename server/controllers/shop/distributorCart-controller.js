const DistributorCart = require("../../models/DistributorCart");
const Product = require("../../models/Product");
const DistributorProduct = require("../../models/DistributorProducts");


const distributorAddToCart = async (req, res) => {
  try {
    const {userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }
    
    const product = await DistributorProduct.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let distributorCart = await DistributorCart.findOne({ userId });

    if (!distributorCart) {
        distributorCart = new DistributorCart({ userId, items: [] });
    }

    const findCurrentProductIndex = distributorCart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
        distributorCart.items.push({productId, quantity });
    } else {
        distributorCart.items[findCurrentProductIndex].quantity += quantity;
    }

    await distributorCart.save();
    res.status(200).json({
      success: true,
      data: distributorCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};



const fetchDistributorCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User  id is mandatory!",
      });
    }

    // Find the distributor cart for the given userId
    const distributorCart = await DistributorCart.findOne({ userId });

    if (!distributorCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Extract product IDs from the cart items
    const productIds = distributorCart.items
      .filter(item => item.productId) // Ensure productId exists
      .map(item => item.productId);

    // Fetch product details from DistributorProducts using the extracted product IDs
    const products = await DistributorProduct.find({ _id: { $in: productIds } })
      .select("productname distributorName distributorId");

    // Create a map for quick lookup of product details
    const productMap = products.reduce((acc, product) => {
      acc[product._id] = product;
      return acc;
    }, {});

    // Map valid items to include product details
    const populateCartItems = distributorCart.items
      .filter(item => item.productId && productMap[item.productId]) // Ensure productId exists and is in the productMap
      .map(item => ({
        productId: item.productId,
        productname: productMap[item.productId].productname,
        distributorId: productMap[item.productId].distributorId,
        distributorName: productMap[item.productId].distributorName,
        quantity: item.quantity,
      }));

    res.status(200).json({
      success: true,
      data: {
        ...distributorCart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const updateDistributorCartItemQty = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate input data
    if (!userId || !productId || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Find the distributor cart for the given userId
    const distributorCart = await DistributorCart.findOne({ userId });
    if (!distributorCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Find the index of the current product in the cart
    const findCurrentProductIndex = distributorCart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (findCurrentProductIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not present!",
      });
    }

    // Update the quantity of the product in the cart
    distributorCart.items[findCurrentProductIndex].quantity = quantity;
    await distributorCart.save();

    // Fetch product details from DistributorProducts using the productId
    const product = await DistributorProduct.findById(productId)
      .select("productname distributorName distributorId");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    // Prepare the updated cart items
    const populateCartItems = distributorCart.items.map((item) => {
      if (item.productId.toString() === productId) {
        return {
          productId: product._id,
          productname: product.productname,
          distributorId: product.distributorId,
          distributorName: product.distributorName,
          quantity: item.quantity,
        };
      } else {
        return {
          productId: item.productId,
          productname: null, // or handle as needed
          distributorId: "Product not found",
          distributorName: "Product not found",
          quantity: item.quantity,
        };
      }
    });

    res.status(200).json({
      success: true,
      data: {
        ...distributorCart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

// const deleteDistributorCartItem = async (req, res) => {
//   try {
//     const { userId, productId ,distributorId} = req.params;
//     if (!userId || !productId ||!distributorId) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid data provided!",
//       });
//     }

//     const DistributorCart = await DistributorCart.findOne({ userId }).populate({
//       path: "items.productId",
//       select: "productname distributorName distributorId",
//     });

//     if (!DistributorCart) {
//       return res.status(404).json({
//         success: false,
//         message: "Cart not found!",
//       });
//     }

//     DistributorCart.items = DistributorCart.items.filter(
//       (item) => item.productId._id.toString() !== productId
//     );

//     await DistributorCart.save();

//     await DistributorCart.populate({
//       path: "items.productId",
//       select: "productname distributorName distributorId",
//     });

//     const populateCartItems = DistributorCart.items.map((item) => ({
//         productId: item.productId ? item.productId._id : null,
//         productname: item.productId ? item.productId.productname : null,
//         distributorId: item.productId ? item.productId.distributorId : "Product not found",
//         quantity: item.quantity,
//     }));

//     res.status(200).json({
//       success: true,
//       data: {
//         ...DistributorCart._doc,
//         items: populateCartItems,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Error",
//     });
//   }
// };
const deleteDistributorCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Validate input
    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    // Find the distributor's cart
    const distributorCart = await DistributorCart.findOne({ userId });

    // Check if the cart exists
    if (!distributorCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    // Filter out the specific item by productId
    const initialItemCount = distributorCart.items.length;
    distributorCart.items = distributorCart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Check if the product was actually removed
    if (initialItemCount === distributorCart.items.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart!",
      });
    }

    // Save the updated cart
    await distributorCart.save();

    // Prepare the updated cart data
    const updatedCartItems = distributorCart.items.map((item) => ({
      productId: item.productId, // Assuming the `productId` is a simple reference
      productname: item.productname, // Store required details directly in the item schema
      distributorId: item.distributorId,
      distributorName: item.distributorName,
      quantity: item.quantity,
    }));

    // Send the updated cart data
    res.status(200).json({
      success: true,
      data: {
        ...distributorCart._doc,
        items: updatedCartItems,
      },
    });
  } catch (error) {
    console.error("Error in deleteDistributorCartItem:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting product from cart",
    });
  }
};




module.exports = {
 updateDistributorCartItemQty,
  deleteDistributorCartItem,
  distributorAddToCart,
  fetchDistributorCartItems
};
