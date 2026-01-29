// Optional global: unit (string, default 'px')
var unit = (typeof unit !== 'undefined') ? unit : 'px';
var result = null;
try {
    var selection = app.activeDocument.selection.bounds;
    result = {
        x: selection[0].as(unit),
        y: selection[1].as(unit),
        width: selection[2].as(unit) - selection[0].as(unit),
        height: selection[3].as(unit) - selection[1].as(unit)
    };
} catch (ex) {
    result = null;
}
result;
