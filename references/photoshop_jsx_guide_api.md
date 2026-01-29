# Photoshop JSX Guide API Reference

This document provides reference for Photoshop Guide-level JSX operations. These operations control guide creation, management, and visibility.

## Table of Contents

- [Guide Creation](#guide-creation)
- [Guide Information](#guide-information)
- [Guide Management](#guide-management)
- [Guide Visibility](#guide-visibility)
- [Error Handling](#error-handling)

## Guide Creation

### Add Guide

Add a new guide to the active document.

**File:** `add.jsx`

**Parameters:**
- `position` (number, required) - Position of the guide in pixels
- `direction` (string, required) - Guide direction: `"horizontal"` or `"vertical"`

```javascript
// Expected globals: position (number), direction (string: "horizontal" or "vertical")
var position = (typeof position !== 'undefined') ? position : 0;
var direction = (typeof direction !== 'undefined') ? direction : "horizontal";
var desc1 = new ActionDescriptor();
var desc2 = new ActionDescriptor();
desc2.putUnitDouble(app.charIDToTypeID("Pstn"), app.charIDToTypeID("#Pxl"), position);
desc2.putEnumerated(app.charIDToTypeID("Ornt"), app.charIDToTypeID("Ornt"), app.stringIDToTypeID(direction));
desc1.putObject(app.charIDToTypeID("Nw  "), app.charIDToTypeID("Gd  "), desc2);
app.executeAction(app.charIDToTypeID("Mk  "), desc1, DialogModes.NO);
```

**Example:**
```javascript
// Add horizontal guide at 100 pixels from top
var position = 100;
var direction = "horizontal";

// Add vertical guide at 500 pixels from left
var position = 500;
var direction = "vertical";
```

**Returns:** Creates a new guide at the specified position

---

## Guide Information

### Get All Guides

Get information about all guides in the active document.

**File:** `all.jsx`

```javascript
var ref = new ActionReference();
ref.putProperty(app.stringIDToTypeID('property'), app.stringIDToTypeID('numberOfGuides'));
ref.putEnumerated(app.stringIDToTypeID('document'), app.stringIDToTypeID('ordinal'), app.stringIDToTypeID('targetEnum'));
var count = app.executeActionGet(ref).getInteger(app.stringIDToTypeID('numberOfGuides'));
var result = [];
for (var i = 1; i <= count; i++) {
    var ref2 = new ActionReference();
    ref2.putIndex(app.stringIDToTypeID('guide'), i);
    ref2.putEnumerated(app.stringIDToTypeID('document'), app.stringIDToTypeID('ordinal'), app.stringIDToTypeID('targetEnum'));
    var desc = app.executeActionGet(ref2);
    var position = desc.getDouble(app.stringIDToTypeID("position"));
    var direction = app.typeIDToStringID(desc.getEnumerationValue(app.stringIDToTypeID("orientation")));
    result.push({ position: position, direction: direction });
}
result;
```

**Returns:** `array` - Array of guide objects, each with `position` and `direction` properties

**Example:**
```javascript
// Result: [
//   { position: 100, direction: "horizontal" },
//   { position: 500, direction: "vertical" },
//   { position: 800, direction: "horizontal" }
// ]
```

---

### Get Guide Count

Get the total number of guides in the active document.

**File:** `count.jsx`

```javascript
var ref = new ActionReference();
ref.putProperty(app.stringIDToTypeID('property'), app.stringIDToTypeID('numberOfGuides'));
ref.putEnumerated(app.stringIDToTypeID('document'), app.stringIDToTypeID('ordinal'), app.stringIDToTypeID('targetEnum'));
app.executeActionGet(ref).getInteger(app.stringIDToTypeID('numberOfGuides'));
```

**Returns:** `number` - The total number of guides

**Example:**
```javascript
// Result: 5 (if there are 5 guides in the document)
```

---

## Guide Management

### Clear All Guides

Remove all guides from the active document.

**File:** `clear.jsx`

```javascript
app.executeAction(app.stringIDToTypeID("clearAllGuides"), undefined, DialogModes.NO);
```

**Returns:** Removes all guides from the document

**Warning:** This operation cannot be undone easily. Consider saving the document before clearing guides.

---

## Guide Visibility

### Toggle Guide Visibility

Toggle the visibility of all guides in the active document.

**File:** `toggleVisibility.jsx`

```javascript
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putEnumerated(app.charIDToTypeID("Mn  "), app.charIDToTypeID("MnIt"), app.charIDToTypeID("Tgld"));
desc1.putReference(app.charIDToTypeID("null"), ref1);
app.executeAction(app.charIDToTypeID("slct"), desc1, DialogModes.NO);
```

**Returns:** Toggles guide visibility (show/hide)

**Note:** This toggles the View > Show > Guides menu item.

---

## Error Handling

### Common Errors

1. **No Active Document**: All guide operations require an active document.
2. **Invalid Position**: Guide positions should be within document bounds.
3. **Invalid Direction**: Direction must be exactly `"horizontal"` or `"vertical"`.

### Try-Catch Pattern

Always wrap guide operations in try-catch blocks:

```javascript
try {
    // Execute guide operation
    var result = /* execute script */;
    // Handle result
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Usage Examples

### Complete Workflow: Create and Manage Guides

```javascript
try {
    // 1. Get current guide count
    var count = /* execute count.jsx */;
    
    // 2. Add horizontal guides at key positions
    var positions = [100, 200, 300, 400];
    for (var i = 0; i < positions.length; i++) {
        var position = positions[i];
        var direction = "horizontal";
        // Execute add.jsx
    }
    
    // 3. Add vertical guides
    var positions = [500, 1000, 1500];
    for (var i = 0; i < positions.length; i++) {
        var position = positions[i];
        var direction = "vertical";
        // Execute add.jsx
    }
    
    // 4. Get all guides
    var allGuides = /* execute all.jsx */;
    
    "Guides created and retrieved";
} catch (e) {
    "Error: " + e.toString();
}
```

### Create Grid of Guides

```javascript
try {
    // Create a 10x10 grid of guides
    var spacing = 100;
    var docSize = /* execute document size.jsx */;
    
    // Horizontal guides
    for (var y = spacing; y < docSize.height; y += spacing) {
        var position = y;
        var direction = "horizontal";
        // Execute add.jsx
    }
    
    // Vertical guides
    for (var x = spacing; x < docSize.width; x += spacing) {
        var position = x;
        var direction = "vertical";
        // Execute add.jsx
    }
    
    "Grid of guides created";
} catch (e) {
    "Error: " + e.toString();
}
```

### Toggle and Clear Guides

```javascript
try {
    // 1. Get guide count
    var count = /* execute count.jsx */;
    
    // 2. Toggle visibility
    // Execute toggleVisibility.jsx
    
    // 3. If needed, clear all guides
    if (count > 0) {
        // Execute clear.jsx
    }
    
    "Guides managed";
} catch (e) {
    "Error: " + e.toString();
}
```

### List All Guides

```javascript
try {
    // Get all guides
    var guides = /* execute all.jsx */;
    
    // Process guides
    for (var i = 0; i < guides.length; i++) {
        var guide = guides[i];
        // guide.position - position in pixels
        // guide.direction - "horizontal" or "vertical"
    }
    
    "Guides listed";
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Notes

- Guide positions are in pixels
- Guides are document-specific (each document has its own guides)
- Horizontal guides run left-to-right
- Vertical guides run top-to-bottom
- Guide visibility can be toggled without removing guides
- Clearing guides is a destructive operation
- Guides are useful for alignment and layout

---

## Related APIs

- [Document Operations](../photoshop_jsx_document_api.md) - For document-level operations
- [Application Operations](../photoshop_jsx_application_api.md) - For application-level settings
