// Expected global: idList (array of number) - layer id list
var idList = (typeof idList !== 'undefined') ? idList : [];
var current = new ActionReference();
for (var i = 0; i < idList.length; i++) {
    current.putIdentifier(app.charIDToTypeID("Lyr "), idList[i]);
}
var desc = new ActionDescriptor();
desc.putReference(app.charIDToTypeID("null"), current);
app.executeAction(app.charIDToTypeID("slct"), desc, DialogModes.NO);
