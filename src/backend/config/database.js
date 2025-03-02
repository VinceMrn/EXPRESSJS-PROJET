const {Sequelize, DataTypes} = require("sequelize");
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('projetexpress', 'root', 'root', {  
    host: '127.0.0.1', 
    dialect: 'mysql',
    port: 8889,
    logging: false
});

sequelize.authenticate().then(() => {
        console.log('Connexion à la base de données réussie.');
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });

    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isBanned: { 
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });


sequelize.sync().then(() => {
    console.log('Table crée');


    return User.findOrCreate({
        where: { email: 'admin@example.com' },
        defaults: {
            password: bcrypt.hashSync('admin123', 10),
            isAdmin: true
        }
    }).then(([user, created]) => {
        if (created) {
            console.log('Utilisateur admin crée');
        } else {
            console.log('Utilisateur admin existe déjà.');
        }
    });
}).catch((error) => {
    console.error(error);
});

module.exports = { User, sequelize };