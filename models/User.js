const { model, Schema } = require('mongoose');


const userSchema = new Schema({
    username:{
        type:String,
        unique: true,
        required: true, 
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] // Regex to validate email format
    },
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }]
}, {
    toJSON:{
        virtuals: true
    },
    id:false
});


userSchema.virtual('friendCount').get(function() {
    return Array.isArray(this.friends) ? this.friends.length : 0;
})


const User = model('User', userSchema);

module.exports = User;
