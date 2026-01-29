var desc1 = new ActionDescriptor();
desc1.putEnumerated(stringIDToTypeID("trimBasedOn"), stringIDToTypeID("trimBasedOn"), stringIDToTypeID("transparency"));
desc1.putBoolean(stringIDToTypeID("top"), true);
desc1.putBoolean(stringIDToTypeID("bottom"), true);
desc1.putBoolean(stringIDToTypeID("left"), true);
desc1.putBoolean(stringIDToTypeID("right"), true);
app.executeAction(stringIDToTypeID("trim"), desc1, DialogModes.NO);
