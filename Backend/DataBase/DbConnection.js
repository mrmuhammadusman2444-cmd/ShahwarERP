import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/ShahwarERP');
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error('MongoDB is not Connected');

    }
};
export default connectDB;