const { model, Schema } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema({
    thoughtText:{
        type: String,
        required: [true, 'Your thought must not be blank'],
        maxlength:[280, 'Your thought cannot exceed 280 chars']
    },
    createdAt: {
        type:Date,
        default:Date.now,
        get:(createdAtVal) => createdAtVal.toLocaleString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters:true
    },
    id:false
});



const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
