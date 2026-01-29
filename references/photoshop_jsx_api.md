# Photoshop JSX API Reference

This document provides reference for common Photoshop JSX (JavaScript) operations that can be used to control Photoshop programmatically.

## Table of Contents

- [Document Operations](#document-operations)
- [Layer Operations](#layer-operations)
- [Selection Operations](#selection-operations)
- [Image Manipulation](#image-manipulation)
- [Color and Adjustments](#color-and-adjustments)
- [Filters and Effects](#filters-and-effects)
- [File Operations](#file-operations)
- [Error Handling](#error-handling)

## Document Operations

### Create New Document

```javascript
// Create a new document
var doc = app.documents.add(800, 600, 72, "New Document", NewDocumentMode.RGB);

// Parameters:
// - width: number (pixels)
// - height: number (pixels)
// - resolution: number (pixels per inch)
// - name: string
// - mode: NewDocumentMode (RGB, CMYK, GRAYSCALE, LAB, BITMAP)
```

### Get Active Document

```javascript
// Get the currently active document
var doc = app.activeDocument;

// Check if document exists
if (app.documents.length > 0) {
    var doc = app.activeDocument;
}
```

### Document Properties

```javascript
var doc = app.activeDocument;

// Get dimensions
var width = doc.width;
var height = doc.height;
var resolution = doc.resolution;

// Set dimensions
doc.resizeCanvas(1000, 800, AnchorPosition.TOPLEFT);
```

## Layer Operations

### Create New Layer

```javascript
var doc = app.activeDocument;

// Create a new layer
var layer = doc.artLayers.add();
layer.name = "New Layer";

// Create layer with specific type
var textLayer = doc.artLayers.add();
textLayer.kind = LayerKind.TEXT;
```

### Access Layers

```javascript
var doc = app.activeDocument;

// Get all layers
var layers = doc.layers;

// Get layer by name
var layer = doc.layers.getByName("Layer Name");

// Get active layer
var activeLayer = doc.activeLayer;
```

### Layer Manipulation

```javascript
var layer = doc.activeLayer;

// Rename layer
layer.name = "New Name";

// Delete layer
layer.remove();

// Duplicate layer
var newLayer = layer.duplicate();

// Move layer
layer.move(doc.layers[0], ElementPlacement.PLACEAFTER);

// Show/hide layer
layer.visible = true;
layer.visible = false;

// Set opacity
layer.opacity = 50; // 0-100
```

## Selection Operations

### Create Selection

```javascript
var doc = app.activeDocument;

// Select all
doc.selection.selectAll();

// Deselect all
doc.selection.deselect();

// Rectangular selection
var bounds = [
    [100, 100], // top-left
    [300, 100], // top-right
    [300, 300], // bottom-right
    [100, 300]  // bottom-left
];
doc.selection.select(bounds);

// Elliptical selection (requires bounds)
doc.selection.select(bounds, SelectionType.ELLIPTICAL);
```

### Modify Selection

```javascript
// Expand selection
doc.selection.expand(10); // pixels

// Contract selection
doc.selection.contract(10); // pixels

// Feather selection
doc.selection.feather(5); // pixels

// Invert selection
doc.selection.invert();
```

## Image Manipulation

### Resize Image

```javascript
var doc = app.activeDocument;

// Resize image (maintains aspect ratio by default)
doc.resizeImage(800, 600, 72, ResampleMethod.BICUBIC);

// Resize canvas
doc.resizeCanvas(1000, 800, AnchorPosition.TOPLEFT);
```

### Rotate

```javascript
var doc = app.activeDocument;

// Rotate entire document
doc.rotateCanvas(90); // degrees

// Rotate layer
var layer = doc.activeLayer;
layer.rotate(45); // degrees
```

### Crop

```javascript
var doc = app.activeDocument;

// Crop to selection
if (doc.selection.bounds) {
    doc.crop(doc.selection.bounds);
}

// Crop to specific bounds
var bounds = [
    [100, 100],
    [500, 100],
    [500, 400],
    [100, 400]
];
doc.crop(bounds);
```

## Color and Adjustments

### Set Foreground/Background Colors

```javascript
// Set foreground color (RGB)
var color = new RGBColor();
color.red = 255;
color.green = 0;
color.blue = 0;
app.foregroundColor = color;

// Set background color
app.backgroundColor = color;
```

### Apply Adjustments

```javascript
var doc = app.activeDocument;

// Brightness/Contrast
var brightnessContrast = doc.artLayers.add();
brightnessContrast.kind = LayerKind.BRIGHTNESSCONTRAST;
brightnessContrast.brightness = 20;
brightnessContrast.contrast = 10;

// Levels
var levels = doc.artLayers.add();
levels.kind = LayerKind.LEVELS;
// Configure levels...

// Hue/Saturation
var hueSaturation = doc.artLayers.add();
hueSaturation.kind = LayerKind.HUESATURATION;
hueSaturation.hue = 30;
hueSaturation.saturation = 20;
```

## Filters and Effects

### Apply Filters

```javascript
var doc = app.activeDocument;
var layer = doc.activeLayer;

// Gaussian Blur
layer.applyGaussianBlur(5.0);

// Unsharp Mask
layer.applyUnSharpMask(100, 1.0, 0);

// Add Noise
layer.applyAddNoise(10, NoiseDistribution.UNIFORM, true);
```

### Layer Effects

```javascript
var layer = doc.activeLayer;

// Drop Shadow
var shadow = layer.dropShadow;
shadow.enabled = true;
shadow.distance = 10;
shadow.blur = 5;
shadow.opacity = 75;

// Outer Glow
var glow = layer.outerGlow;
glow.enabled = true;
glow.blur = 10;
glow.opacity = 80;
```

## File Operations

### Open File

```javascript
// Open a file
var file = new File("/path/to/image.jpg");
var doc = app.open(file);

// Open with options
var options = new JPEGOpenOptions();
options.quality = 8;
var doc = app.open(file, options);
```

### Save File

```javascript
var doc = app.activeDocument;

// Save as JPEG
var file = new File("/path/to/output.jpg");
var options = new JPEGSaveOptions();
options.quality = 10;
doc.saveAs(file, options);

// Save as PNG
var pngFile = new File("/path/to/output.png");
var pngOptions = new PNGSaveOptions();
pngOptions.compression = 0;
doc.saveAs(pngFile, pngOptions);
```

### Close Document

```javascript
var doc = app.activeDocument;

// Close without saving
doc.close(SaveOptions.DONOTSAVECHANGES);

// Close with saving
doc.close(SaveOptions.SAVECHANGES);
```

## Error Handling

### Try-Catch Blocks

Always wrap JSX code in try-catch blocks for proper error handling:

```javascript
try {
    var doc = app.activeDocument;
    
    // Perform operations
    var layer = doc.artLayers.add();
    layer.name = "New Layer";
    
    // Return success message
    "Operation completed successfully";
    
} catch (e) {
    // Return error message
    "Error: " + e.toString();
}
```

### Check Document Existence

```javascript
if (app.documents.length === 0) {
    "Error: No document is open";
} else {
    var doc = app.activeDocument;
    // Continue with operations
}
```

### Check Layer Existence

```javascript
try {
    var layer = doc.layers.getByName("Layer Name");
    // Use layer
} catch (e) {
    "Error: Layer not found";
}
```

## Common Patterns

### Create Document and Add Content

```javascript
try {
    // Create new document
    var doc = app.documents.add(800, 600, 72, "New Document");
    
    // Add a layer
    var layer = doc.artLayers.add();
    layer.name = "Content Layer";
    
    // Fill with color
    var color = new RGBColor();
    color.red = 100;
    color.green = 150;
    color.blue = 200;
    app.foregroundColor = color;
    doc.selection.selectAll();
    doc.selection.fill(app.foregroundColor);
    doc.selection.deselect();
    
    "Document created successfully";
} catch (e) {
    "Error: " + e.toString();
}
```

### Modify Active Document

```javascript
try {
    if (app.documents.length === 0) {
        "Error: No document is open";
    } else {
        var doc = app.activeDocument;
        
        // Add a new layer
        var newLayer = doc.artLayers.add();
        newLayer.name = "Modified Layer";
        
        "Document modified successfully";
    }
} catch (e) {
    "Error: " + e.toString();
}
```

## Notes

- All coordinates are in pixels
- Layer indices are 0-based
- Many operations require an active document
- Some operations may require specific layer types
- Always check for document/layer existence before operations
- Use try-catch blocks to handle errors gracefully
