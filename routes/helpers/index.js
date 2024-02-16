// error handling helper
module.exports = {
    errorHandler(err, res){
        console.log(err)
        console.log(`\n\n\n'Errors'`, err.errors);

        if(err.code === 11000) {
            return res.status(403).json({
                message:"User with that email address already exists",
            });
        }

        if(err.kind === 'ObjectId') {

            if(err.path === '_id'){
                if(err.model.modelName === 'Thought'){
                    return res.status(404).json({
                        message:'Thought with that ID could not be found'
                    })
                }
                if(err.model.modelName === 'User'){
                    return res.status(404).json({
                        message:'User with that ID could not be found'
                    })
                }
                
            }

            if(err.path === 'friends'){
                return res.status(404).json({
                    message:'Friend with that ID could not be found'
                })
            }

        }
        if(!err.errors) {
            return res.status(500).json({
                message:'Server encountered an error'
            })
        }

        return res.status(403).json({
            messages: Object.values(err.errors).map((val) => val.message)
        })
    },

}