const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema
const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    snippet:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    // likes:[{
    //     type: Number,
    //     ref:"User"
    // }]
},{timestamps: true});

//model
const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;