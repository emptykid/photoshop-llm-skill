# Photoshop JSX Application API Reference

This document provides reference for Photoshop Application-level JSX operations. These operations control the Photoshop application itself, including preferences, file operations, and application information.

## Table of Contents

- [Application Information](#application-information)
- [File Operations](#file-operations)
- [Unit Preferences](#unit-preferences)
- [Error Handling](#error-handling)

## Application Information

### Get Application Version

Get the version number of the Photoshop application.

**File:** `version.jsx`

```javascript
app.version;
```

**Returns:** `string` - The version number of Photoshop (e.g., "24.0.0")

**Example:**
```javascript
var version = app.version;
// Returns: "24.0.0"
```

---

### Get Host Version

Get the host version of Photoshop.

**File:** `getHostVersion.jsx`

```javascript
app.version;
```

**Returns:** `string` - The host version number

**Note:** This is similar to `version.jsx` and returns the application version.

---

### Get Application Path

Get the executable path of the Photoshop application.

**File:** `getApplicationPath.jsx`

```javascript
var kexecutablePathStr = app.stringIDToTypeID("executablePath");
var desc = new ActionDescriptor();
var ref = new ActionReference();
ref.putProperty(app.charIDToTypeID('Prpr'), kexecutablePathStr);
ref.putEnumerated(app.charIDToTypeID('capp'), app.charIDToTypeID('Ordn'), app.charIDToTypeID('Trgt'));
desc.putReference(app.charIDToTypeID('null'), ref);
var result = app.executeAction(app.charIDToTypeID('getd'), desc, DialogModes.NO);
File.decode(result.getPath(kexecutablePathStr));
```

**Returns:** `string` - The full path to the Photoshop executable file

**Example:**
```javascript
var appPath = /* execute getApplicationPath.jsx */;
// Returns: "/Applications/Adobe Photoshop 2024/Adobe Photoshop 2024.app/Contents/MacOS/Adobe Photoshop 2024"
```

---

## File Operations

### Open File

Open a file in Photoshop.

**File:** `open.jsx`

**Parameters:**
- `path` (string, required) - The file path to open

```javascript
// Expected global: path (string)
var path = (typeof path !== 'undefined') ? path : '';
var desc437 = new ActionDescriptor();
desc437.putPath(app.charIDToTypeID("null"), new File(path));
app.executeAction(app.charIDToTypeID("Opn "), desc437, DialogModes.NO);
```

**Parameters:**
- `path` (string) - Full path to the file to open

**Returns:** Opens the file as a new document in Photoshop

**Example:**
```javascript
// Open an image file
var path = "/Users/username/Pictures/image.jpg";
// Execute open.jsx with path parameter
```

**Supported File Formats:**
- JPEG (.jpg, .jpeg)
- PNG (.png)
- PSD (.psd)
- TIFF (.tif, .tiff)
- BMP (.bmp)
- GIF (.gif)
- And other formats supported by Photoshop

---

## Unit Preferences

### Get Ruler Units

Get the current ruler units preference.

**File:** `getRulerUnits.jsx`

```javascript
app.preferences.rulerUnits;
```

**Returns:** `Units` - The current ruler units setting

**Possible Values:**
- `Units.PIXELS` - Pixels
- `Units.INCHES` - Inches
- `Units.CM` - Centimeters
- `Units.MM` - Millimeters
- `Units.POINTS` - Points
- `Units.PICAS` - Picas

**Example:**
```javascript
var rulerUnits = app.preferences.rulerUnits;
// Returns: Units.PIXELS (or other unit type)
```

---

### Get Type Units

Get the current type units preference.

**File:** `getTypeUnits.jsx`

```javascript
app.preferences.typeUnits;
```

**Returns:** `TypeUnits` - The current type units setting

**Possible Values:**
- `TypeUnits.PIXELS` - Pixels
- `TypeUnits.POINTS` - Points
- `TypeUnits.MM` - Millimeters

**Example:**
```javascript
var typeUnits = app.preferences.typeUnits;
// Returns: TypeUnits.POINTS (or other unit type)
```

---

### Set Ruler Units

Set the ruler units preference.

**File:** `setRulerUnits.jsx`

**Parameters:**
- `rulerUnits` (Units, required) - The ruler units to set

```javascript
// Expected global: rulerUnits (Units)
var rulerUnits = (typeof rulerUnits !== 'undefined') ? rulerUnits : null;
if (rulerUnits !== null) {
    app.preferences.rulerUnits = rulerUnits;
}
```

**Parameters:**
- `rulerUnits` (Units) - The ruler units value to set

**Valid Values:**
- `Units.PIXELS`
- `Units.INCHES`
- `Units.CM`
- `Units.MM`
- `Units.POINTS`
- `Units.PICAS`

**Example:**
```javascript
// Set ruler units to centimeters
var rulerUnits = Units.CM;
// Execute setRulerUnits.jsx with rulerUnits parameter
```

---

### Set Type Units

Set the type units preference.

**File:** `setTypeUnits.jsx`

**Parameters:**
- `typeUnits` (TypeUnits, required) - The type units to set

```javascript
// Expected global: typeUnits (TypeUnits)
var typeUnits = (typeof typeUnits !== 'undefined') ? typeUnits : null;
if (typeUnits !== null) {
    app.preferences.typeUnits = typeUnits;
}
```

**Parameters:**
- `typeUnits` (TypeUnits) - The type units value to set

**Valid Values:**
- `TypeUnits.PIXELS`
- `TypeUnits.POINTS`
- `TypeUnits.MM`

**Example:**
```javascript
// Set type units to points
var typeUnits = TypeUnits.POINTS;
// Execute setTypeUnits.jsx with typeUnits parameter
```

---

### Set Units

Set both ruler units and type units preferences simultaneously.

**File:** `setUnits.jsx`

**Parameters:**
- `rulerUnits` (Units, required) - The ruler units to set
- `typeUnits` (TypeUnits, required) - The type units to set

```javascript
// Expected globals: rulerUnits (Units), typeUnits (TypeUnits)
var rulerUnits = (typeof rulerUnits !== 'undefined') ? rulerUnits : null;
var typeUnits = (typeof typeUnits !== 'undefined') ? typeUnits : null;
if (rulerUnits !== null) {
    app.preferences.rulerUnits = rulerUnits;
}
if (typeUnits !== null) {
    app.preferences.typeUnits = typeUnits;
}
```

**Parameters:**
- `rulerUnits` (Units) - The ruler units value to set
- `typeUnits` (TypeUnits) - The type units value to set

**Example:**
```javascript
// Set both units
var rulerUnits = Units.PIXELS;
var typeUnits = TypeUnits.POINTS;
// Execute setUnits.jsx with both parameters
```

---

### Save Units

Save the current ruler and type units preferences for later restoration.

**File:** `saveUnits.jsx`

```javascript
// Returns object { rulerUnits, typeUnits } - caller may store for restoreUnits
var result = {
    rulerUnits: app.preferences.rulerUnits,
    typeUnits: app.preferences.typeUnits
};
result;
```

**Returns:** `object` - An object containing the current unit preferences:
- `rulerUnits` (Units) - Current ruler units
- `typeUnits` (TypeUnits) - Current type units

**Example:**
```javascript
// Save current units
var savedUnits = /* execute saveUnits.jsx */;
// Returns: { rulerUnits: Units.PIXELS, typeUnits: TypeUnits.POINTS }

// Later, restore with restoreUnits.jsx
```

**Use Case:**
This is typically used before changing units temporarily, so you can restore them later:
```javascript
// 1. Save current units
var savedUnits = saveUnits();

// 2. Change units for specific operation
setUnits(Units.CM, TypeUnits.MM);

// 3. Perform operations that need different units

// 4. Restore original units
restoreUnits(savedUnits.rulerUnits, savedUnits.typeUnits);
```

---

### Restore Units

Restore previously saved ruler and type units preferences.

**File:** `restoreUnits.jsx`

**Parameters:**
- `rulerUnits` (Units, required) - The ruler units to restore
- `typeUnits` (TypeUnits, required) - The type units to restore

```javascript
// Expected globals: rulerUnits (Units), typeUnits (TypeUnits) - set before eval, e.g. from saveUnits result
var rulerUnits = (typeof rulerUnits !== 'undefined') ? rulerUnits : null;
var typeUnits = (typeof typeUnits !== 'undefined') ? typeUnits : null;
if (rulerUnits !== null && typeUnits !== null) {
    app.preferences.rulerUnits = rulerUnits;
    app.preferences.typeUnits = typeUnits;
}
```

**Parameters:**
- `rulerUnits` (Units) - The ruler units value to restore
- `typeUnits` (TypeUnits) - The type units value to restore

**Example:**
```javascript
// Restore previously saved units
var rulerUnits = Units.PIXELS;
var typeUnits = TypeUnits.POINTS;
// Execute restoreUnits.jsx with both parameters
```

**Typical Workflow:**
```javascript
// 1. Save current units
var saved = saveUnits();

// 2. Change units
setUnits(Units.CM, TypeUnits.MM);

// 3. Do work...

// 4. Restore original units
restoreUnits(saved.rulerUnits, saved.typeUnits);
```

---

## Error Handling

### Parameter Validation

Most scripts in this module check for undefined parameters before use:

```javascript
var param = (typeof param !== 'undefined') ? param : null;
if (param !== null) {
    // Use parameter
}
```

### Try-Catch Blocks

When calling these scripts, wrap them in try-catch blocks for proper error handling:

```javascript
try {
    // Execute JSX script
    var result = /* execute script */;
    // Handle result
} catch (e) {
    // Handle error
    "Error: " + e.toString();
}
```

### Common Errors

1. **Invalid File Path**: When using `open.jsx`, ensure the file path is valid and the file exists
2. **Invalid Unit Values**: When setting units, ensure you use valid `Units` or `TypeUnits` enum values
3. **Missing Parameters**: Ensure all required parameters are provided before executing scripts

---

## Usage Examples

### Complete Workflow: Change Units Temporarily

```javascript
try {
    // 1. Save current units
    var savedUnits = {
        rulerUnits: app.preferences.rulerUnits,
        typeUnits: app.preferences.typeUnits
    };
    
    // 2. Change to metric units
    app.preferences.rulerUnits = Units.CM;
    app.preferences.typeUnits = TypeUnits.MM;
    
    // 3. Perform operations that need metric units
    // ... your operations here ...
    
    // 4. Restore original units
    app.preferences.rulerUnits = savedUnits.rulerUnits;
    app.preferences.typeUnits = savedUnits.typeUnits;
    
    "Units changed and restored successfully";
} catch (e) {
    "Error: " + e.toString();
}
```

### Open Multiple Files

```javascript
try {
    var files = [
        "/path/to/image1.jpg",
        "/path/to/image2.png",
        "/path/to/image3.psd"
    ];
    
    for (var i = 0; i < files.length; i++) {
        var path = files[i];
        // Execute open.jsx with path parameter
        // Each file opens in a new document
    }
    
    "All files opened successfully";
} catch (e) {
    "Error: " + e.toString();
}
```

### Get Application Information

```javascript
try {
    var appInfo = {
        version: app.version,
        path: /* execute getApplicationPath.jsx */
    };
    
    // Use appInfo
    appInfo;
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Notes

- All unit preferences are application-wide and affect all documents
- Unit changes take effect immediately for new operations
- The `saveUnits` and `restoreUnits` pattern is useful when you need to temporarily change units for specific operations
- File paths in `open.jsx` should be absolute paths
- The application version format may vary between Photoshop versions
- Some operations may require specific Photoshop versions or features

---

## Related APIs

- [Document Operations](../photoshop_jsx_api.md#document-operations) - For document-level operations
- [Layer Operations](../photoshop_jsx_api.md#layer-operations) - For layer manipulation
- [Selection Operations](../photoshop_jsx_api.md#selection-operations) - For selection management
