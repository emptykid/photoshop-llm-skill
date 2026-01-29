// Expected globals: rulerUnits (Units), typeUnits (TypeUnits) - set before eval, e.g. from saveUnits result
var rulerUnits = (typeof rulerUnits !== 'undefined') ? rulerUnits : null;
var typeUnits = (typeof typeUnits !== 'undefined') ? typeUnits : null;
if (rulerUnits !== null && typeUnits !== null) {
    app.preferences.rulerUnits = rulerUnits;
    app.preferences.typeUnits = typeUnits;
}
