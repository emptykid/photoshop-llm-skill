var arr = [];
var states = app.activeDocument.historyStates;
for (var i = 0; i < states.length; i++) {
    var s = states[i];
    arr.push(i + ":" + s.name);
}
arr.join(",");
