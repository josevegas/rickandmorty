const {deleteCharFavController}=require('../../controllers/Cards/deleteCharFavController.js');

const deleteCharFavHandler=async (req,res)=>{
    try {
        const {email,id}=req.params;
        const response=await deleteCharFavController(email,id);
        res.status(200).send(response);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}

module.exports={deleteCharFavHandler};