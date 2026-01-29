var result = null;
try {
    var selection = app.activeDocument.selection.bounds;
    result = {
        x: selection[0].value,
        y: selection[1].value,
        width: selection[2].value - selection[0].value,
        height: selection[3].value - selection[1].value
    };
} catch (ex) {
    result = null;
}
result;
