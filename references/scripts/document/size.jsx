var docRef = app.activeDocument;
var result = {
    width: Math.round(docRef.width.as('px')),
    height: Math.round(docRef.height.as('px'))
};
result;
