const Mock = require('mockjs')
Mock.mock('http://api/mock',function(options) {
  console.log(options);
  return Mock.mock({
    'user|1-5': [{
      'name': '@cname',
      'id|+1': 1,
      'number|20-90': 20,
    }],
    'code': 1,
    'token': Mock.Random.string(80,100),
    'mounthSealPrecent|60-100': 60,
    'totalShops|400-500': 400
  })
})
