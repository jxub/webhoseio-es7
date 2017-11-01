const querystring = require('querystring');
const axios = require('axios');


config = (options) => new WebhoseioClient(options)

module.exports = { config }

class WebhoseioClient {
  constructor(options = {}) {
    if (!options.token) {
      throw new Error(`Missing required argument 'token'.`)
    }
    this.options = {
      token: options.token,
      format: options.format || 'json'
    }
  }

  async query(endpoint, params) {
    let queryObj = querystring.stringify({...this.options, params})
    this.nextUri = `https://webhose.io/${endpoint}${queryObj}`
    
    return await this.getNext()
  }

  async getNext() {
    let data
    try {
      data = await axios(this.nextUri).data
      this.nextUri = `https://webhose.io${data.next}`
    } catch (error) {
      throw new Error(`fetching response ${error}`)
    }

    return await data
  }
}
