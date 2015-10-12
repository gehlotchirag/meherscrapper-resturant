var Xray = require('x-ray');
var x = Xray();

x('http://www.cromaretail.com/Samsung-Galaxy-Core-2-GSM-Mobile-Phone-(Dual-SIM)-(White)-pc-23306-95.aspx','.product', {
  keyfeature: ['.pDesc .kf ul  li']
})(function(err, result) {
  console.log(result) // Google
})

//xray('http://google.com', 'title')(function(err, title) {
//  console.log(title) // Google
//})
