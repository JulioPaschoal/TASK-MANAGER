const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanegercluster.6xysy69.mongodb.net/?retryWrites=true&w=majority&appName=TaskManegerCluster`
        );
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectToDatabase;
