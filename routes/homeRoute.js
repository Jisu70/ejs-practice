// Depenedencies
import express from "express";
// Middleware
import { upload } from "../middlewares/fileUpload.js";
import {
  getController,
  addUserController,
  saveUserController,
  aboutPageController,
  editUserController,
  updateUserController,
} from "../controller/homeController.js";

const router = express.Router();

router.get("/home", getController);
router.get("/add-user", addUserController);
router.post("/add-user", upload.single("image"), saveUserController);
router.get("/about-page", aboutPageController);
router.get("/edit/:id", editUserController);
router.post("/update-user/:id",upload.single("image"), updateUserController);

export default router;
