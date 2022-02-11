import express from 'express';
import Favorite from '../models/Favorite.js';

export const favoriteNumber = async(req,res) => {
   //find Fav info inside favorite collection
   //by movie id
   //console.log('Fetching total users favorite count')
   Favorite.find({
       "movieId": req.body.movieId
   }).exec(( err, favorite) =>{
       if(err) return res.status(400).send(err)
       res.status(200).json({
           success:true, favoriteNumber: favorite.length
       })
   })

};

export const favorited = async(req,res) => {
    //find Fav info inside favorite collection
    //by movie id and userFrom
    Favorite.find({
        "movieId": req.body.movieId,
        "userFrom" : req.body.userFrom
    }).exec((err,favorite)=>{
        if(err) return res.status(400).send(err)
        //How can we know if fav or not
        let result = false;
        if(favorite.length!=0){
            result = true
        }
        res.status(200).json({success:true, favorited:result})
    })
 };


 export const addToFavorite = async(req,res) => {
    const{userFrom,movieId,movieTitle,movieImage} = req.body;
 
    try{
        console.log('Adding movie '+movieTitle+' as favorite to user '+userFrom)
        const result = await Favorite.create({userFrom , movieId, movieTitle,movieImage});
        res.status(200).json({success:true,result});

    }catch(error){
        return res.json({success:false,message:error})

    }
}



 export const removeFromFavorite = async(req,res) => {
    //remove movie user id from fav collection
   console.log('Removing movie '+req.body.movieId+' from favorite of user: '+req.body.userFrom)
    Favorite.findOneAndDelete({movieId: req.body.movieId,
                 userFrom: req.body.userFrom})
                 .then((err,doc) => {
                     if(err) return res.status(400).json({success:false,err})
                     res.status(200).json({success:true,doc})
                 })
};


export const checkFavorite = async(req,res) => {

    const checkFav = await Favorite.findOne({ movieId: req.body.movieId,
        userFrom: req.body.userFrom});
    if(checkFav != null){
        res.status(200).json({result:checkFav,success:true});
    }else{
        res.status(400).json({message:"Does not Exists",success:false});
    }

}


export const getFavorites = async(req,res) => {
var favCount =0;
     favCount = await Favorite.find({ movieId: req.body.movieId}).count();
    if(favCount != 0){
        
        res.status(200).json({result:favCount,success:true});
    }else{
        res.status(400).json({message:"Does not Exists",success:false});
    }
}


export const getUserFavorite = async(req,res) => {
try{
     const userFavs = await Favorite.find({ userFrom: req.body.userFrom});
        res.status(200).json({userFavs,success:true})
}catch(e){
        res.status(400).json({message:"Does not Exists",success:false});
    }
}
