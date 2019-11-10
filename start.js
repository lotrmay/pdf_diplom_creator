var pdf=require ('pdfkit');
var fs=require('fs');
const url = require('url');
const http = require('http');
var path = require('path');
const express = require('express');
var qs = require('querystring');

const app = express();
app.use(express.static('public'));
app.listen(3000, () => {
  console.log('listening on 3000');
});

app.get('/', (req, res) => {
  res.sendfile(path.join('index.html'));
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.post('', function(req,res) {
    createDoc(req.body.name,req.body.school,req.body.diplom);
    res.sendfile(path.join('index.html'));
  });
function createDoc(name,school,diplom){
    var myDoc=new pdf;
    myDoc.pipe(fs.createWriteStream(diplom+".pdf",{encoding:"utf-8"}));
    myDoc.registerFont('Cardo', 'Cardo-Regular.ttf')
    myDoc.registerFont('Cardo-Bold', 'Cardo-Bold.ttf')
    myDoc.font('Cardo');
    myDoc.fontSize(100);
    myDoc.text("Diplom",150,300);
    myDoc.fontSize(30);
    myDoc.font('Cardo-Bold');
    
    myDoc.text("Jméno:",37,458);
    myDoc.text("Škola:",53,558);
    myDoc.font('Cardo');
    myDoc.text(name,145,458);
    myDoc.text(school,145,558);


    myDoc.moveTo(145,490);
    myDoc.lineTo(467,490);
    myDoc.fill('black');

    myDoc.moveTo(145,590);
    myDoc.lineTo(467,590);
    myDoc.fill('black');

    myDoc.image('medal.png', 156, 0, {width: 300})

    myDoc.moveTo(0, 0)
    myDoc.lineTo(0, 100)
    myDoc.lineTo(100, 0)
    myDoc.fill('#FF3300');

    myDoc.moveTo(612, 0)
    myDoc.lineTo(612, 100)
    myDoc.lineTo(512,0)
    myDoc.fill('#FF3300');

    myDoc.moveTo(612, 800)
    myDoc.lineTo(612, 700)
    myDoc.lineTo(512,800)
    myDoc.fill('#FF3300');

    myDoc.moveTo(0, 800)
    myDoc.lineTo(100, 800)
    myDoc.lineTo(0, 700)
   myDoc.fill('#FF3300');

   myDoc.end();
}

