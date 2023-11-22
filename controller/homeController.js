//Dependencies
import dotenv from "dotenv";
dotenv.config();
// Models
import User from "../models/UserModel.js";

// Get all the users
export const getController = async (req, res) => {
  try {
    const users = await User.find();
    if (users.toString() == []) {
      res.render("index", {
        title: "Home Page",
        users: [],
        message: { type: "Danger", message: "No User In The Database" },
      });
    } else {
      res.render("index", {
        title: "Home Page",
        users: users || [],
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add user
export const addUserController = (req, res) => {
  try {
    res.render("add_user", {
      title: "Add user page",
    });
  } catch (error) {}
};

// About page
export const aboutPageController = (req, res) => {
  try {
    res.render("about_page", {
      title: "About page",
    });
  } catch (error) {}
};

// Save useer
export const saveUserController = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = new User({
      name,
      email,
      phone,
      image: req.file.filename,
    });
    await user.save();
    req.session.message = {
      type: "success",
      message: "User added successfully",
    };
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

// Edit user
export const editUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    console.log(user);
    if (user) {
      res.render("update_user", {
        title: "Update User",
        user: user,
        userId: id,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Update user
export const updateUserController = async (req, res) => {
  try {
    const users = await User.find();
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    const { name, email, phone } = req.body;
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.image = req.file.filename;
    await user.save();
    req.session.message = {
      type: "success",
      message: "User Updated successfully",
    };
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      await User.deleteOne({ _id: id });
      console.log("User Deleted Successfully ");
      req.session.message = {
        type: "success",
        message: "User Updated successfully",
      };
      res.redirect("/home");
    } else {
      console.log("Id was missing");
    }
  } catch (error) {
    console.log(error);
  }
};
