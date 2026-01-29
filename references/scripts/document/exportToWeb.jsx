// Expected globals: path (string), filename (string), options (ExportOptionsSaveForWeb)
var path = (typeof path !== 'undefined') ? path : '';
var filename = (typeof filename !== 'undefined') ? filename : 'export';
var options = (typeof options !== 'undefined') ? options : null;
if (options !== null) {
    var file = new File(path + "/" + filename);
    app.activeDocument.exportDocument(file, ExportType.SAVEFORWEB, options);
}
