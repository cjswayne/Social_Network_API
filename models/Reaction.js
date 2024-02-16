const { model, Schema, mongoose } = require('mongoose');


const reactionSchema = new Schema({
    reactionId:{
        type:Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: [280, 'Reaction cannot exceed 280 chars']
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get:(createdAtVal) => createdAtVal.toLocaleString()
    }
}, {
    toJSON:{
        getters: true
    },
    id: false
});



// const Reaction = model('Reaction', reactionSchema);

module.exports = reactionSchema;
