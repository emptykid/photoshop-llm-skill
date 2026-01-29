// Expected global: path (string)
var path = (typeof path !== 'undefined') ? path : '';
var desc437 = new ActionDescriptor();
desc437.putPath(app.charIDToTypeID("null"), new File(path));
app.executeAction(app.charIDToTypeID("Opn "), desc437, DialogModes.NO);
