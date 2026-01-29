var af = new ActionReference();
var ad = new ActionDescriptor();
af.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("json"));
af.putEnumerated(stringIDToTypeID("document"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
ad.putReference(charIDToTypeID("null"), af);
app.executeAction(charIDToTypeID("getd"), ad, DialogModes.NO).getString(stringIDToTypeID("json"));
