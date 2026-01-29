# Photoshop JSX Layer API Reference

This document provides reference for Photoshop Layer-level JSX operations. These operations control layer creation, selection, manipulation, and management.

## Table of Contents

- [Layer Creation](#layer-creation)
- [Layer Selection](#layer-selection)
- [Layer Information](#layer-information)
- [Layer Groups](#layer-groups)
- [Layer Visibility](#layer-visibility)
- [Error Handling](#error-handling)

## Layer Creation

### Create Layer

Create a new layer in the active document.

**File:** `create.jsx`

```javascript
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putClass(app.stringIDToTypeID("layer"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
```

**Returns:** Creates a new layer and makes it active

**Example:**
```javascript
// Execute create.jsx to create a new layer
// The new layer becomes the active layer
```

---

### Create Layer Group

Create a new layer group (folder) in the active document.

**File:** `createGroup.jsx`

```javascript
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putClass(app.stringIDToTypeID("layerSection"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
```

**Returns:** Creates a new layer group and makes it active

---

## Layer Selection

### Get Selected Layer

Get the ID of the currently selected layer (single selection).

**File:** `getSelectedLayer.jsx`

```javascript
var targetLayersTypeId = app.stringIDToTypeID("targetLayersIDs");
var selectedLayersReference = new ActionReference();
selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), targetLayersTypeId);
selectedLayersReference.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
var desc = app.executeActionGet(selectedLayersReference);
var result = null;
if (desc.hasKey(targetLayersTypeId)) {
    var list = desc.getList(targetLayersTypeId);
    if (list.count > 0) {
        var ar = list.getReference(0);
        result = ar.getIdentifier();
    }
}
if (result === null) {
    try {
        selectedLayersReference = new ActionReference();
        selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("LyrI"));
        selectedLayersReference.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
        var descriptor = app.executeActionGet(selectedLayersReference);
        result = descriptor.getInteger(app.charIDToTypeID("LyrI"));
    } catch (e) {}
}
result;
```

**Returns:** `number | null` - The selected layer ID, or null if no layer is selected

---

### Get Selected Layers

Get an array of IDs for all currently selected layers.

**File:** `getSelectedLayers.jsx`

```javascript
var targetLayersTypeId = app.stringIDToTypeID("targetLayersIDs");
var selectedLayersReference = new ActionReference();
selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), targetLayersTypeId);
selectedLayersReference.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
var desc = app.executeActionGet(selectedLayersReference);
var layers = [];
if (desc.hasKey(targetLayersTypeId)) {
    var list = desc.getList(targetLayersTypeId);
    for (var i = 0; i < list.count; i++) {
        var ar = list.getReference(i);
        var layerId = ar.getIdentifier();
        layers.push(layerId);
    }
}
if (layers.length === 1 && layers[0] === 0) {
    layers = [];
    selectedLayersReference = new ActionReference();
    selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), app.stringIDToTypeID("LyrI"));
    selectedLayersReference.putEnumerated(app.charIDToTypeID("Lyr "), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
    var descriptor = app.executeActionGet(selectedLayersReference);
    var id = descriptor.getInteger(app.charIDToTypeID("LyrI"));
    layers.push(id);
}
layers;
```

**Returns:** `array` - Array of layer IDs (empty array if no layers selected)

---

### Get Selected Layer IDs

Get an array of IDs for all currently selected layers (alternative method).

**File:** `getSelectedLayerIds.jsx`

```javascript
var targetLayersTypeId = app.stringIDToTypeID("targetLayersIDs");
var selectedLayersReference = new ActionReference();
selectedLayersReference.putProperty(app.charIDToTypeID("Prpr"), targetLayersTypeId);
selectedLayersReference.putEnumerated(app.charIDToTypeID("Dcmn"), app.charIDToTypeID("Ordn"), app.charIDToTypeID("Trgt"));
var desc = app.executeActionGet(selectedLayersReference);
var layers = [];
if (desc.hasKey(targetLayersTypeId)) {
    var list = desc.getList(targetLayersTypeId);
    for (var i = 0; i < list.count; i++) {
        var ar = list.getReference(i);
        var layerId = ar.getIdentifier();
        layers.push(layerId);
    }
}
layers;
```

**Returns:** `array` - Array of layer IDs

---

### Select Layers by ID

Select one or more layers by their IDs.

**File:** `selectLayersById.jsx`

**Parameters:**
- `idList` (array of numbers, required) - Array of layer IDs to select

```javascript
// Expected global: idList (array of number) - layer id list
var idList = (typeof idList !== 'undefined') ? idList : [];
var current = new ActionReference();
for (var i = 0; i < idList.length; i++) {
    current.putIdentifier(app.charIDToTypeID("Lyr "), idList[i]);
}
var desc = new ActionDescriptor();
desc.putReference(app.stringIDToTypeID("null"), current);
app.executeAction(app.charIDToTypeID("slct"), desc, DialogModes.NO);
```

**Example:**
```javascript
// Select multiple layers
var idList = [12345, 12346, 12347];
// Execute selectLayersById.jsx with idList parameter
```

---

### Set Selected Layers

Set the selected layers by providing an array of layer IDs.

**File:** `setSelectedLayers.jsx`

**Parameters:**
- `layerIds` (array of numbers, required) - Array of layer IDs to select

```javascript
// Expected global: layerIds (array of number) - layer id list
var layerIds = (typeof layerIds !== 'undefined') ? layerIds : [];
if (layerIds.length > 0) {
    var current = new ActionReference();
    for (var i = 0; i < layerIds.length; i++) {
        current.putIdentifier(app.charIDToTypeID("Lyr "), layerIds[i]);
    }
    var desc = new ActionDescriptor();
    desc.putReference(app.stringIDToTypeID("null"), current);
    app.executeAction(app.charIDToTypeID("slct"), desc, DialogModes.NO);
}
```

**Example:**
```javascript
var layerIds = [12345, 12346];
// Execute setSelectedLayers.jsx with layerIds parameter
```

**Note:** This is similar to `selectLayersById.jsx` but includes a check for empty arrays.

---

## Layer Information

### Get Layer by Name

Get the layer ID by layer name.

**File:** `getLayerByName.jsx`

**Parameters:**
- `name` (string, required) - Layer name to search for

```javascript
// Expected global: name (string)
var name = (typeof name !== 'undefined') ? name : '';
var result = null;
try {
    var ref = new ActionReference();
    ref.putName(app.charIDToTypeID("Lyr "), name);
    var layerDesc = app.executeActionGet(ref);
    result = layerDesc.getInteger(app.charIDToTypeID('LyrI'));
} catch (e) {
    result = null;
}
result;
```

**Returns:** `number | null` - The layer ID, or null if layer not found

**Example:**
```javascript
var name = "Background";
// Execute getLayerByName.jsx with name parameter
// Returns: 12345 or null
```

---

### Get Layer Name

Get the name of a layer by its ID.

**File:** `name.jsx`

**Parameters:**
- `layerId` (number, required) - Layer ID

```javascript
// Expected global: layerId (number)
var layerId = (typeof layerId !== 'undefined') ? layerId : 0;
var layerReference = new ActionReference();
layerReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("Nm  "));
layerReference.putIdentifier(app.charIDToTypeID("Lyr "), layerId);
var descriptor = app.executeActionGet(layerReference);
descriptor.getString(app.charIDToTypeID("Nm  "));
```

**Returns:** `string` - The layer name

**Example:**
```javascript
var layerId = 12345;
// Execute name.jsx with layerId parameter
// Returns: "Layer 1" or the actual layer name
```

---

### Get Layer Index

Get the index (position) of a layer by its ID.

**File:** `index.jsx`

**Parameters:**
- `layerId` (number, required) - Layer ID

```javascript
// Expected global: layerId (number)
var layerId = (typeof layerId !== 'undefined') ? layerId : 0;
var result = 0;
try {
    var layerReference = new ActionReference();
    layerReference.putProperty(app.charIDToTypeID("Prpr"), app.charIDToTypeID("ItmI"));
    layerReference.putIdentifier(app.charIDToTypeID("Lyr "), layerId);
    var descriptor = app.executeActionGet(layerReference);
    result = descriptor.getInteger(app.charIDToTypeID("ItmI"));
} catch (e) {
    result = 0;
}
result;
```

**Returns:** `number` - The layer index (0-based, 0 if error)

**Note:** Layer indices are 0-based, where 0 is the topmost layer.

---

## Layer Groups

### Group Selected Layers

Group the currently selected layers into a new layer group.

**File:** `groupSelected.jsx`

```javascript
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putClass(app.stringIDToTypeID("layerSection"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
var ref2 = new ActionReference();
ref2.putEnumerated(app.stringIDToTypeID("layer"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("targetEnum"));
desc1.putReference(app.stringIDToTypeID("from"), ref2);
app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
```

**Returns:** Creates a new layer group containing the selected layers

**Note:** Requires at least one layer to be selected.

---

## Layer Visibility

### Toggle Layers by ID

Show or hide layers by their IDs.

**File:** `toggleLayersById.jsx`

**Parameters:**
- `idList` (array of numbers, required) - Array of layer IDs
- `show` (boolean, optional, default: true) - true to show, false to hide

```javascript
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
    desc242.putList(app.stringIDToTypeID("null"), list10);
    var key = show ? "Shw " : "Hd  ";
    app.executeAction(app.charIDToTypeID(key), desc242, DialogModes.NO);
}
```

**Example:**
```javascript
// Show layers
var idList = [12345, 12346];
var show = true;

// Hide layers
var idList = [12345, 12346];
var show = false;
```

---

## Error Handling

### Common Errors

1. **No Active Document**: All layer operations require an active document.
2. **Layer Not Found**: When getting a layer by name or ID, the layer may not exist.
3. **No Selection**: Some operations require selected layers.
4. **Invalid Layer ID**: Ensure layer IDs are valid numbers.

### Try-Catch Pattern

Always wrap layer operations in try-catch blocks:

```javascript
try {
    // Execute layer operation
    var result = /* execute script */;
    // Handle result
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Usage Examples

### Complete Workflow: Create and Select Layers

```javascript
try {
    // 1. Create a new layer
    // Execute create.jsx
    
    // 2. Get the selected layer ID
    var layerId = /* execute getSelectedLayer.jsx */;
    
    // 3. Get layer name
    var layerName = /* execute name.jsx with layerId */;
    
    // 4. Get layer index
    var layerIndex = /* execute index.jsx with layerId */;
    
    "Layer created and information retrieved";
} catch (e) {
    "Error: " + e.toString();
}
```

### Select and Group Layers

```javascript
try {
    // 1. Get all selected layers
    var selectedLayers = /* execute getSelectedLayers.jsx */;
    
    // 2. Group them
    if (selectedLayers.length > 0) {
        // Execute groupSelected.jsx
    }
    
    "Layers grouped successfully";
} catch (e) {
    "Error: " + e.toString();
}
```

### Find and Select Layer by Name

```javascript
try {
    // 1. Find layer by name
    var layerName = "My Layer";
    var layerId = /* execute getLayerByName.jsx with layerName */;
    
    // 2. Select the layer
    if (layerId !== null) {
        var idList = [layerId];
        // Execute selectLayersById.jsx with idList
    }
    
    "Layer found and selected";
} catch (e) {
    "Error: " + e.toString();
}
```

### Toggle Layer Visibility

```javascript
try {
    // Get layer IDs
    var layerIds = /* execute getSelectedLayers.jsx */;
    
    // Hide layers
    var idList = layerIds;
    var show = false;
    // Execute toggleLayersById.jsx
    
    // Later, show them again
    var show = true;
    // Execute toggleLayersById.jsx
    
    "Layer visibility toggled";
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Notes

- Layer IDs are unique identifiers assigned by Photoshop
- Layer indices are 0-based (0 = topmost layer)
- Multiple layers can be selected simultaneously
- Layer groups are treated as special types of layers
- Visibility changes are immediately reflected in the document
- Some operations may modify the document history

---

## Related APIs

- [Document Operations](../photoshop_jsx_document_api.md) - For document-level operations
- [Selection Operations](../photoshop_jsx_selection_api.md) - For selection management
- [Application Operations](../photoshop_jsx_application_api.md) - For application-level settings
