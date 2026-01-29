var kexecutablePathStr = app.stringIDToTypeID("executablePath");
var desc = new ActionDescriptor();
var ref = new ActionReference();
ref.putProperty(app.charIDToTypeID('Prpr'), kexecutablePathStr);
ref.putEnumerated(app.charIDToTypeID('capp'), app.charIDToTypeID('Ordn'), app.charIDToTypeID('Trgt'));
desc.putReference(app.charIDToTypeID('null'), ref);
var result = app.executeAction(app.charIDToTypeID('getd'), desc, DialogModes.NO);
File.decode(result.getPath(kexecutablePathStr));
