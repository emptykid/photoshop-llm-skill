// Expected global: layerIds (array of number) - layer id list
var layerIds = (typeof layerIds !== 'undefined') ? layerIds : [];
if (layerIds.length > 0) {
    var current = new ActionReference();
    for (var i = 0; i < layerIds.length; i++) {
        current.putIdentifier(app.charIDToTypeID("Lyr "), layerIds[i]);
    }
    var desc = new ActionDescriptor();
    desc.putReference(app.charIDToTypeID("null"), current);
    app.executeAction(app.charIDToTypeID("slct"), desc, DialogModes.NO);
}
