var async = require('async')
var param1 = 'foobar';
var xray = require('x-ray');
var y = require('x-ray');
var fs = require ('fs' );


function subdata(param1) {
  console.log('*****subdata function called' +param1)
  xray('http://www.cromaretail.com/Samsung-Galaxy-Core-2-GSM-Mobile-Phone-(Dual-SIM)-(White)-pc-23306-95.aspx')
      .select({
        keyfeature: ['.pDesc .kf ul  li']
      })
      .run(function(err, result) {
        return result;
      });
}

function getdata(param1, callback) {
  console.log('getdata function called')
  y('http://www.cromaretail.com/Mobile-Phones-c-10.aspx')
      .select([{
        $root: 'article',
        namsse: 'article h2',
        price: 'article h3'
      }]).run(function(err, result) {
        return result;
      });
  callback(subdata(result))
}

async.series([
  function(callback) {
    getdata(param1, callback)
  },
], function(err) {
  console.log('all functions complete')
})
