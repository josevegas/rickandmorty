const {User}=require('../../db.js');

const postUserController=async (email,password)=>{
    let newUser={};
    const userByEmail=await User.findAll({
        where: {email: email},
    });
    if(!userByEmail.length&&email.length){
        if(password.length){
            newUser=await User.create({email,password})
        }else{
            throw new Error("ingresar la contraseña");
        }
    }else if(userByEmail.length){
        throw new Error("usuario ya registrado")
    }else{
        throw new Error("completar todos los campos necesarios")
    }
    return newUser;
};

module.exports={postUserController}