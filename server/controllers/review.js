import express from 'express';
import Review from '../models/Review.js';


 export const writeReview = async(req,res) => {
    const{userFrom,movieId,reviewMessage} = req.body;
    const currDate = new Date()
 
    try{
    //    console.log('Updating Review for user -'+userFrom+' on movie='+movieId+' with message ='+reviewMessage)
  
        const result = await Review.create({userFrom , movieId, reviewMessage,currDate});
    //    console.log('came to review result'+result)
        res.status(200).json({success:true,result});

    }catch(error){
      //  console.log('Error storing movie review : '+error)
        return res.json({success:false,message:error})

    }
}





export const getMovieReviews = async(req,res) => {
    const{movieId} = req.body;
 
    try{
      //  console.log('Fetching Movie Reviews for the movie: '+req.body.movieId)
        const revMovs = await Review.find({movieId: req.body.movieId});
        
        res.status(200).json({revMovs,success:true});

    }catch(error){
      //  console.log('Error fetching movie reviews : '+error)
        return res.json({success:false,message:error})

    }
}


