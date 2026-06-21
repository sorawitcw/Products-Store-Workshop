var productSchema = require('../models/product.model')

exports.getProduct = async(req, res) => {
  try {
    const product = await productSchema.find({})
    res.send(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    })

  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const product = await productSchema.findById(id)
    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      })
    }
    res.json(product)
  } catch (error) {
    res.status(400).json({
      message: "Invalid ID format"
    })
  }
}

// exports.createProduct = async (req, res) => {
//   try {
//     const { productname, description, price, stock } = req.body

//     const product = await productSchema.create({
//       productname,
//       description,
//       price,
//       stock
//     })

//     res.status(201).json(product)

//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

exports.createProduct = async (req, res) => {
  try {
    const product = await productSchema.create({
      ...req.body,
      productphoto: req.file ? req.file.filename : null
    })

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {
      ...req.body
    };

    if (req.file) {
      updateData.productphoto = req.file.filename;
    }

    const product = await productSchema.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let { id } = req.params
    let product = await productSchema.findByIdAndDelete(id)

    res.send(product);
  } catch (error) {
    res.status(400).json({
      message: "Invalid ID format"
    })
  }
};
