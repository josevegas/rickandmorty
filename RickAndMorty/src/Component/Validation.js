const regexEmail=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPassword=new RegExp(/(?=(.*[0-9]))(?=(.*[a-z]))(?=(.*[A-Z])).{6,10}/);

/**
 * Validates user data (email and password).
 * @param {Object} userData - The user data to validate.
 * @param {string} userData.email - The user's email.
 * @param {string} userData.password - The user's password.
 * @returns {Object} An object containing error messages for invalid fields.
 */
const Validation=(userData)=>{

    const error={};
    if(!regexEmail.test(userData.email)){
        error.email="Debe ser un email";
    }
    if(!userData.email){
        error.email="No puede ser vacío";
    }
    if(userData.email.length>35){
        error.email="No puede tener más de 35 caracteres";
    }
    if(!regexPassword.test(userData.password)){
        error.password="La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y entre 6 a 10 caracteres";
    }
   return error;
}

export default Validation;