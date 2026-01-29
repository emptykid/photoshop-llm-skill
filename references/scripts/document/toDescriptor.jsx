var documentReference = new ActionReference();
documentReference.putEnumerated(stringIDToTypeID("document"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
app.executeActionGet(documentReference);
