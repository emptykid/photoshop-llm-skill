var targetLayersTypeId = app.stringIDToTypeID("targetLayersIDs");
var selectedLayersReference = new ActionReference();
selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), targetLayersTypeId);
selectedLayersReference.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
var desc = app.executeActionGet(selectedLayersReference);
var layers = [];
if (desc.hasKey(targetLayersTypeId)) {
    var list = desc.getList(targetLayersTypeId);
    for (var i = 0; i < list.count; i++) {
        var ar = list.getReference(i);
        var layerId = ar.getIdentifier();
        layers.push(layerId);
    }
}
if (layers.length === 1 && layers[0] === 0) {
    layers = [];
    selectedLayersReference = new ActionReference();
    selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("LyrI"));
    selectedLayersReference.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
    var descriptor = app.executeActionGet(selectedLayersReference);
    var id = descriptor.getInteger(app.charIDToTypeID("LyrI"));
    layers.push(id);
}
layers;
