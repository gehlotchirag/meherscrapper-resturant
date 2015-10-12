//var Xray = require('x-ray');
//var x = Xray();
//var y = Xray();

//x.delay(5000)('http://www.cromaretail.com/Mobile-Phones-c-10.aspx','article', [{
//  namsse: 'article h2',
//  info: y('http://reddit.com', '.content'),
//  price: 'article h3',
//  yyy: y('http://www.cromaretail.com/Samsung-Galaxy-Core-2-GSM-Mobile-Phone-(Dual-SIM)-(White)-pc-23306-95.aspx', '.product','.cta')
//}])
//    .write('result.json')

//var $ = require('jquery');
//var Xray = require ('x-ray' );
//var FS = require ('fs' );
//var Download = require ('download' );
//var y = new Xray ();

var xray = require('x-ray');



xray('http://www.cromaretail.com/Mobile-Phones-c-10.aspx')
    .select([{
      $root: 'article',
      namsse: 'article h2',
      price: 'article h3'
    }])
    .format(function(obj) {
      xray('http://www.cromaretail.com/Samsung-Galaxy-Core-2-GSM-Mobile-Phone-(Dual-SIM)-(White)-pc-23306-95.aspx')
          .select({
            $root: 'product',
              keyfeature: ['.pDesc .kf ul  li']
            })    .format(function(obj) {
            console.log("_________");
            console.log(obj);
            })
          })
    .write('result.json')






/*
function ajax1() {
  console.log("hi");
  var xx = y('http://www.cromaretail.com/Samsung-Galaxy-Core-2-GSM-Mobile-Phone-(Dual-SIM)-(White)-pc-23306-95.aspx','.product', {
    keyfeature: ['.pDesc .kf ul  li']
  })(function(err, result) {
    console.log(result);
    return(result);
  });
  $.when(xx()).done(function(a1){
    console.log(a1);
  })
  var z = xx();
  console.log(z);
  return "sd"
}

Xray('http://www.cromaretail.com/Mobile-Phones-c-10.aspx','article', [{
  namsse: 'article h2',
  price: 'article h3'
}])
( function (ERR, results) {
  results = results.filter ( function (obj) {
    $.when(ajax1()).done(function(a1){
      console.log("*******");
      console.log(a1)
      obj.info = a1;
    });
  })

  //var download = new Download ();
  //results = results.filter ( function (Image) {
  //  return image.width> 100 ;
  //}). ForEach ( function (Image) {
  //  download.get (image.src);
  //});
  //download.dest ( './images' );
  //download.run ();
  FS.writeFile ( "./result.json", JSON.stringify (results, null , '\t' ));
})
    */