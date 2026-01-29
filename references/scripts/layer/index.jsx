// Expected global: layerId (number)
var layerId = (typeof layerId !== 'undefined') ? layerId : 0;
var result = 0;
try {
    var layerReference = new ActionReference();
    layerReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("ItmI"));
    layerReference.putIdentifier(app.charIDToTypeID("Lyr "), layerId);
    var descriptor = app.executeActionGet(layerReference);
    result = descriptor.getInteger(app.charIDToTypeID("ItmI"));
} catch (e) {
    result = 0;
}
result;
