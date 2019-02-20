const http = require('http');
const url = require('url');
const fs = require('fs');
const PATH = "../csv/points.csv";
const PORT = 5000;

var server = http.createServer(async function (req, res) {
  //ALLOW CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if(req.method == "GET") {
    //Parsing URL to get Querry Params
    let url_parts = url.parse(req.url, true);
    let query = url_parts.query;

    let x = parseFloat(query.x);
    let y = parseFloat(query.y);
    //console.log({x,y});

    content = `( ${x}, ${y} )`+"\n";
    fs.appendFile(PATH, content, function(err){
      if(err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end( JSON.stringify({"Success": false}))
      }

      let newx = x+1;
      let newy = y-1;
      //console.log({newx,newy});
      res.writeHead(200, { "Content-Type": "application/json" });
      payload  = {"success": true, "x": newx, "y": newy};

      //If the point is in the range the send a success message with new cordinates
      //else Print the cordinates are not accessible 
      if( newx>=0 && newx<=10 && newy>=0 && newy<=10) {
        res.end( JSON.stringify(payload) );
      } else {
        console.log(`(${newx}, ${newy}) is not accessible`);
        payload["success"] = false;
        res.end( JSON.stringify(payload) );
      }
      
    });
  } 
})

server.listen(PORT, console.log("Server Started on port: 5000"));

