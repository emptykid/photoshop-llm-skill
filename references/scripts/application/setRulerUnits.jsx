// Expected global: rulerUnits (Units)
var rulerUnits = (typeof rulerUnits !== 'undefined') ? rulerUnits : null;
if (rulerUnits !== null) {
    app.preferences.rulerUnits = rulerUnits;
}
