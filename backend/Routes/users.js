const express=require('express')
const User=require('../Models/User')
const jwt = require('jsonwebtoken');


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


// Verify Refresh Token Middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    // grab the _id from the request header
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            // user couldn't be found
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
            });
        }


        // if the code reaches here - the user was found
        // therefore the refresh token exists in the database - but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session has expired
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    // refresh token has not expired
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            // the session is VALID - call next() to continue with processing this web request
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    })
}



router.get('/',authenticate, (req, res,next) =>{
    User.find().then(function(users){
        res.json(users);
    }).catch(next);
    // res.send("Working")
   
});

/* USER ROUTES */

/**
 * POST /users
 * Purpose: Sign up
 */
 router.post('/',(req, res) => {
    // User sign up

    let body = req.body;

    // console.log("BODY", body);
    // let isFalse=false;
    // if (body.hasOwnProperty('isAdmin')){
    //     isFalse=req.body['isAdmin'];
    // }
    // let standard=null;
    // if (body.hasOwnProperty('standard')){
    //     standard=req.body['standard'];
    // }
    let newUser = new User({
        username: body.username,
        name:body.name,
        password: body.password, 
        isAdmin:body.isAdmin,
        standard:body.standard,
        contact:body.contact,
        email:body.email,
        stream:body.stream
    });
    try{
    newUser.save(function(err,result){
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



/**
 * POST /users/login
 * Purpose: Login
 */
 router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findByCredentials(username, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        console.log(e)
        res.status(400).send("Invalid Credentials. Please try again.");
    });
})



/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 */
router.get('/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})

/**
 * Delete /users/:userId
 * Purpose: Delete user and returns deleted user object
 */
router.delete('/:userId', authenticate, async (req, res)=>{
    console.log(req.params.userId)
   const post= await  User.findOneAndRemove({_id:req.params.userId});
   res.json(post)
})


/**
 * Update User Infor
 * patch /users/update/:userId
 */
router.patch('/update/:userId',authenticate, async (req,res)=>{

    try{
        console.log(req.body)
    const updatedUser=  await User.findOneAndUpdate({_id:req.params.userId},{
        $set: {
        
            email:req.body.email,
            contact:req.body.contact,
            name:req.body.name
        }});

        let users=User.find({$or:[{_id:req.params.userId}]}).then(function(result){
            console.log(result);
            res.json(result);
        })
}
     
    catch(err){
        res.status(404).send(err.message)
    }
})

router.get('/:userId',authenticate, (req, res, next) =>{
    // console.log("In Videos/VideoId")
    let user=User.find({$or:[{_id:req.params.userId}]}).then(function(result){
        console.log(result);
        res.json(result);
    })
})


module.exports=router;
