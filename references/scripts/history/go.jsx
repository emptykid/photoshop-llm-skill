// Expected global: index (number) - history state index
var index = (typeof index !== 'undefined') ? index : 0;
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putIndex(app.stringIDToTypeID("historyState"), index);
desc1.putReference(app.stringIDToTypeID("null"), ref1);
app.executeAction(app.stringIDToTypeID("select"), desc1, DialogModes.NO);
