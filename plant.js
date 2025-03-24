const mongoose = require('mongoose');
const plantSchema = new mongoose.Schema
(
{
    _id:
    { 
        type: mongoose.Schema.Types.ObjectId, 
        auto: true
    },
    name: 
    { 
        type: String, 
        required: true 
    },
    description: 
    { 
        type: String, 
        required: true 
    },
    image: String
}
);
const Plant = mongoose.model('Plant', plantSchema);
module.exports = Plant;