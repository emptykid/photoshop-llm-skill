// Expected globals: rulerUnits (Units), typeUnits (TypeUnits)
var rulerUnits = (typeof rulerUnits !== 'undefined') ? rulerUnits : null;
var typeUnits = (typeof typeUnits !== 'undefined') ? typeUnits : null;
if (rulerUnits !== null) {
    app.preferences.rulerUnits = rulerUnits;
}
if (typeUnits !== null) {
    app.preferences.typeUnits = typeUnits;
}
