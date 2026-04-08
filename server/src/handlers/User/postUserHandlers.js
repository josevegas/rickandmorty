const {postUserController}=require('../../controllers/Users/postUserController.js');

const postUserHandler=async (req,res)=>{
    const {email,password}=req.params;
    try {
        const newUser=await postUserController(email,password);
            if(newUser){
                res.status(200).send(newUser.data);
            }
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

module.exports={postUserHandler};