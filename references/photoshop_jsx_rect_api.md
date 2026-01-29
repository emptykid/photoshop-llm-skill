# Photoshop JSX Rect API Reference

This document provides reference for Photoshop Rectangle (Rect) utility JSX operations. These operations convert between rectangle descriptors and coordinate objects.

## Table of Contents

- [Rect Conversion](#rect-conversion)
- [Error Handling](#error-handling)

## Rect Conversion

### Rect to Descriptor

Convert rectangle coordinates to an ActionDescriptor.

**File:** `toDescriptor.jsx`

**Parameters:**
- `left` (number, required) - Left position
- `top` (number, required) - Top position
- `right` (number, required) - Right position
- `bottom` (number, required) - Bottom position
- `unitType` (string, optional, default: "pixelsUnit") - Unit type for the coordinates

```javascript
// Expected globals: left (number), top (number), right (number), bottom (number), unitType (string, default "pixelsUnit")
var left = (typeof left !== 'undefined') ? left : 0;
var top = (typeof top !== 'undefined') ? top : 0;
var right = (typeof right !== 'undefined') ? right : 0;
var bottom = (typeof bottom !== 'undefined') ? bottom : 0;
var unitType = (typeof unitType !== 'undefined') ? unitType : "pixelsUnit";
var result = new ActionDescriptor();
result.putUnitDouble(app.charIDToTypeID("Left"), app.stringIDToTypeID(unitType), left);
result.putUnitDouble(app.charIDToTypeID("Top "), app.stringIDToTypeID(unitType), top);
result.putUnitDouble(app.charIDToTypeID("Rght"), app.stringIDToTypeID(unitType), right);
result.putUnitDouble(app.charIDToTypeID("Btom"), app.stringIDToTypeID(unitType), bottom);
result;
```

**Returns:** `ActionDescriptor` - A descriptor object with rectangle bounds

**Example:**
```javascript
// Create rectangle descriptor
var left = 100;
var top = 100;
var right = 500;
var bottom = 400;
var unitType = "pixelsUnit";
// Execute toDescriptor.jsx
// Returns: ActionDescriptor with rectangle bounds
```

**Use Case:** Useful when you need to pass rectangle bounds to other Photoshop actions that require ActionDescriptor format.

---

### Rect from Descriptor

Convert an ActionDescriptor to rectangle coordinates.

**File:** `fromDescriptor.jsx`

**Parameters:**
- `desc` (ActionDescriptor, required) - ActionDescriptor containing rectangle bounds

```javascript
// Expected: pass descriptor as global 'desc', or get from context. Returns {x, y, width, height}.
// This script expects 'desc' to be an ActionDescriptor with left, top, right, bottom (double or unitDouble).
var desc = (typeof desc !== 'undefined') ? desc : null;
var result = null;
if (desc !== null) {
    var left = desc.hasKey(app.stringIDToTypeID("left")) ? desc.getDouble(app.stringIDToTypeID("left")) : desc.getUnitDoubleValue(app.stringIDToTypeID("left"));
    var top = desc.hasKey(app.stringIDToTypeID("top")) ? desc.getDouble(app.stringIDToTypeID("top")) : desc.getUnitDoubleValue(app.stringIDToTypeID("top"));
    var right = desc.hasKey(app.stringIDToTypeID("right")) ? desc.getDouble(app.stringIDToTypeID("right")) : desc.getUnitDoubleValue(app.stringIDToTypeID("right"));
    var bottom = desc.hasKey(app.stringIDToTypeID("bottom")) ? desc.getDouble(app.stringIDToTypeID("bottom")) : desc.getUnitDoubleValue(app.stringIDToTypeID("bottom"));
    result = { x: left, y: top, width: right - left, height: bottom - top };
}
result;
```

**Returns:** `object | null` - Rectangle object with `x`, `y`, `width`, `height` properties, or null if descriptor is invalid

**Example:**
```javascript
// Convert descriptor to rectangle
var desc = /* some ActionDescriptor */;
// Execute fromDescriptor.jsx with desc parameter
// Returns: { x: 100, y: 100, width: 400, height: 300 }
// or null if descriptor is invalid
```

**Note:** The result uses `x`, `y`, `width`, `height` format instead of `left`, `top`, `right`, `bottom`.

---

## Error Handling

### Common Errors

1. **Invalid Descriptor**: The ActionDescriptor may not contain rectangle bounds.
2. **Missing Parameters**: All coordinate parameters must be provided for `toDescriptor`.
3. **Invalid Unit Type**: Unit type must be a valid Photoshop unit type string.

### Try-Catch Pattern

Always wrap rect operations in try-catch blocks:

```javascript
try {
    // Execute rect operation
    var result = /* execute script */;
    // Handle result
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Usage Examples

### Convert Coordinates to Descriptor

```javascript
try {
    // Define rectangle bounds
    var left = 100;
    var top = 100;
    var right = 500;
    var bottom = 400;
    var unitType = "pixelsUnit";
    
    // Convert to descriptor
    var desc = /* execute toDescriptor.jsx */;
    
    // Use descriptor in other operations
    // (e.g., setting selection bounds, crop bounds, etc.)
    
    "Rectangle converted to descriptor";
} catch (e) {
    "Error: " + e.toString();
}
```

### Convert Descriptor to Coordinates

```javascript
try {
    // Get descriptor from some operation
    var desc = /* some ActionDescriptor */;
    
    // Convert to rectangle coordinates
    var rect = /* execute fromDescriptor.jsx with desc */;
    
    if (rect !== null) {
        // Use rectangle coordinates
        // rect.x - X position
        // rect.y - Y position
        // rect.width - Width
        // rect.height - Height
    }
    
    "Descriptor converted to rectangle";
} catch (e) {
    "Error: " + e.toString();
}
```

### Round-trip Conversion

```javascript
try {
    // 1. Start with coordinates
    var left = 100;
    var top = 100;
    var right = 500;
    var bottom = 400;
    
    // 2. Convert to descriptor
    var desc = /* execute toDescriptor.jsx */;
    
    // 3. Convert back to coordinates
    var rect = /* execute fromDescriptor.jsx with desc */;
    
    // rect should have: { x: 100, y: 100, width: 400, height: 300 }
    
    "Round-trip conversion completed";
} catch (e) {
    "Error: " + e.toString();
}
```

### Use with Selection Bounds

```javascript
try {
    // 1. Get selection bounds as descriptor
    // (from document operations)
    
    // 2. Convert to rectangle
    var desc = /* selection descriptor */;
    var rect = /* execute fromDescriptor.jsx with desc */;
    
    // 3. Use rectangle coordinates
    if (rect !== null) {
        // Work with rect.x, rect.y, rect.width, rect.height
    }
    
    "Selection bounds converted";
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Notes

- Rectangle descriptors use `left`, `top`, `right`, `bottom` format
- Rectangle objects use `x`, `y`, `width`, `height` format
- Unit types must be valid Photoshop unit type strings (e.g., "pixelsUnit", "inchesUnit")
- These utilities are helpful when working with Photoshop's ActionDescriptor system
- The conversion handles both `double` and `unitDouble` value types

---

## Related APIs

- [Document Operations](../photoshop_jsx_document_api.md) - For document operations that may return descriptors
- [Selection Operations](../photoshop_jsx_selection_api.md) - For selection bounds that can be converted
