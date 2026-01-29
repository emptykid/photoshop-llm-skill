// Expected global: mode (string, e.g. "CMYKColorMode") - optional, default CMYK
var desc1 = new ActionDescriptor();
desc1.putClass(stringIDToTypeID("to"), stringIDToTypeID("CMYKColorMode"));
app.executeAction(stringIDToTypeID("convertMode"), desc1, DialogModes.NO);
