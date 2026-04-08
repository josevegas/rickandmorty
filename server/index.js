const app=require('./src/app.js');
require('dotenv').config();
const {sequelize}=require('./src/db.js');

const {PORT}=process.env;
sequelize.sync({force:false}).then(()=>{
    console.log('Conected to DB');
    app.listen(PORT,()=>{
        console.log(`Listening on port ${PORT}`);
    });
});