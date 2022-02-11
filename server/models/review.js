// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema({
    userFrom : {
        type: String
    },
    movieId : {
        type: String
    },
    reviewMessage : {
        type : String
    },
    currDate: {
        type : String
    }
});

// const Favorite = mongoose.model('Favorite',favoriteSchema);

// module.exports = {Favorite}
export default mongoose.model("Review",reviewSchema);

