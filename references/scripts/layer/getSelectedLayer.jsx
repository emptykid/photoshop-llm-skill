var targetLayersTypeId = app.stringIDToTypeID("targetLayersIDs");
var selectedLayersReference = new ActionReference();
selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), targetLayersTypeId);
selectedLayersReference.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
var desc = app.executeActionGet(selectedLayersReference);
var result = null;
if (desc.hasKey(targetLayersTypeId)) {
    var list = desc.getList(targetLayersTypeId);
    if (list.count > 0) {
        var ar = list.getReference(0);
        result = ar.getIdentifier();
    }
}
if (result === null) {
    try {
        selectedLayersReference = new ActionReference();
        selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("LyrI"));
        selectedLayersReference.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        var descriptor = app.executeActionGet(selectedLayersReference);
        result = descriptor.getInteger(app.charIDToTypeID("LyrI"));
    } catch (e) {}
}
result;
