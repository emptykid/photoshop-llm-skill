var ref = new ActionReference();
ref.putProperty(app.stringIDToTypeID('property'), app.stringIDToTypeID('numberOfGuides'));
ref.putEnumerated(app.stringIDToTypeID('document'), app.stringIDToTypeID('ordinal'), app.stringIDToTypeID('targetEnum'));
app.executeActionGet(ref).getInteger(app.stringIDToTypeID('numberOfGuides'));
