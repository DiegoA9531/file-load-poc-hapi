const Joi = require('@hapi/joi')
const VehicleController = require('../controllers/vehicles')

module.exports = [{
  method: 'POST',
  path: '/file/process',
  handler: (req, reply) => VehicleController.populateFromFile(req, reply),
  options: {
    payload: {
        maxBytes: 20715200,
        multipart: {
            output: "file"
        },
        parse: true
    },
    validate: {
        payload: Joi.object({
            vehicleFile: Joi.any()
            .meta({swaggerType: 'file'})
            .optional()
            .allow('')
            .description('csv file'),
        })
    }
  }
}]
