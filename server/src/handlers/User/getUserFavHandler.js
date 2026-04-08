const {getUserFavController}=require('../../controllers/Users/getUserFavController.js');

const getUserFavHandler=async (req,res)=>{
    try {
        const {email}=req.params;
        const userFav=await getUserFavController(email);
        res.status(200).send(userFav);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

module.exports={getUserFavHandler}