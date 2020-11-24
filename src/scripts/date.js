const { borrowingHelper } = require('../helper')

var date1 = new Date('06/20/2019')
var date2 = new Date('06/28/2019')

var res = borrowingHelper.countLate(date1, date2)
console.log(res)
process.exit(0)
