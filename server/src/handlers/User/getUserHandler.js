const {getUserController}=require('../../controllers/Users/getUserController.js');

const getUserHandler=async (req,res)=>{
    const {email,password}=req.params;
    try {
        if(email&&password){
            const login=await getUserController(email,password);
            if(login){
                res.status(200).send(login);
            }else{
                throw new Error("la contraseña es erronea")
            }
        }
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

module.exports={getUserHandler};