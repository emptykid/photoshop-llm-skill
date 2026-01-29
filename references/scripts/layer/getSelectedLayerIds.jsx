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
layers;
