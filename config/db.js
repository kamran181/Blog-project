import mongoose from 'mongoose';
/**
 * connectDB is a function which connects the mongo db
 * @param {*} req 
 * @param {*} res 
 */
export const connectDB = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('mongoose connected successfully');
    } catch (error) {
        console.log(error);
    }
}