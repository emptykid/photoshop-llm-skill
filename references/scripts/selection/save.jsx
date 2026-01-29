// Expected global: name (string) - channel name to save selection
var name = (typeof name !== 'undefined') ? name : 'Alpha 1';
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putProperty(app.stringIDToTypeID("channel"), app.stringIDToTypeID("selection"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
desc1.putString(app.stringIDToTypeID("name"), name);
app.executeAction(app.stringIDToTypeID("duplicate"), desc1, DialogModes.NO);
