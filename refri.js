
var xray = require('x-ray');
var y = require('x-ray');
var sub = [];
var fs = require ('fs');
var Download = require ('download' );
var download = new Download ();
var thumbDownload = new Download ();
var request = require('request');

var interval = 10 * 2000; // 10 seconds;
var pageLength = 1;

for (var i = 1; i <=pageLength; i++) {
  setTimeout( function (i) {
    var mainUrl ="http://www.cromaretail.com/display-product-grid.aspx?strip=strip&test=test&CategoryID=47&MinPrice=6990&MaxPrice=253990&pageNumber=";
    mainUrl = mainUrl +i;
    y('http://www.cromaretail.com/display-product-grid.aspx?strip=strip&test=test&CategoryID=47&MinPrice=6990&MaxPrice=253990&pageNumber=1')
        .select([{
          $root: 'article',
          name: 'article h2',
          price: 'article h3',
          image:'article img[src]',
          link: 'article h2 a[href]'
        }])
        .format(function(obj) {
          var price;
          obj.price = obj.price.slice(14, obj.price.length)
          obj.price = parseInt(obj.price.replace(',',''));
          price = obj.price;
          var link = obj.link.split('/');
          delete link[link.length-2 ]
          var xlink = link.join("/");
          link = link[link.length-1];
          xray(xlink)
              .select({
                name: '.pDesc h1',
                img: ['.pImage .productImage img[src]'],
                keyfeature: ['.pDesc .kf ul  li']
              })    .format(function(obj) {
                function onlyUnique(value, index, self) {
                  return self.indexOf(value) === index;
                }
                function makeLink(value, index, self) {
                  self.forEach(function(name, index, theArray) {
                    var link = name.split('/');
                    delete link[4]
                    name= link.join("/");
                    theArray[index]=name;
                    download.get (name);
                  });
                  download.dest ( './refri/inner' );
                  download.run ();
                  return self;
                }

                obj.img = obj.img.filter( onlyUnique );
                obj.img = obj.img.filter( makeLink );
                obj.imgages = obj.img.filter( onlyUnique );
                obj.imgages = obj.img.filter( makeLink );
                obj.imgages.forEach(function (name, i, theArray) {

                  var link = name.split('/');
                  name = link[link.length - 1]
                  theArray[i] = name;
                });

                obj.link = link;
                obj.price = price;
                delete obj.img
                return obj
              })
              .run(function(err,result) {
                sub.push(result);
                fs.writeFile ( "./refri/inner/washinginner.json", JSON.stringify (sub, null , '\t' ));
                return result
              })
          obj.link = link;
          thumbDownload.get (obj.image);
          thumbDownload.dest ( './refri' );
          thumbDownload.run ();
          var img = obj.image.split('/');
          obj.image=img[img.length-1];
          return obj;
        })
        .paginate('a.bx-next[href]')
        .delay(2000)
        .write('./refri/washingoutter.json')
  }, interval * i, i);
}


//});


