const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, password, firstname, lastname, email, age, gender } =
      req.body;

    // ตรวจสอบ user ซ้ำ
    let user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (user) {
      return res.status(400).json({
        message: "User or Email already exists",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    user = new User({
      username,
      password: hashedPassword,
      firstname,
      lastname,
      email,
      age,
      gender,
    });

    await user.save();

    res.status(201).json({
      message: "Register Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret123", {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        gender: user.gender,
        age: user.age,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
