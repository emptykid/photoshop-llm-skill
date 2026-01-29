// Expected global: name (string) - channel name
var name = (typeof name !== 'undefined') ? name : '';
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putName(stringIDToTypeID("channel"), name);
desc1.putReference(stringIDToTypeID("null"), ref1);
app.executeAction(stringIDToTypeID("delete"), desc1, DialogModes.NO);
