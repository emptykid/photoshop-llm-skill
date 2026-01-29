// Expected global: layerId (number)
var layerId = (typeof layerId !== 'undefined') ? layerId : 0;
var layerReference = new ActionReference();
layerReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("Nm  "));
layerReference.putIdentifier(app.charIDToTypeID("Lyr "), layerId);
var descriptor = app.executeActionGet(layerReference);
descriptor.getString(app.charIDToTypeID("Nm  "));
