module.exports = class DataController {
  constructor (dataService) {
    this.dataService = dataService
    this.path = '/api/data'
  }

  execute (req, res) {
    res.json(this.dataService.getData())
  }
}
