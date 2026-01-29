// Expected globals: name (string), script (string)
var name = (typeof name !== 'undefined') ? name : 'Script';
var script = (typeof script !== 'undefined') ? script : '';
app.activeDocument.suspendHistory(name, script);
