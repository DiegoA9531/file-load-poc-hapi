const csv = require('csv-parser')
const fs = require('fs')
const VehicleModel = require('../models/vehicles')

const VehicleController = {

    async populateFromFile (req, reply) {
        try {
            let columns = Object.keys(VehicleModel.rawAttributes);

            const data = await new Promise((resolve, reject) => { 
                let data = [];
                fs.createReadStream(req.payload.vehicleFile.path)
                .pipe(csv())
                .on('data', function (row) {
                    let vehicle = {};
                    Object.keys(row).forEach((key) => {
                        let keyFormatted = key.toLowerCase().replace(' ','_');
                        if(columns.indexOf(keyFormatted) !== -1) vehicle[keyFormatted] = row[key];
                    });
                    if(vehicle.uuid) data.push(vehicle);
                })
                .on('end', function () {
                    resolve(data);
                })
                .on('error', reject);
            });
            
            return VehicleModel.bulkCreate(data, {
                updateOnDuplicate: ['uuid'],
            })
            .then(function(response){
                return reply.response({
                    affectedRecords: response.length
                }).code(201);
            })
            .catch(function(err){
                return reply.response({
                    statusCode: 500,
                    error: "Internal Server Error"
                }).code(500);
            })
        } catch (err) {
            return reply.response({
                statusCode: 500,
                error: "Internal Server Error"
            }).code(500);
        }
    },
}

module.exports = VehicleController;