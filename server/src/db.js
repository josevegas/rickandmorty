require('dotenv').config();
const { Sequelize } = require('sequelize');
const UserFunction = require('./models/User.js');
const CardFunction = require('./models/Card.js');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT, DATABASE_URL } = process.env;

const sequelize = DATABASE_URL
    ? new Sequelize(DATABASE_URL, { 
        logging: false, 
        native: false,
        dialectOptions: {
            ssl: DATABASE_URL.includes('railway') || DATABASE_URL.includes('render') ? {
                require: true,
                rejectUnauthorized: false
            } : false
        }
    })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
        { logging: false, native: false }
    );

UserFunction(sequelize);
CardFunction(sequelize);

const {User,Card}=sequelize.models;

User.belongsToMany(Card,{through: 'Favorite', timestamps: false});
Card.belongsToMany(User,{through: 'Favorite', timestamps: false});

module.exports={sequelize,...sequelize.models};