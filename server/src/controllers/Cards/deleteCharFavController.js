const {User}=require('../../db.js');

const deleteCharFavController=async (email,id)=>{
    const userByEmail=await User.findOne({
        where: {
            email: email,
        }
    });
    await userByEmail.removeCard(id);
    return 'Favorito removido';
}

module.exports={deleteCharFavController};