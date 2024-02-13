const { model, Schema } = require('mongoose');


const reactionSchema = new Schema({});



const Reaction = model('Reaction', reactionSchema);

module.exports = Reaction;
