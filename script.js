var button = $(".btn-end");
var column = $(".column"); 
var body = $("body");
const BASE_URL = "http://localhost:5000";
var xTrack = $( ".xTrack" );
var yTrack = $( ".yTrack" );
var container = $( ".container" );

container.mousemove(function( event ) {
  xTrack.css("top", event.pageY+"px"  );
  yTrack.css("left", event.pageX+"px"  );
});

xTrack.mousemove(function( event ) {
  xTrack.css("top", event.pageY+"px"  );
  yTrack.css("left", event.pageX+"px"  );
});

yTrack.mousemove(function( event ) {
  xTrack.css("top", event.pageY+"px"  );
  yTrack.css("left", event.pageX+"px"  );
});

//Offset for the container
const OFFSET_MARGIN_X = 50;
const OFFSET_MARGIN_Y = 50;
const CELL_SIZE = 50;

button.on("click", endButtonClick);
xTrack.on("click", columnClick);
yTrack.on("click", columnClick);
var isSessionOn = true;

//endButtonClick:: it will sent the session value false.
function endButtonClick(e) {
  isSessionOn = false;
}

/* 
columnClick ::
while the session is on it will take a point x,y cordinate of the mouse click
convert it to the url and Make a GET request to backend server with x and y as query params 
and server stores it in CSV file.

@param event (click)
*/
function columnClick(e) {
  if(isSessionOn) {
    body.append('<div class="dot" style="top:'+e.clientY + 'px; left:'+ e.clientX +'px; " />')
    let x = (e.clientX - OFFSET_MARGIN_X)/CELL_SIZE;
    let y = (e.clientY - OFFSET_MARGIN_Y)/CELL_SIZE;
    //console.log(e.clientX+" :: "+e.clientY)
    console.log([x, y]);
    let url = BASE_URL+`?x=${x}&y=${y}`
    $.ajax({
      url: url,
      success: function(response) {
        if(response.success == true) {
          newx = (response.x * CELL_SIZE) + OFFSET_MARGIN_X;
          newy = (response.y * CELL_SIZE) + OFFSET_MARGIN_Y;
          //console.log(newx+" :: "+newy);
          body.append('<div class="dot red" style="top:'+newy + 'px; left:'+ newx +'px; " />')
        }
      }
    });
  }
}

