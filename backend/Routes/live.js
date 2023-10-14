const express=require('express')
const Video=require('../Models/Video')
const Live_Session=require('../Models/Live_Sessions')
const jwt = require('jsonwebtoken');
const User=require('../Models/User')


router=express.Router();


// check whether the request has a valid JWT access token
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}


router.post('/',authenticate,(req, res) => {
    // Add Video
    let body = req.body;

    console.log("BODY", body);
    let newVideo = new Live_Session({
        title: body.title,
        subject:body.subject,
        teacher: body.teacher, 
        videolink:body.videolink,
        duration:body.duration,
        description:body.description,
        standard:body.standard,
        stream:body.stream,
    });
    try{
    newVideo.save(function(err,result){
        if (err){
            console.log(err.message);
            // res.json(err.message);
            res.status(400).send("Oh uh, something went wrong ,err "+err.message);

        }
        else{
            res.send(result)
        }
    })
    }
    catch(err){
        res.send(err.message);
    }
});

router.get('/',authenticate,(req, res,next) =>{
    Live_Session.find().then(function(users){
        res.json(users);
    }).catch(next);
    // res.send("Working")
   
});

router.get('/:subject',authenticate, (req, res, next) =>{
    let videos=Live_Session.find({$or:[{subject:req.params.subject}]}).then(function(result){
        console.log(result);
        res.json(result);
    })

})
router.get('/liveVideo/:videoId',authenticate, (req, res, next) =>{
    console.log("In liveVideo/VideoId",req.params.videoId)

    let videos=Live_Session .find({$or:[{_id:req.params.videoId}]}).then(function(result){
        console.log(result);
        res.json(result);
    })
})

router.delete('/:videoId', authenticate, async (req, res)=>{
    console.log(req.params.videoId)
   const video= await  Live_Session.findOneAndRemove({_id:req.params.videoId});
   res.json(video)
})


router.patch('/:videoId',authenticate, async (req, res)=>{
    try {
   const updatedVideo= await Live_Session.findOneAndUpdate({_id:req.params.videoId},{
    $set: {title:req.body.title, 
        description:req.body.description,
        subject:req.body.subject,
        teacher:req.body.teacher,
        videolink:req.body.videolink,
        duration:req.body.duration,
        standard:req.body.standard,
        stream:req.body.stream,
    }
   })
   let videos=Live_Session.find({$or:[{_id:req.params.videoId}]}).then(function(result){
    console.log(result);
    res.json(result);
})
}catch(err){
    res.send(err.message)
}
})
// console.log("working")
router.get('/stdwise/:standard/:stream',authenticate, async(req, res,next) =>{
    console.log("Std,",req.params.standard)
    console.log("Stream:",req.params.stream)
    await Live_Session.find({$and:[{standard: parseInt(req.params.standard)},{stream:req.params.stream}]}).then(function(videos){
        res.json(videos);
    }).catch(next);
    // res.send("Working")
   
});

module.exports=router;
