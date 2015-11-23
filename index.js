var midi = require('midi');
var osc = require('node-osc');

var midiOut = new midi.output();
midiOut.openVirtualPort('PowerMate');
var oscOut = null;new osc.Client('127.0.0.1', 8001);

var PipePowerMate = require('./PipePowerMate');

//Count powermates
var powerMates = [];
var deviceCount = PipePowerMate.countPowerMate();
console.log(deviceCount);
for(var i=0;i<deviceCount;i++){
  powerMates.push(new PipePowerMate(i, midiOut, oscOut, 0, 1000));
}

process.on('SIGINT', function() {
  for(var i=0, len = powerMates.length;i<len;i++){
    powerMates[i].close();
  }
    if(midiOut) midiOut.closePort();
    if(oscOut) oscOut.kill();
    process.exit(0);
});
