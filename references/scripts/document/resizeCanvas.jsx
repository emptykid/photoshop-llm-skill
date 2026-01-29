// Expected globals: width (number), height (number) - size
var width = (typeof width !== 'undefined') ? width : 0;
var height = (typeof height !== 'undefined') ? height : 0;
var idCnvS = charIDToTypeID("CnvS");
var desc12 = new ActionDescriptor();
desc12.putUnitDouble(charIDToTypeID("Wdth"), charIDToTypeID("#Pxl"), width);
desc12.putUnitDouble(charIDToTypeID("Hght"), charIDToTypeID("#Pxl"), height);
desc12.putEnumerated(charIDToTypeID("Hrzn"), charIDToTypeID("HrzL"), charIDToTypeID("Cntr"));
desc12.putEnumerated(charIDToTypeID("Vrtc"), charIDToTypeID("VrtL"), charIDToTypeID("Cntr"));
app.executeAction(idCnvS, desc12, DialogModes.NO);
