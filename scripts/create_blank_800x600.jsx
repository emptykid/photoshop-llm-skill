// Create a blank Photoshop document: 800 x 600 pixels, RGB, 72 ppi
try {
    var doc = app.documents.add(800, 600, 72, "Blank 800x600", NewDocumentMode.RGB);
    "Document created: " + doc.name;
} catch (e) {
    "Error: " + e.toString();
}
