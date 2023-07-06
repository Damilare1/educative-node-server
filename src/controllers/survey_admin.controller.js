import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { jwt_secret } from '../../config/config.js';
import Admin from '../models/survey_admin.model.js'
import { ValidationError } from 'sequelize'

const saltRounds = 10; // Number of salt rounds for bcrypt
const keyTypeErrorMapper = {
  not_unique: "already exists",
};
// Login method
export const login = async ({ email, password, sessionId }) => {
  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return { error: { message: "Admin not found" }, code: 404 };
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return { error: { message: "Incorrect password" }, code: 401 };
    }
    const user = { username: admin.username };
    if (isPasswordValid && admin) {
      const token = jwt.sign(
        { admin_id: admin.id, session: sessionId },
        jwt_secret,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
    }
    // Successful login
    return { body: user, code: 200 };
  } catch (error) {
    console.error("Error during login:", error);
    return { error: { message: "Internal server error" }, code: 500 };
  }
};

// Update method
export const update = async ({ email, username, password }) => {
  try {
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return { error: { message: "Admin not found" }, code: 404 };
    }

    // Update the admin fields
    if (username && username != admin.username) {
      admin.username = username;
    }

    if (password && !(await bcrypt.compare(password, admin.password))) {
      admin.password = await bcrypt.hash(password, saltRounds);
    }

    await admin.save();

    // Successful update
    return { body: { message: "Admin updated successfully" }, code: 200 };
  } catch (error) {
    console.error("Error during admin update:", error);
    return { error: { message: "Internal server error" }, code: 500 };
  }
};

// Signup method
export const signup = async ({ email, username, password }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await Admin.create({
      email,
      username,
      password: hashedPassword,
    });

    const user = { username };

    // Successful signup
    return { body: user, code: 201 };
  } catch (e) {
    if (e instanceof ValidationError) {
      const temp = {};
      e.errors.forEach((item) => {
        const key = item.validatorKey;
        temp[item.path] = `${item.path} ${keyTypeErrorMapper[key]}`;
      });
      console.log(e.errors);
      return { error: { message: temp }, code: 401 };
    } else {
      console.error("Error during admin signup:", e.errors);
      return { error: { message: e.message }, code: 500 };
    }
  }
};

// Get user method
export const getuser = async ({ admin_id }) => {
  try {
    const { username, id } = await Admin.findByPk(admin_id);

    // Return user info
    return { body: { username, id }, code: 200 };
  } catch (error) {
    console.error("Error finding logged in user:", error);
    return { error: { message: "Internal server error" }, code: 500 };
  }
};
