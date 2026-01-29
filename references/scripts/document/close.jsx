// Expected global: save (boolean)
var save = (typeof save !== 'undefined') ? save : false;
var desc904 = new ActionDescriptor();
var value = save ? charIDToTypeID("Ys  ") : charIDToTypeID("N   ");
desc904.putEnumerated(charIDToTypeID("Svng"), charIDToTypeID("YsN "), value);
app.executeAction(charIDToTypeID("Cls "), desc904, DialogModes.NO);
