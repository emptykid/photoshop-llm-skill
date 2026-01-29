// Expected globals: position (number), direction (string: "horizontal" or "vertical")
var position = (typeof position !== 'undefined') ? position : 0;
var direction = (typeof direction !== 'undefined') ? direction : "horizontal";
var desc1 = new ActionDescriptor();
var desc2 = new ActionDescriptor();
desc2.putUnitDouble(app.charIDToTypeID("Pstn"), app.charIDToTypeID("#Pxl"), position);
desc2.putEnumerated(app.charIDToTypeID("Ornt"), app.charIDToTypeID("Ornt"), app.stringIDToTypeID(direction));
desc1.putObject(app.charIDToTypeID("Nw  "), app.charIDToTypeID("Gd  "), desc2);
app.executeAction(app.charIDToTypeID("Mk  "), desc1, DialogModes.NO);
