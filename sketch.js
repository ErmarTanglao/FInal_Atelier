  var serial; // variable to hold an instance of the serialport library
  var portName = 'COM3';  // fill in your serial
  var inData;                             // for incoming serial
  var switch1;
  var switch2;
  var lastValue = false;
  var switch3;
  var ghosts = [];
  var mappedSensor1;
  var sensor1;
  var retrigger1 = true;
  var retrigger2 = true;
  var retrigger3 = true;


function preload() {
  img = loadImage('pictures/ghost.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  background(255);
  // for (var i=0; i<1; i++) {
  //   ghosts.push(new Ghost());
  // }

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
 serial.list(); // list the serial ports
 serial.open(portName);              // open a serial port
}

function draw() {
  background(255);
  spawn();
  lights();
  for (var i=0; i<ghosts.length; i++){
    ghosts[i].display();
    ghosts[i].move();
  }
}

function spawn(){
  if(switch1==0 ){
    if (retrigger1 == true){
    retrigger1 = false;
    
    // fill(0)
    for (var i=0; i<1; i++) {
      ghosts.push(new Ghost1());
  }
    // console.log("a")
  }
 } else{
    retrigger1 = true;

  } 

  if(switch2==0 ){
    if (retrigger2 == true){
    retrigger2 = false;
    
    // fill(0)
    for (var i=0; i<1; i++) {
      ghosts.push(new Ghost2());
  }
    // console.log("a")
  }
 } else{
    retrigger2 = true;

  } 
}

function lights(){
  if(sensor1>700){
    rect(100,height,100,-1000);
    fill("yellow");
  }
}

function Ghost1(){
	this.x = 100;
	this.y = 100;
	this.r = 10;
	this.dy = 2;

		this.display = function(){
			image(img, this.x, this.y, 100, 100);
		}
		
		this.move = function(){
			this.y += this.dy;
		}
}

function Ghost2(){
	this.x = 200;
	this.y = 100;
	this.r = 10;
	this.dy = 2;

		this.display = function(){
			image(img, this.x, this.y, 100, 100);
		}
		
		this.move = function(){
			this.y += this.dy;
		}
}


function Ghost3(){
	this.x = 300;
	this.y = 100;
	this.r = 10;
	this.dy = 2;

		this.display = function(){
			image(img, this.x, this.y, 100, 100);
		}
		
		this.move = function(){
			this.y += this.dy;
		}
}


function Light(){
	this.x = 100;
	this.y = 100;
	this.r = 10;
	this.dy = 2;

		this.display = function(){
			ellipse(this.x, this.y, this.r, this.r);
		}
		
		this.move = function(){
			this.y += this.dy;
		}
}
 
 function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
  // if (switch1 == 0){
  //   retrigger = false;
  //   buttonDown = true;
  // };

  // console.log(retrigger, switch1)
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 2) {                      // if there are three elements
      switch1 = sensors[0];  
      switch2 = sensors[1]; 
      sensor1 = sensors[2]; 
      mappedSensor1 = map(sensor1, 0, 1023, height, 0);     
    }
  }
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}

