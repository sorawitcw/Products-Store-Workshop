var userSchema = require('../models/user.model')
const bcrypt = require('bcrypt')

exports.getUsers = async (req, res) => {
  try {
    const users = await userSchema.find({})
    res.json(users)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })

  }
}

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userSchema.findById(id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    } 
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format" })
  }
}

exports.createUser = async (req, res) => {
  try {
    const { username, password, firstname, lastname, email, gender, age, role } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new userSchema({ username, password: hashedPassword, firstname, lastname, email, gender, age, role }) 

    await user.save()

    res.status(201).json({ message: "Create Success." })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Remove immutable / metadata fields that MongoDB prevents from being updated
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    const user = await userSchema.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to update profile",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userSchema.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
    }
    res.json({ message: "User deleted successfully", user })
  } catch (error) {
    res.status(400).json({
      message: "Invalid ID format"
    })
  }
}