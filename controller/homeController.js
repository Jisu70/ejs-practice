//Dependencies 
import dotenv from 'dotenv'
dotenv.config() ;
// Models
import User from "../models/UserModel.js";
// import crypto from "crypto";

// Function to hash a password
// const hashPassword = password => {
//   return crypto.createHash('sha256').update(password).digest('hex');
// }

// // Function to encrypt the user ID
// function encryptUserId(userId) {
//   return hashPassword(userId);
// }

// Get all the users
export const getController = async (req, res) => {
  try {
    const users = await User.find();
    
    // Encrypt user IDs 
    // const encryptedUsers = users.map((user) => ({
    //   ...user.toObject(),
    //   encryptedId: encryptUserId(user._id.toString()),
    // }));
    
    res.render("index", {
      title: "Home Page",
      users: users, 
    });
  } catch (error) {
    // Handle errors appropriately
    res.status(500).json({ error: error.message });
  }
}


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
        user: user,
        userId : id
      });
    }
  } catch (error) {
    console.log(error);
  }
};
// Update user
export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    const { name, email, phone, image } = req.body;
    user.name = name
    user.email = email
    user.phone = phone
    user.image = req.file.filename
    await user.save()
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.log(error);
  }
};
