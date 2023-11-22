import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const dbOption = {
      dbName: "Newapp",
    };
    const db = mongoose.connection ;
    db.on('error', (error) => console.log("Error :", error ))
    db.on("open", () =>
      console.log("Successfully connected with the database")
    );
    await mongoose.connect(process.env.MONGO_URL, dbOption); 
  } catch (error) {
    console.log(error)
  }
};

