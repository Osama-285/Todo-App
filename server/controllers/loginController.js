// loginController.js
const User = require("../model/user"); // Adjust the path accordingly
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare the provided password with the stored hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      // If passwords don't match, return an error
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // If passwords match, generate a JWT token
      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.SECRET_Key,
        {
          expiresIn: "1h", // Set the expiration time of the token (optional)
        }
      );

      // Send the token in the response
      res.json({ token: token, id: user._id, email: user.email });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = loginController;
