const mongoose = require('mongoose');


const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,

    },
    teacher:{
        type: String,
        required: true,

    }, 
    videolink:{
        type: String,
        required: true,

    },
    duration: {
        type: String,
        required: false,
    },
    description: {
        type: String,
    },
     standard:{
        type:Number,
        required:true
    },
    stream:{
        type:String,
    }

});


const Live_Session = mongoose.model('Live_Session', VideoSchema);

module.exports = Live_Session; 
