# Photoshop JSX Document API Reference

This document provides reference for Photoshop Document-level JSX operations. These operations control document creation, manipulation, properties, and file operations.

## Table of Contents

- [Document Management](#document-management)
- [Document Properties](#document-properties)
- [Document Manipulation](#document-manipulation)
- [File Operations](#file-operations)
- [Export Operations](#export-operations)
- [Selection Operations](#selection-operations)
- [Error Handling](#error-handling)

## Document Management

### Create Document

Create a new Photoshop document.

**File:** `create.jsx`

**Parameters:**
- `name` (string, optional, default: 'Untitled') - Document name
- `width` (number, optional, default: 100) - Document width in pixels
- `height` (number, optional, default: 100) - Document height in pixels
- `density` (number, optional, default: 72) - Resolution in pixels per inch
- `artboard` (boolean, optional, default: false) - Create as artboard
- `background` (boolean, optional, default: false) - Auto-promote background layer

```javascript
// Expected globals: name (string), width (number), height (number), density (number, default 72), artboard (boolean, default false), background (boolean, default false)
var name = (typeof name !== 'undefined') ? name : 'Untitled';
var width = (typeof width !== 'undefined') ? width : 100;
var height = (typeof height !== 'undefined') ? height : 100;
var density = (typeof density !== 'undefined') ? density : 72;
var artboard = (typeof artboard !== 'undefined') ? artboard : false;
var background = (typeof background !== 'undefined') ? background : false;
// ... creates document with specified parameters
```

**Example:**
```javascript
// Create a standard document
var name = "My Document";
var width = 1920;
var height = 1080;
var density = 300;
var artboard = false;
var background = false;
// Execute create.jsx with these parameters
```

**Returns:** Creates a new document and makes it active

---

### Get Active Document

Get the currently active document ID.

**File:** `activeDocument.jsx`

```javascript
var docId;
try {
    var documentReference = new ActionReference();
    documentReference.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("DocI"));
    documentReference.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var documentDescriptor = app.executeActionGet(documentReference);
    docId = documentDescriptor.getInteger(charIDToTypeID("DocI"));
} catch (e) {
    docId = 0;
}
docId === 0 ? null : docId;
```

**Returns:** `number | null` - The active document ID, or null if no document is open

---

### Select Document

Set a document as active by its ID.

**File:** `select.jsx`

**Parameters:**
- `docId` (number, required) - Document ID to select

```javascript
// Expected global: docId (number)
var docId = (typeof docId !== 'undefined') ? docId : 0;
// ... selects document with specified ID
```

**Example:**
```javascript
var docId = 12345;
// Execute select.jsx with docId parameter
```

---

### Active Document Check

Check if there is an active document.

**File:** `active.jsx`

**Note:** This is similar to `activeDocument.jsx` but uses a different approach.

---

### Duplicate Document

Duplicate the active document.

**File:** `duplicate.jsx`

```javascript
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
desc1.putReference(charIDToTypeID("null"), ref1);
app.executeAction(charIDToTypeID("Dplc"), desc1, DialogModes.NO);
```

**Returns:** Creates a duplicate of the active document

---

### Close Document

Close the active document.

**File:** `close.jsx`

**Parameters:**
- `save` (boolean, optional, default: false) - Whether to save before closing

```javascript
// Expected global: save (boolean)
var save = (typeof save !== 'undefined') ? save : false;
// ... closes document with or without saving
```

**Example:**
```javascript
// Close without saving
var save = false;

// Close with saving
var save = true;
```

---

### Create Document from Selected Layers

Create a new document from the currently selected layers.

**File:** `fromSelectedLayers.jsx`

```javascript
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putClass(stringIDToTypeID("document"));
desc1.putReference(stringIDToTypeID("null"), ref1);
var ref2 = new ActionReference();
ref2.putEnumerated(stringIDToTypeID("layer"), stringIDToTypeID("ordinal"), stringIDToTypeID("targetEnum"));
desc1.putReference(stringIDToTypeID("using"), ref2);
desc1.putInteger(stringIDToTypeID("version"), 5);
app.executeAction(stringIDToTypeID("make"), desc1, DialogModes.NO);
```

**Returns:** Creates a new document containing only the selected layers

---

## Document Properties

### Get Document ID

Get the ID of the active document.

**File:** `getDocumentId.jsx`

```javascript
var result;
try {
    var documentReference = new ActionReference();
    documentReference.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("DocI"));
    documentReference.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var documentDescriptor = app.executeActionGet(documentReference);
    result = documentDescriptor.getInteger(charIDToTypeID("DocI"));
} catch (e) {
    result = 0;
}
result;
```

**Returns:** `number` - The document ID (0 if no document or error)

---

### Get Document Name

Get the name/title of the active document.

**File:** `name.jsx`

```javascript
var result;
try {
    var documentReference = new ActionReference();
    documentReference.putProperty(charIDToTypeID("Prpr"), charIDToTypeID("Ttl "));
    documentReference.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var documentDescriptor = app.executeActionGet(documentReference);
    result = documentDescriptor.getString(charIDToTypeID("Ttl "));
} catch (e) {
    result = "";
}
result;
```

**Returns:** `string` - The document name/title

---

### Get Document Path

Get the file path of the active document.

**File:** `path.jsx`

```javascript
var result;
var a = new ActionReference();
a.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("fileReference"));
a.putEnumerated(charIDToTypeID("Dcmn"), stringIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var documentDescriptor = app.executeActionGet(a);
if (documentDescriptor.hasKey(stringIDToTypeID("fileReference"))) {
    result = documentDescriptor.getPath(stringIDToTypeID("fileReference"));
} else {
    result = null;
}
result;
```

**Returns:** `string | null` - The file path, or null if document is unsaved

---

### Get Document Size

Get the width and height of the active document in pixels.

**File:** `size.jsx`

```javascript
var docRef = app.activeDocument;
var result = {
    width: Math.round(docRef.width.as('px')),
    height: Math.round(docRef.height.as('px'))
};
result;
```

**Returns:** `object` - An object with `width` and `height` properties (in pixels)

**Example:**
```javascript
// Result: { width: 1920, height: 1080 }
```

---

### Get Document Format

Get the file format of the active document.

**File:** `format.jsx`

```javascript
var ref = new ActionReference();
ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("format"));
ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var descriptor = app.executeActionGet(ref);
descriptor.getString(stringIDToTypeID("format"));
```

**Returns:** `string` - The document format (e.g., "photoshop35Format", "JPEG", etc.)

---

### Get Document Resolution

Get the resolution of the active document.

**File:** `resolution.jsx`

```javascript
var ref = new ActionReference();
ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("resolution"));
ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var descriptor = app.executeActionGet(ref);
descriptor.getInteger(stringIDToTypeID("resolution"));
```

**Returns:** `number` - The resolution in pixels per inch

---

### Get Document File Length

Get the file size of the active document in bytes.

**File:** `length.jsx`

```javascript
var doc = app.activeDocument;
var result;
try {
    var file = new File(doc.fullName);
    result = file.length;
} catch (e) {
    result = 0;
}
result;
```

**Returns:** `number` - File size in bytes (0 if unsaved or error)

---

### Check if Document is Saved

Check if the active document has been saved.

**File:** `saved.jsx`

```javascript
var a = new ActionReference();
a.putEnumerated(charIDToTypeID("Dcmn"), stringIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var documentDescriptor = app.executeActionGet(a);
documentDescriptor.hasKey(stringIDToTypeID("fileReference"));
```

**Returns:** `boolean` - true if document has a file reference (is saved), false otherwise

---

## Document Manipulation

### Resize Image

Resize the image content of the active document.

**File:** `resizeImage.jsx`

**Parameters:**
- `width` (number, optional) - New width in pixels (0 to maintain aspect ratio)
- `height` (number, optional) - New height in pixels (0 to maintain aspect ratio)

```javascript
// Expected globals: width (number), height (number) - size object
var width = (typeof width !== 'undefined') ? width : 0;
var height = (typeof height !== 'undefined') ? height : 0;
// ... resizes image with bicubic sharper interpolation
```

**Example:**
```javascript
// Resize to specific dimensions
var width = 800;
var height = 600;

// Resize width only (maintains aspect ratio)
var width = 1920;
var height = 0;
```

**Note:** If either width or height is 0, proportions are maintained. Uses bicubic sharper interpolation.

---

### Resize Canvas

Resize the canvas of the active document.

**File:** `resizeCanvas.jsx`

**Parameters:**
- `width` (number, required) - New canvas width in pixels
- `height` (number, required) - New canvas height in pixels

```javascript
// Expected globals: width (number), height (number) - size
var width = (typeof width !== 'undefined') ? width : 0;
var height = (typeof height !== 'undefined') ? height : 0;
// ... resizes canvas, centered
```

**Example:**
```javascript
var width = 2000;
var height = 1500;
// Canvas is resized and centered
```

**Note:** Canvas is resized from the center by default.

---

### Crop Document

Crop the active document to specified bounds.

**File:** `crop.jsx`

**Parameters:**
- `x` (number, required) - Left position in pixels
- `y` (number, required) - Top position in pixels
- `right` (number, required) - Right position in pixels
- `bottom` (number, required) - Bottom position in pixels

```javascript
// Expected globals: x (number), y (number), right (number), bottom (number) - rect bounds in px
var x = (typeof x !== 'undefined') ? x : 0;
var y = (typeof y !== 'undefined') ? y : 0;
var right = (typeof right !== 'undefined') ? right : 0;
var bottom = (typeof bottom !== 'undefined') ? bottom : 0;
app.activeDocument.crop([UnitValue(x, 'px'), UnitValue(y, 'px'), UnitValue(right, 'px'), UnitValue(bottom, 'px')]);
```

**Example:**
```javascript
// Crop to a 500x500 area starting at (100, 100)
var x = 100;
var y = 100;
var right = 600;
var bottom = 600;
```

---

### Trim Document

Trim the document based on transparency.

**File:** `trim.jsx`

```javascript
var desc1 = new ActionDescriptor();
desc1.putEnumerated(stringIDToTypeID("trimBasedOn"), stringIDToTypeID("trimBasedOn"), stringIDToTypeID("transparency"));
desc1.putBoolean(stringIDToTypeID("top"), true);
desc1.putBoolean(stringIDToTypeID("bottom"), true);
desc1.putBoolean(stringIDToTypeID("left"), true);
desc1.putBoolean(stringIDToTypeID("right"), true);
app.executeAction(stringIDToTypeID("trim"), desc1, DialogModes.NO);
```

**Returns:** Trims transparent edges from all sides

---

### Convert Color Mode

Convert the document color mode.

**File:** `convertColorMode.jsx`

**Parameters:**
- `mode` (string, optional, default: "CMYKColorMode") - Target color mode

```javascript
// Expected global: mode (string, e.g. "CMYKColorMode") - optional, default CMYK
var desc1 = new ActionDescriptor();
desc1.putClass(stringIDToTypeID("to"), stringIDToTypeID("CMYKColorMode"));
app.executeAction(stringIDToTypeID("convertMode"), desc1, DialogModes.NO);
```

**Valid Modes:**
- `"RGBColorMode"`
- `"CMYKColorMode"`
- `"GrayscaleMode"`
- `"LabColorMode"`
- `"BitmapMode"`

---

## File Operations

### Save As

Save the active document with specified format and path.

**File:** `saveAs.jsx`

**Parameters:**
- `filePath` (string, required) - Full file path including filename
- `format` (string, optional, default: 'photoshop35Format') - File format
  - `"JPEG"` - JPEG format
  - `"PNGFormat"` - PNG format
  - `"photoshop35Format"` - PSD format
  - `"bMPFormat"` - BMP format
- `saveAsCopy` (boolean, optional, default: false) - Save as copy
- `docId` (number, optional) - Document ID (auto-detected if not provided)

```javascript
// Expected globals: filePath (string), format (string: "JPEG"|"PNGFormat"|"photoshop35Format"|"bMPFormat"), saveAsCopy (boolean, default false), docId (number - current document id)
// ... saves document with specified parameters
```

**Example:**
```javascript
// Save as PSD
var filePath = "/Users/username/Documents/image.psd";
var format = "photoshop35Format";
var saveAsCopy = false;

// Save as JPEG
var filePath = "/Users/username/Documents/image.jpg";
var format = "JPEG";
var saveAsCopy = false;
```

---

### Force Save

Force save the active document to its current path.

**File:** `forceSave.jsx`

```javascript
// Gets document ID and path, then saves
// ... saves document to its current location
```

**Returns:** Saves the document if it has a file path

---

## Export Operations

### Export to BMP

Export the active document as BMP format.

**File:** `exportToBMP.jsx`

**Parameters:**
- `path` (string, required) - Directory path
- `filename` (string, optional, default: 'export.bmp') - Filename
- `docId` (number, optional) - Document ID (auto-detected if not provided)

```javascript
// Expected globals: path (string), filename (string), docId (number, optional)
// ... exports as BMP with Windows platform, 24-bit depth
```

**Example:**
```javascript
var path = "/Users/username/Exports";
var filename = "image.bmp";
```

---

### Export to PDF

Export the active document as PDF format.

**File:** `exportToPdf.jsx`

**Parameters:**
- `path` (string, required) - Directory path
- `filename` (string, optional, default: 'export.pdf') - Filename
- `docId` (number, optional) - Document ID (auto-detected if not provided)

```javascript
// Expected globals: path (string), filename (string), docId (number, optional - current doc if not set)
// ... exports as PDF with PDF 1.5 compatibility
```

**Example:**
```javascript
var path = "/Users/username/Exports";
var filename = "document.pdf";
```

---

### Export to Web

Export the active document for web using Save for Web options.

**File:** `exportToWeb.jsx`

**Parameters:**
- `path` (string, required) - Directory path
- `filename` (string, optional, default: 'export') - Filename (without extension)
- `options` (ExportOptionsSaveForWeb, required) - Export options object

```javascript
// Expected globals: path (string), filename (string), options (ExportOptionsSaveForWeb)
var path = (typeof path !== 'undefined') ? path : '';
var filename = (typeof filename !== 'undefined') ? filename : 'export';
var options = (typeof options !== 'undefined') ? options : null;
if (options !== null) {
    var file = new File(path + "/" + filename);
    app.activeDocument.exportDocument(file, ExportType.SAVEFORWEB, options);
}
```

**Example:**
```javascript
// Create export options
var options = new ExportOptionsSaveForWeb();
options.format = SaveDocumentType.PNG;
options.PNG8 = false;
options.transparency = true;
options.quality = 100;

var path = "/Users/username/Exports";
var filename = "web-image";
```

---

## Selection Operations

### Get Selection

Get the current selection bounds.

**File:** `selection.jsx`

**Parameters:**
- `unit` (string, optional, default: 'px') - Unit for coordinates

```javascript
// Optional global: unit (string, default 'px')
var unit = (typeof unit !== 'undefined') ? unit : 'px';
var result = null;
try {
    var selection = app.activeDocument.selection.bounds;
    result = {
        x: selection[0].as(unit),
        y: selection[1].as(unit),
        width: selection[2].as(unit) - selection[0].as(unit),
        height: selection[3].as(unit) - selection[1].as(unit)
    };
} catch (ex) {
    result = null;
}
result;
```

**Returns:** `object | null` - Selection bounds with `x`, `y`, `width`, `height`, or null if no selection

---

### Set Selection

Set the selection to specified bounds.

**File:** `setSelection.jsx`

**Parameters:**
- `left` (number, required) - Left position in pixels
- `top` (number, required) - Top position in pixels
- `right` (number, required) - Right position in pixels
- `bottom` (number, required) - Bottom position in pixels

```javascript
// Expected globals: left (number), top (number), right (number), bottom (number) - rect in pixels
// ... sets selection to specified rectangle
```

**Example:**
```javascript
var left = 100;
var top = 100;
var right = 500;
var bottom = 400;
```

---

### Get Color Sampler List

Get all color samplers in the active document.

**File:** `colorSamplerList.jsx`

```javascript
var documentReference = new ActionReference();
documentReference.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
var documentDescriptor = app.executeActionGet(documentReference);
var ret = [];
if (documentDescriptor.hasKey(stringIDToTypeID("colorSamplerList"))) {
    var colorSamplerList = documentDescriptor.getList(stringIDToTypeID("colorSamplerList"));
    for (var i = 0; i < colorSamplerList.count; i++) {
        var colorSamplerDesc = colorSamplerList.getObjectValue(i);
        var position = colorSamplerDesc.getObjectValue(stringIDToTypeID("position"));
        var color = colorSamplerDesc.getObjectValue(stringIDToTypeID("color"));
        ret.push({
            position: {
                x: position.getDouble(stringIDToTypeID("horizontal")),
                y: position.getDouble(stringIDToTypeID("vertical"))
            },
            color: {
                red: color.getDouble(stringIDToTypeID("red")),
                green: color.getDouble(stringIDToTypeID("grain")),
                blue: color.getDouble(stringIDToTypeID("blue"))
            }
        });
    }
}
ret;
```

**Returns:** `array` - Array of color sampler objects with `position` and `color` properties

---

## Advanced Operations

### Get Document Descriptor

Get the full ActionDescriptor for the active document.

**File:** `toDescriptor.jsx`

```javascript
var documentReference = new ActionReference();
documentReference.putEnumerated(stringIDToTypeID("document"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
app.executeActionGet(documentReference);
```

**Returns:** `ActionDescriptor` - Full document descriptor

---

### Get Document JSON String

Get the document properties as a JSON string.

**File:** `jsonString.jsx`

```javascript
var af = new ActionReference();
var ad = new ActionDescriptor();
af.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("json"));
af.putEnumerated(stringIDToTypeID("document"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
ad.putReference(charIDToTypeID("null"), af);
app.executeAction(charIDToTypeID("getd"), ad, DialogModes.NO).getString(stringIDToTypeID("json"));
```

**Returns:** `string` - JSON string representation of document properties

---

## Error Handling

### Common Errors

1. **No Active Document**: Many operations require an active document. Check with `activeDocument.jsx` first.
2. **Invalid Parameters**: Ensure all required parameters are provided with correct types.
3. **File Path Errors**: Use absolute paths for file operations.
4. **Selection Errors**: Some operations may fail if no selection exists.

### Try-Catch Pattern

Always wrap document operations in try-catch blocks:

```javascript
try {
    // Execute document operation
    var result = /* execute script */;
    // Handle result
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Usage Examples

### Complete Workflow: Create and Save Document

```javascript
try {
    // 1. Create new document
    var name = "My Project";
    var width = 1920;
    var height = 1080;
    var density = 300;
    // Execute create.jsx
    
    // 2. Get document ID
    var docId = /* execute getDocumentId.jsx */;
    
    // 3. Work with document...
    
    // 4. Save document
    var filePath = "/Users/username/Documents/myproject.psd";
    var format = "photoshop35Format";
    var saveAsCopy = false;
    // Execute saveAs.jsx
    
    "Document created and saved successfully";
} catch (e) {
    "Error: " + e.toString();
}
```

### Resize and Export Workflow

```javascript
try {
    // 1. Get current size
    var size = /* execute size.jsx */;
    
    // 2. Resize image
    var width = 800;
    var height = 600;
    // Execute resizeImage.jsx
    
    // 3. Export as JPEG
    var filePath = "/Users/username/Exports/resized.jpg";
    var format = "JPEG";
    // Execute saveAs.jsx
    
    "Image resized and exported";
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Notes

- All coordinates and dimensions are in pixels unless otherwise specified
- Document IDs are unique identifiers assigned by Photoshop
- File paths should be absolute paths
- Some operations may modify the document history
- Export operations create new files without modifying the original document
- Color mode conversion may affect layer properties and appearance

---

## Related APIs

- [Application Operations](../photoshop_jsx_application_api.md) - For application-level settings
- [Layer Operations](../photoshop_jsx_layer_api.md) - For layer manipulation
- [Selection Operations](../photoshop_jsx_selection_api.md) - For selection management
