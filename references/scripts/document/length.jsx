var doc = app.activeDocument;
var result;
try {
    var file = new File(doc.fullName);
    result = file.length;
} catch (e) {
    result = 0;
}
result;
