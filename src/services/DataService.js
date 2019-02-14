module.exports = class DataService {
  constructor (message) {
    this.message = message
  }
  getData () {
    return { message: this.message }
  }
}