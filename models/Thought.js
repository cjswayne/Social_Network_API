const { model, Schema } = require('mongoose');


const thoughtSchema = new Schema({});



const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
