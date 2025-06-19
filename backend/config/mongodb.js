import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(`${process.env.MONGODB_URI}/prescripto`)
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => console.log("DB Connection Failed, Error : ", err));
};

export default connectDB;
