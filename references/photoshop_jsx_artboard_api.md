# Photoshop JSX Artboard API Reference

This document provides reference for Photoshop Artboard-level JSX operations. These operations control artboard bounds and information.

## Table of Contents

- [Artboard Information](#artboard-information)
- [Error Handling](#error-handling)

## Artboard Information

### Get Artboard Bounds

Get the bounds (position and size) of an artboard layer.

**File:** `bounds.jsx`

**Parameters:**
- `layerId` (number, required) - Artboard layer ID

```javascript
// Expected global: layerId (number) - artboard layer id
var layerId = (typeof layerId !== 'undefined') ? layerId : 0;
var ref = new ActionReference();
ref.putIdentifier(app.charIDToTypeID("Lyr "), layerId);
var layerDesc = app.executeActionGet(ref);
var result = null;
if (layerDesc.hasKey(app.stringIDToTypeID("artboard"))) {
    var artBoardRect = layerDesc.getObjectValue(app.stringIDToTypeID("artboard")).getObjectValue(app.stringIDToTypeID("artboardRect"));
    var left = artBoardRect.getUnitDoubleValue(app.stringIDToTypeID("left"));
    var top = artBoardRect.getUnitDoubleValue(app.stringIDToTypeID("top"));
    var right = artBoardRect.getUnitDoubleValue(app.stringIDToTypeID("right"));
    var bottom = artBoardRect.getUnitDoubleValue(app.stringIDToTypeID("bottom"));
    result = { x: left, y: top, width: right - left, height: bottom - top };
}
result;
```

**Returns:** `object | null` - Artboard bounds with `x`, `y`, `width`, `height` properties, or null if layer is not an artboard

**Example:**
```javascript
var layerId = 12345;
// Execute bounds.jsx with layerId parameter
// Returns: { x: 0, y: 0, width: 1920, height: 1080 }
// or null if the layer is not an artboard
```

**Note:** 
- Only layers that are artboards will return bounds
- Regular layers will return null
- The bounds are in pixels

---

## Error Handling

### Common Errors

1. **No Active Document**: Artboard operations require an active document.
2. **Invalid Layer ID**: The layer ID must be valid and exist in the document.
3. **Not an Artboard**: The layer must be an artboard layer, not a regular layer.
4. **Layer Not Found**: The layer with the specified ID may not exist.

### Try-Catch Pattern

Always wrap artboard operations in try-catch blocks:

```javascript
try {
    // Execute artboard operation
    var result = /* execute script */;
    // Handle result
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Usage Examples

### Get Artboard Information

```javascript
try {
    // 1. Get selected layer
    var layerId = /* execute layer/getSelectedLayer.jsx */;
    
    // 2. Check if it's an artboard and get bounds
    if (layerId !== null) {
        var bounds = /* execute bounds.jsx with layerId */;
        
        if (bounds !== null) {
            // It's an artboard
            // bounds.x - X position
            // bounds.y - Y position
            // bounds.width - Width
            // bounds.height - Height
        } else {
            // It's not an artboard
        }
    }
    
    "Artboard information retrieved";
} catch (e) {
    "Error: " + e.toString();
}
```

### Get All Artboard Bounds

```javascript
try {
    // 1. Get all layers (you may need to iterate through document layers)
    // 2. For each layer, check if it's an artboard
    var artboards = [];
    
    // This is a simplified example - you'd need to iterate through layers
    var layerId = /* some layer ID */;
    var bounds = /* execute bounds.jsx with layerId */;
    
    if (bounds !== null) {
        artboards.push({
            layerId: layerId,
            bounds: bounds
        });
    }
    
    "Artboard bounds collected";
} catch (e) {
    "Error: " + e.toString();
}
```

### Check if Layer is Artboard

```javascript
try {
    var layerId = /* layer ID to check */;
    var bounds = /* execute bounds.jsx with layerId */;
    
    var isArtboard = bounds !== null;
    
    if (isArtboard) {
        // Handle artboard
    } else {
        // Handle regular layer
    }
    
    "Artboard check completed";
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Notes

- Artboards are special types of layers in Photoshop
- Artboards have defined bounds that can be retrieved
- Regular layers will return null when queried for artboard bounds
- Artboard bounds are in pixels
- Artboards are useful for designing multiple layouts or variations in a single document
- Artboards can be created when creating a new document with `artboard: true` parameter

---

## Related APIs

- [Layer Operations](../photoshop_jsx_layer_api.md) - For layer manipulation and selection
- [Document Operations](../photoshop_jsx_document_api.md) - For document creation with artboards
