const bcrypt = require("bcrypt");
const config = require("../../config/config");
const Admin = require("../models/survey_admin.model");
const jwt = require("jsonwebtoken");

const saltRounds = 10; // Number of salt rounds for bcrypt

// Login method
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const user = { username: admin.username };
    if (isPasswordValid && admin) {
      const token = jwt.sign(
        { admin_id: admin.id, session: req.session.id },
        config.jwt_secret,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
    }
    // Successful login
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update method
const update = async (req, res) => {
  const { id } = req.params;
  const { email, username, password } = req.body;

  try {
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update the admin fields
    admin.email = email;
    admin.username = username;
    admin.password = await bcrypt.hash(password, saltRounds);

    await admin.save();

    // Successful update
    return res
      .status(200)
      .json({ message: "Admin updated successfully", admin });
  } catch (error) {
    console.error("Error during admin update:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Signup method
const signup = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await Admin.create({
      email,
      username,
      password: hashedPassword,
    });

    const user = { username };

    // Successful signup
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error during admin signup:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get user method
const getuser = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { username } = await Admin.findByPk(loggedInUser.admin_id);

    // Return user info
    return res.status(200).json({ username });
  } catch (error) {
    console.error("Error finding logged in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, update, signup, getuser };
