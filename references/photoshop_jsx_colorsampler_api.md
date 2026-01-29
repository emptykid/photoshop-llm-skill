# Photoshop JSX Color Sampler API Reference

This document provides reference for Photoshop Color Sampler-level JSX operations. These operations control color sampler creation and management.

## Table of Contents

- [Color Sampler Creation](#color-sampler-creation)
- [Color Sampler Management](#color-sampler-management)
- [Error Handling](#error-handling)

## Color Sampler Creation

### Apply Color Sampler

Add a color sampler at a specific position in the active document.

**File:** `apply.jsx`

**Parameters:**
- `x` (number, required) - X position in pixels
- `y` (number, required) - Y position in pixels

```javascript
// Expected globals: x (number), y (number) - position in pixels
var x = (typeof x !== 'undefined') ? x : 0;
var y = (typeof y !== 'undefined') ? y : 0;
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putClass(app.stringIDToTypeID("colorSampler"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
var desc2 = new ActionDescriptor();
desc2.putUnitDouble(app.stringIDToTypeID("horizontal"), app.stringIDToTypeID("pixelsUnit"), x);
desc2.putUnitDouble(app.stringIDToTypeID("vertical"), app.stringIDToTypeID("pixelsUnit"), y);
desc1.putObject(app.stringIDToTypeID("position"), app.stringIDToTypeID("paint"), desc2);
app.executeAction(app.stringIDToTypeID("make"), desc1, DialogModes.NO);
```

**Example:**
```javascript
// Add color sampler at position (100, 200)
var x = 100;
var y = 200;
// Execute apply.jsx with x and y parameters
```

**Returns:** Creates a color sampler at the specified position

**Note:** 
- Color samplers are used to sample and display color values at specific points
- Photoshop supports up to 10 color samplers per document
- The color sampler will display RGB values in the Info panel

---

## Color Sampler Management

### Clear All Color Samplers

Remove all color samplers from the active document.

**File:** `clearAll.jsx`

```javascript
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putEnumerated(app.stringIDToTypeID("colorSampler"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("allEnum"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
app.executeAction(app.stringIDToTypeID("delete"), desc1, DialogModes.NO);
```

**Returns:** Removes all color samplers from the document

**Note:** This operation cannot be undone easily. Consider saving the document before clearing color samplers.

---

## Error Handling

### Common Errors

1. **No Active Document**: All color sampler operations require an active document.
2. **Invalid Position**: Color sampler positions should be within document bounds.
3. **Maximum Samplers**: Photoshop supports a maximum of 10 color samplers per document.
4. **No Samplers**: Attempting to clear samplers when none exist may cause errors.

### Try-Catch Pattern

Always wrap color sampler operations in try-catch blocks:

```javascript
try {
    // Execute color sampler operation
    var result = /* execute script */;
    // Handle result
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Usage Examples

### Complete Workflow: Add and Manage Color Samplers

```javascript
try {
    // 1. Add color sampler at key points
    var positions = [
        { x: 100, y: 100 },
        { x: 500, y: 300 },
        { x: 800, y: 600 }
    ];
    
    for (var i = 0; i < positions.length; i++) {
        var x = positions[i].x;
        var y = positions[i].y;
        // Execute apply.jsx with x and y parameters
    }
    
    // 2. Later, clear all samplers
    // Execute clearAll.jsx
    
    "Color samplers managed";
} catch (e) {
    "Error: " + e.toString();
}
```

### Sample Colors at Multiple Points

```javascript
try {
    // Sample colors at corners of a rectangle
    var left = 100;
    var top = 100;
    var right = 500;
    var bottom = 400;
    
    // Top-left corner
    var x = left;
    var y = top;
    // Execute apply.jsx
    
    // Top-right corner
    var x = right;
    var y = top;
    // Execute apply.jsx
    
    // Bottom-left corner
    var x = left;
    var y = bottom;
    // Execute apply.jsx
    
    // Bottom-right corner
    var x = right;
    var y = bottom;
    // Execute apply.jsx
    
    "Color samplers added at corners";
} catch (e) {
    "Error: " + e.toString();
}
```

### Get Color Sampler Information

```javascript
try {
    // Get color sampler list from document
    // Use document/colorSamplerList.jsx to retrieve all samplers
    var samplers = /* execute document/colorSamplerList.jsx */;
    
    // Process samplers
    for (var i = 0; i < samplers.length; i++) {
        var sampler = samplers[i];
        // sampler.position.x - X position
        // sampler.position.y - Y position
        // sampler.color.red - Red value
        // sampler.color.green - Green value
        // sampler.color.blue - Blue value
    }
    
    "Color sampler information retrieved";
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Notes

- Color sampler positions are in pixels
- Photoshop supports up to 10 color samplers per document
- Color samplers display RGB values in the Info panel
- Color samplers are document-specific (each document has its own samplers)
- Clearing color samplers is a destructive operation
- Color samplers are useful for color analysis and matching

---

## Related APIs

- [Document Operations](../photoshop_jsx_document_api.md) - For document-level operations, including `colorSamplerList.jsx`
- [Application Operations](../photoshop_jsx_application_api.md) - For application-level settings
