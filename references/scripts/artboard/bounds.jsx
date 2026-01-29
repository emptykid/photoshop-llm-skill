// Expected global: layerId (number) - artboard layer id
var layerId = (typeof layerId !== 'undefined') ? layerId : 0;
var ref = new ActionReference();
ref.putIdentifier(app.charIDToTypeID("Lyr "), layerId);
var layerDesc = app.executeActionGet(ref);
var result = null;
if (layerDesc.hasKey(app.stringIDToTypeID("artboard"))) {
    var artBoardRect = layerDesc.getObjectValue(app.stringIDToTypeID("artboard")).getObjectValue(app.stringIDToTypeID("artboardRect"));
    var left = artBoardRect.getUnitDoubleValue(app.stringIDToTypeID("left"));
    var top = artBoardRect.getUnitDoubleValue(app.stringIDToTypeID("top"));
    var right = artBoardRect.getUnitDoubleValue(app.stringIDToTypeID("right"));
    var bottom = artBoardRect.getUnitDoubleValue(app.stringIDToTypeID("bottom"));
    result = { x: left, y: top, width: right - left, height: bottom - top };
}
result;
