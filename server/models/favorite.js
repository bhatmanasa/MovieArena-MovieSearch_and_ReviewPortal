// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom : {
        type: String
    },
    movieId : {
        type: String
    },
    movieTitle : {
        type : String
    },
    movieImage : {
        type: String
    }
});

// const Favorite = mongoose.model('Favorite',favoriteSchema);

// module.exports = {Favorite}
export default mongoose.model("Favorite",favoriteSchema);



// import mongoose from 'mongoose';

// const favoriteSchema = mongoose.Schema({
//     name: {type:String, required:true},
//     email: {type:String,required:true},
//     password: {type:String,required:true},
//     id:{type:String}
// });

// export default mongoose.model("User",userSchema);