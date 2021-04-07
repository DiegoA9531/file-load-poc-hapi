const Lab = require('@hapi/lab')
const Code = require('@hapi/code')
const fs = require('fs')
const lab = exports.lab = Lab.script()
const createServer = require('../server')

lab.experiment('API test', () => {
  let server

  // Create server before each test
  lab.before(async () => {
    server = await createServer()
  })

  lab.test('GET /about route works', async () => {
    const options = {
      method: 'GET',
      url: '/about'
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(200)
    Code.expect(response.result).to.equal({ ok: 200 })
  })

  lab.test('POST /file/process route fails with empty form', async () => {
    const postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; ------WebKitFormBoundary7MA4YWxkTrZu0gW--";

    const options = {
      method: 'POST',
      url: '/file/process',
      payload: postData,
      headers: {
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(400)
  })

  lab.test('POST /file/process route succeeds with vehicle file in form', async () => {
    const postData = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"vehicleFile\"; filename=\"vehicle_list_01.csv\"\r\nContent-Type: \"{Insert_File_Content_Type}\"\r\n\r\n" + fs.readFileSync('./test/vehicle_list_01.csv') + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--";

    const options = {
      method: 'POST',
      url: '/file/process',
      payload: postData,
      headers: {
        'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      }
    }

    const response = await server.inject(options)
    Code.expect(response.statusCode).to.equal(201)
    Code.expect(response.result).to.equal({ affectedRecords : 4 })
  })
})
