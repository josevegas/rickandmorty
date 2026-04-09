const {postUserController}=require('../../controllers/Users/postUserController.js');

const postUserHandler=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const newUser=await postUserController(email,password);
        if(newUser){
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports={postUserHandler};