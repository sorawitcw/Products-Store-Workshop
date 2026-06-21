const mongoose = require('mongoose')
const { Schema } = mongoose
const nanoid = require('nanoid').customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 8)

const productSchema = new Schema({
  productcode: {
    type: String,
    unique: true,
    required: true,
    default: () => nanoid()
  },
  productphoto: { type: String },
  productname: { type: String, required: true, trim: true },
  description: { type: String, maxlength: 500 },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 }

  // category: { type: String },
  // colorproduct: { type: String },
  // sizeproduct: { type: String },
  // sold: { type: String }

},{
  timestamps: true
})

module.exports = mongoose.model('product', productSchema)