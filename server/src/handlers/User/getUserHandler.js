const {getUserController}=require('../../controllers/Users/getUserController.js');

const getUserHandler=async (req,res)=>{
    const {email,password}=req.body;
    console.log(`Login attempt for email: ${email}`);
    try {
        if(email && password){
            const login=await getUserController(email,password);
            console.log(`Login result for ${email}: ${login}`);
            if(login){
                res.status(200).json({ access: true });
            }else{
                res.status(401).json({ access: false, error: "Email o contraseña incorrectos" });
            }
        } else {
            console.log("Missing email or password in request body");
            res.status(400).json({ error: "Faltan datos obligatorios" });
        }
    } catch (error) {
        console.error(`Error in getUserHandler: ${error.message}`);
        res.status(500).json({error: error.message});
    }
}

module.exports={getUserHandler};