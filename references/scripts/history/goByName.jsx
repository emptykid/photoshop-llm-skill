// Expected global: name (string) - history state name
var name = (typeof name !== 'undefined') ? name : '';
try {
    var state = app.activeDocument.historyStates.getByName(name);
    app.activeDocument.activeHistoryState = state;
} catch (e) {}
