const {Sequelize} = require("sequelize")
const sequelize = new Sequelize("sqlite::memory:")

const Vehicles = sequelize.define('vehicles', {
    uuid: { 
        type: Sequelize.INTEGER, 
        primaryKey: true,
        notNull: true,
        notEmpty: true
    },
    vin: { 
        type: Sequelize.STRING
    },
    make: { 
        type: Sequelize.STRING 
    },
    model: { 
        type: Sequelize.STRING 
    },
    mileage: { 
        type: Sequelize.STRING
    },
    year: { 
        type: Sequelize.INTEGER, 
        validate: { 
            min: {
                args:[1950],
                msg:"Minimum value [1950] allowed in year"
            }
        } 
    },
    price: { 
        type: Sequelize.INTEGER, 
        validate: { 
            min: {
                args:[1],
                msg:"Minimum value [1] allowed in price"
            }
        } 
    },
    zip_code: { 
        type: Sequelize.STRING 
    },
    create_date: { 
        type: Sequelize.DATE 
    },
    update_date: { 
        type: Sequelize.DATE 
    }
},{ timestamps: false });

module.exports = Vehicles;