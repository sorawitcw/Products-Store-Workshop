const mongoose = require('mongoose')
const { Schema } = mongoose

// รวมให้เหลือบรรทัดเดียวตามที่ต้องการ
const nanoid = require('nanoid').customAlphabet('123456789abcdefghijklmnopqrstuvwxyz', 10)

const orderSchema = new Schema({
  ordercode: {
    type: String,
    unique: true,
    required: true,
    default: () => nanoid()
  },
  item: [{
    productcode: String,
    quantity: Number,
    totalprice: Number
  }],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  total: {
    type: Number
  }
},{
  timestamps: true
})

module.exports = mongoose.model('order', orderSchema)