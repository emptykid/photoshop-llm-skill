var documentReference = new ActionReference();
documentReference.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var documentDescriptor = app.executeActionGet(documentReference);
var ret = [];
if (documentDescriptor.hasKey(stringIDToTypeID("colorSamplerList"))) {
    var colorSamplerList = documentDescriptor.getList(stringIDToTypeID("colorSamplerList"));
    for (var i = 0; i < colorSamplerList.count; i++) {
        var colorSamplerDesc = colorSamplerList.getObjectValue(i);
        var position = colorSamplerDesc.getObjectValue(stringIDToTypeID("position"));
        var color = colorSamplerDesc.getObjectValue(stringIDToTypeID("color"));
        ret.push({
            position: {
                x: position.getDouble(stringIDToTypeID("horizontal")),
                y: position.getDouble(stringIDToTypeID("vertical"))
            },
            color: {
                red: color.getDouble(stringIDToTypeID("red")),
                green: color.getDouble(stringIDToTypeID("grain")),
                blue: color.getDouble(stringIDToTypeID("blue"))
            }
        });
    }
}
ret;
