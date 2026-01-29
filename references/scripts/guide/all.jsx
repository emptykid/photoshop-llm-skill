var ref = new ActionReference();
ref.putProperty(app.stringIDToTypeID('property'), app.stringIDToTypeID('numberOfGuides'));
ref.putEnumerated(app.stringIDToTypeID('document'), app.stringIDToTypeID('ordinal'), app.stringIDToTypeID('targetEnum'));
var count = app.executeActionGet(ref).getInteger(app.stringIDToTypeID('numberOfGuides'));
var result = [];
for (var i = 1; i <= count; i++) {
    var ref2 = new ActionReference();
    ref2.putIndex(app.stringIDToTypeID('guide'), i);
    ref2.putEnumerated(app.stringIDToTypeID('document'), app.stringIDToTypeID('ordinal'), app.stringIDToTypeID('targetEnum'));
    var desc = app.executeActionGet(ref2);
    var position = desc.getDouble(app.stringIDToTypeID("position"));
    var direction = app.typeIDToStringID(desc.getEnumerationValue(app.stringIDToTypeID("orientation")));
    result.push({ position: position, direction: direction });
}
result;
