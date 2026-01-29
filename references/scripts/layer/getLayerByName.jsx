// Expected global: name (string)
var name = (typeof name !== 'undefined') ? name : '';
var result = null;
try {
    var ref = new ActionReference();
    ref.putName(app.charIDToTypeID("Lyr "), name);
    var layerDesc = app.executeActionGet(ref);
    result = layerDesc.getInteger(app.charIDToTypeID('LyrI'));
} catch (e) {
    result = null;
}
result;
