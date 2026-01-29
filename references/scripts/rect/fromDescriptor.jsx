// Expected: pass descriptor as global 'desc', or get from context. Returns {x, y, width, height}.
// This script expects 'desc' to be an ActionDescriptor with left, top, right, bottom (double or unitDouble).
var desc = (typeof desc !== 'undefined') ? desc : null;
var result = null;
if (desc !== null) {
    var left = desc.hasKey(app.stringIDToTypeID("left")) ? desc.getDouble(app.stringIDToTypeID("left")) : desc.getUnitDoubleValue(app.stringIDToTypeID("left"));
    var top = desc.hasKey(app.stringIDToTypeID("top")) ? desc.getDouble(app.stringIDToTypeID("top")) : desc.getUnitDoubleValue(app.stringIDToTypeID("top"));
    var right = desc.hasKey(app.stringIDToTypeID("right")) ? desc.getDouble(app.stringIDToTypeID("right")) : desc.getUnitDoubleValue(app.stringIDToTypeID("right"));
    var bottom = desc.hasKey(app.stringIDToTypeID("bottom")) ? desc.getDouble(app.stringIDToTypeID("bottom")) : desc.getUnitDoubleValue(app.stringIDToTypeID("bottom"));
    result = { x: left, y: top, width: right - left, height: bottom - top };
}
result;
