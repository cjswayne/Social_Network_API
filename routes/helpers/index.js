// error handling helper
module.exports = {
    errorHandler(err, res){
        console.log(`\n\n\n'Errors'`, err.errors);

        if(err.code === 11000) {
            return res.status(403).json({
                message:"User with that email address already exists",
            });
        }

        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                message:'User with that ID could not be found'
            })
        }

        if(!err.errors) {
            return res.status(500).json({
                message:'Server encountered an error'
            })
        }

        return res.status(403).json({
            messages: Object.values(err.errors).map((val) => val.message)
        })
    }
}