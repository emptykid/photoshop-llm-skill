# Photoshop JSX Selection API Reference

This document provides reference for Photoshop Selection-level JSX operations. These operations control selection creation, manipulation, saving, and loading.

## Table of Contents

- [Selection Creation](#selection-creation)
- [Selection Information](#selection-information)
- [Selection Manipulation](#selection-manipulation)
- [Selection from Layer](#selection-from-layer)
- [Saved Selections](#saved-selections)
- [Selection to Path](#selection-to-path)
- [Error Handling](#error-handling)

## Selection Creation

### Create Selection

Create a rectangular selection with specified bounds.

**File:** `create.jsx`

**Parameters:**
- `left` (number, required) - Left position in pixels
- `top` (number, required) - Top position in pixels
- `right` (number, required) - Right position in pixels
- `bottom` (number, required) - Bottom position in pixels

```javascript
// Expected globals: left (number), top (number), right (number), bottom (number) - rect in pixels
var left = (typeof left !== 'undefined') ? left : 0;
var top = (typeof top !== 'undefined') ? top : 0;
var right = (typeof right !== 'undefined') ? right : 0;
var bottom = (typeof bottom !== 'undefined') ? bottom : 0;
// ... creates rectangular selection
```

**Example:**
```javascript
// Create a 500x400 selection starting at (100, 100)
var left = 100;
var top = 100;
var right = 600;
var bottom = 500;
// Execute create.jsx with these parameters
```

---

## Selection Information

### Get Selection

Get the current selection bounds.

**File:** `get.jsx`

```javascript
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
```

**Returns:** `object | null` - Selection bounds with `x`, `y`, `width`, `height` properties, or null if no selection

**Example:**
```javascript
// Result: { x: 100, y: 100, width: 500, height: 400 }
// or null if no selection exists
```

---

## Selection Manipulation

### Deselect

Clear the current selection.

**File:** `deselect.jsx`

```javascript
var selectionDescriptor = new ActionDescriptor();
var selectionReference = new ActionReference();
selectionReference.putProperty(app.charIDToTypeID("Chnl"), app.charIDToTypeID("fsel"));
selectionDescriptor.putReference(app.stringIDToTypeID("null"), selectionReference);
selectionDescriptor.putEnumerated(app.charIDToTypeID("T   "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("None"));
app.executeAction(app.charIDToTypeID("setd"), selectionDescriptor, DialogModes.NO);
```

**Returns:** Clears the current selection

---

### Invert Selection

Invert the current selection.

**File:** `invert.jsx`

```javascript
app.executeAction(app.charIDToTypeID("Invs"), undefined, DialogModes.NO);
```

**Returns:** Inverts the selection (selected becomes unselected and vice versa)

**Note:** Requires an active selection to invert.

---

## Selection from Layer

### Create Selection from Layer

Create a selection based on the transparency of the active layer.

**File:** `fromLayer.jsx`

```javascript
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putProperty(app.stringIDToTypeID("channel"), app.stringIDToTypeID("selection"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
var ref2 = new ActionReference();
ref2.putEnumerated(app.stringIDToTypeID("channel"), app.stringIDToTypeID("channel"), app.stringIDToTypeID("transparencyEnum"));
desc1.putReference(app.stringIDToTypeID("to"), ref2);
app.executeAction(app.stringIDToTypeID("set"), desc1, DialogModes.NO);
```

**Returns:** Creates a selection from the layer's transparency mask

**Note:** Requires an active layer with transparency information.

---

## Saved Selections

### Save Selection

Save the current selection as a channel (alpha channel).

**File:** `save.jsx`

**Parameters:**
- `name` (string, optional, default: 'Alpha 1') - Channel name for the saved selection

```javascript
// Expected global: name (string) - channel name to save selection
var name = (typeof name !== 'undefined') ? name : 'Alpha 1';
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putProperty(app.stringIDToTypeID("channel"), app.stringIDToTypeID("selection"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
desc1.putString(app.stringIDToTypeID("name"), name);
app.executeAction(app.stringIDToTypeID("duplicate"), desc1, DialogModes.NO);
```

**Example:**
```javascript
// Save selection with custom name
var name = "My Selection";
// Execute save.jsx with name parameter
```

**Returns:** Saves the selection as an alpha channel with the specified name

---

### Load Selection

Load a saved selection (alpha channel) as the current selection.

**File:** `load.jsx`

**Parameters:**
- `selectionName` (string, required) - Name of the saved selection channel
- `documentName` (string, optional) - Document name (if loading from another document)

```javascript
// Expected globals: selectionName (string), documentName (string, optional)
var selectionName = (typeof selectionName !== 'undefined') ? selectionName : '';
var documentName = (typeof documentName !== 'undefined') ? documentName : null;
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putProperty(app.stringIDToTypeID("channel"), app.stringIDToTypeID("selection"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
var ref2 = new ActionReference();
ref2.putName(app.stringIDToTypeID("channel"), selectionName);
if (documentName) {
    ref2.putName(app.stringIDToTypeID("document"), documentName);
}
desc1.putReference(app.stringIDToTypeID("to"), ref2);
app.executeAction(app.stringIDToTypeID("set"), desc1, DialogModes.NO);
```

**Example:**
```javascript
// Load selection from current document
var selectionName = "My Selection";
var documentName = null;

// Load selection from another document
var selectionName = "My Selection";
var documentName = "Other Document.psd";
```

**Returns:** Loads the saved selection as the current selection

---

### Delete Saved Selection

Delete a saved selection (alpha channel).

**File:** `deleteSavedSelection.jsx`

**Parameters:**
- `name` (string, required) - Name of the channel to delete

```javascript
// Expected global: name (string) - channel name
var name = (typeof name !== 'undefined') ? name : '';
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putName(stringIDToTypeID("channel"), name);
desc1.putReference(stringIDToTypeID("null"), ref1);
app.executeAction(stringIDToTypeID("delete"), desc1, DialogModes.NO);
```

**Example:**
```javascript
var name = "My Selection";
// Execute deleteSavedSelection.jsx with name parameter
```

**Returns:** Deletes the specified alpha channel

---

## Selection to Path

### Convert Selection to Path

Convert the current selection to a path.

**File:** `toPath.jsx`

**Parameters:**
- `tolerance` (number, optional, default: 2) - Tolerance in pixels for path conversion

```javascript
// Expected global: tolerance (number, default 2)
var tolerance = (typeof tolerance !== 'undefined') ? tolerance : 2;
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putClass(app.stringIDToTypeID("path"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
var ref2 = new ActionReference();
ref2.putProperty(app.stringIDToTypeID("selectionClass"), app.stringIDToTypeID("selection"));
desc1.putReference(app.stringIDToTypeID("from"), ref2);
desc1.putUnitDouble(app.stringIDToTypeID("tolerance"), app.stringIDToTypeID("pixelsUnit"), tolerance);
app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
```

**Example:**
```javascript
// Convert with default tolerance
var tolerance = 2;

// Convert with higher tolerance (smoother path)
var tolerance = 5;
```

**Returns:** Creates a path from the current selection

**Note:** 
- Lower tolerance values create more accurate paths with more anchor points
- Higher tolerance values create smoother paths with fewer anchor points
- Requires an active selection

---

## Error Handling

### Common Errors

1. **No Active Document**: All selection operations require an active document.
2. **No Selection**: Some operations require an active selection.
3. **Selection Not Found**: When loading a saved selection, the channel may not exist.
4. **Invalid Parameters**: Ensure all required parameters are provided with correct types.

### Try-Catch Pattern

Always wrap selection operations in try-catch blocks:

```javascript
try {
    // Execute selection operation
    var result = /* execute script */;
    // Handle result
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Usage Examples

### Complete Workflow: Create, Save, and Load Selection

```javascript
try {
    // 1. Create a selection
    var left = 100;
    var top = 100;
    var right = 600;
    var bottom = 500;
    // Execute create.jsx
    
    // 2. Get selection bounds
    var selection = /* execute get.jsx */;
    
    // 3. Save the selection
    var name = "My Saved Selection";
    // Execute save.jsx with name parameter
    
    // 4. Deselect
    // Execute deselect.jsx
    
    // 5. Later, load the selection
    var selectionName = "My Saved Selection";
    // Execute load.jsx with selectionName parameter
    
    "Selection workflow completed";
} catch (e) {
    "Error: " + e.toString();
}
```

### Create Selection from Layer

```javascript
try {
    // 1. Ensure a layer is active
    // (Layer should have transparency)
    
    // 2. Create selection from layer
    // Execute fromLayer.jsx
    
    // 3. Get the selection bounds
    var selection = /* execute get.jsx */;
    
    "Selection created from layer";
} catch (e) {
    "Error: " + e.toString();
}
```

### Invert and Convert to Path

```javascript
try {
    // 1. Get current selection
    var selection = /* execute get.jsx */;
    
    if (selection !== null) {
        // 2. Invert selection
        // Execute invert.jsx
        
        // 3. Convert to path
        var tolerance = 2;
        // Execute toPath.jsx with tolerance parameter
    }
    
    "Selection inverted and converted to path";
} catch (e) {
    "Error: " + e.toString();
}
```

### Manage Multiple Saved Selections

```javascript
try {
    // 1. Create first selection
    var left = 100;
    var top = 100;
    var right = 300;
    var bottom = 300;
    // Execute create.jsx
    // Execute save.jsx with name "Selection 1"
    
    // 2. Create second selection
    var left = 400;
    var top = 400;
    var right = 600;
    var bottom = 600;
    // Execute create.jsx
    // Execute save.jsx with name "Selection 2"
    
    // 3. Load first selection
    var selectionName = "Selection 1";
    // Execute load.jsx
    
    "Multiple selections managed";
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Notes

- All coordinates are in pixels
- Selections can be saved as alpha channels for later use
- Saved selections persist with the document
- Converting selection to path creates a work path
- Inverting a selection requires an existing selection
- Selection operations may modify the document history

---

## Related APIs

- [Document Operations](../photoshop_jsx_document_api.md) - For document-level operations
- [Layer Operations](../photoshop_jsx_layer_api.md) - For layer manipulation
- [Application Operations](../photoshop_jsx_application_api.md) - For application-level settings
