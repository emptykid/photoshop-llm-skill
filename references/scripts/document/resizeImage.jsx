// Expected globals: width (number), height (number) - size object
var width = (typeof width !== 'undefined') ? width : 0;
var height = (typeof height !== 'undefined') ? height : 0;
var action = new ActionDescriptor();
if (width > 0) {
    action.putUnitDouble(charIDToTypeID("Wdth"), charIDToTypeID("#Pxl"), width);
}
if (height > 0) {
    action.putUnitDouble(charIDToTypeID("Hght"), charIDToTypeID("#Pxl"), height);
}
if (width == 0 || height == 0) {
    action.putBoolean(charIDToTypeID("CnsP"), true);
}
action.putBoolean(stringIDToTypeID("scaleStyles"), true);
action.putBoolean(stringIDToTypeID("constrainProportions"), true);
action.putEnumerated(stringIDToTypeID("interfaceIconFrameDimmed"), stringIDToTypeID("interpolationType"), stringIDToTypeID("bicubicSharper"));
app.executeAction(charIDToTypeID("ImgS"), action, DialogModes.NO);
