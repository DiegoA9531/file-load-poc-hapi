const {Sequelize} = require("sequelize")
const sequelize = new Sequelize("sqlite::memory:")
const Vehicles = require('../models/vehicles')

const connect = () => sequelize.authenticate()
    .then(result => {
        console.log(`SQLite successfully connected!`);
        return Vehicles.sync();
    })
    .then(result => {
        console.log(`Vehicles table created`);
        return result;
    })
    .catch(error => {
        console.error('Unable to connect to SQLite database:', error);
    })

class SequelizeConnection {
    getConnection() {
        if (this.promise) {
            return this.promise;
        }
        this.promise = connect();
        return this.promise
    }

    async clearDatabase() {
        await Vehicles.drop();
        return Vehicles.sync();
    }
}

module.exports = SequelizeConnection;
