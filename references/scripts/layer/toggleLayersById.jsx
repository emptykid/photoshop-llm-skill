// Expected globals: idList (array of number), show (boolean)
var idList = (typeof idList !== 'undefined') ? idList : [];
var show = (typeof show !== 'undefined') ? show : true;
if (idList.length > 0) {
    var current = new ActionReference();
    var desc242 = new ActionDescriptor();
    var list10 = new ActionList();
    for (var i = 0; i < idList.length; i++) {
        current.putIdentifier(app.charIDToTypeID("Lyr "), idList[i]);
    }
    list10.putReference(current);
    desc242.putList(app.charIDToTypeID("null"), list10);
    var key = show ? "Shw " : "Hd  ";
    app.executeAction(app.charIDToTypeID(key), desc242, DialogModes.NO);
}
