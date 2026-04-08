const {getCharByIdController}=require('../../controllers/Cards/getCharByIdController.js');


const getCharByIdHandler=async (req,res)=>{
    const {id}=req.params;
    try {
        const character=await getCharByIdController(id);
        res.status(200).send(character);
    } catch (error) {
        res.status(400).send({error: error.message});
    }
}



module.exports={getCharByIdHandler}