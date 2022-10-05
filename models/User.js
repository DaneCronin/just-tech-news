const {model, DataTypes} = require('sequelize');
const Sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//Create User model
class User extends Model {}

//Setup table columns and configuration
User.init(
    {
        //Define an ID column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

         //Define a username colunn
       username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true}
        },

        //define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //Password must be at least 4 characters long
                len: [4]
            }
        }
    },
    {
        hooks: {
       // set up beforeCreate lifecycle "hook" functionality
  async beforeCreate(newUserData) {
    newUserData.password = await bcrypt.hash(newUserData.password, 10);
    return newUserData;
  },
   // set up beforeUpdate lifecycle "hook" functionality
   async beforeUpdate(updatedUserData) {
    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    return updatedUserData;
  }
  
        },
        
        //Table Configuration options go here

         // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'user'

    }
);

module.exports = User;
