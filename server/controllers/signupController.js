const User = require("../models/user"); // Adjust the path accordingly
const bcrypt = require("bcrypt");

const signupController = {
  signup: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Check if the username or email is already taken
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new User instance
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: "User successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = signupController;
