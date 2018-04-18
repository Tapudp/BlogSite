const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String },
    content: { type: String }
});

module.exports = mongoose.model('Post', postSchema);