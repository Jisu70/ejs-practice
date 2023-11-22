// Models
import User from "../models/UserModel.js";

// Get all the user
export const getController = async (req, res) => {
  try {
    const users = await User.find();
    res.render("index", {
      title: "Home Page",
      users: users,
    });
  } catch (error) {}
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
    const { name, email, phone, image } = req.body;
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

//Edit the user

// Save useer
export const editUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    console.log(user);
    if (user) {
      res.render("update_user", {
        title: "Update User",
        user : user
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// Save useer
export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    console.log(user);
    if (user) {
      res.render("update_user", {
        title: "Update User",
        user: user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
