# Photoshop JSX Utils API Reference

This document provides reference for Photoshop Utility JSX operations. These operations provide helper functions for file operations, platform detection, and common utilities.

## Table of Contents

- [File Operations](#file-operations)
- [Platform Detection](#platform-detection)
- [Error Handling](#error-handling)

## File Operations

### Check File Exists

Check if a file exists at the specified path.

**File:** `fileExists.jsx`

**Parameters:**
- `filepath` (string, required) - Full file path to check

```javascript
// Expected global: filepath (string)
var filepath = (typeof filepath !== 'undefined') ? filepath : '';
var f = new File(filepath);
f.exists;
```

**Returns:** `boolean` - true if file exists, false otherwise

**Example:**
```javascript
var filepath = "/Users/username/Documents/image.jpg";
// Execute fileExists.jsx with filepath parameter
// Returns: true or false
```

---

### Read File

Read the contents of a text file.

**File:** `readFile.jsx`

**Parameters:**
- `filepath` (string, required) - Full file path to read

```javascript
// Expected global: filepath (string)
var filepath = (typeof filepath !== 'undefined') ? filepath : '';
var f = new File(filepath);
f.encoding = "UTF-8";
f.open('r');
var content = f.read();
f.close();
content;
```

**Returns:** `string` - File contents as a string

**Example:**
```javascript
var filepath = "/Users/username/Documents/data.txt";
// Execute readFile.jsx with filepath parameter
// Returns: File contents as string
```

**Note:** 
- File is read with UTF-8 encoding
- File must be a text file
- Binary files should not be read with this function

---

### Save File

Write text content to a file.

**File:** `saveFile.jsx`

**Parameters:**
- `text` (string, required) - Text content to write
- `file` (string, required) - Full file path to write to

```javascript
// Expected globals: text (string), file (string) - file path
var text = (typeof text !== 'undefined') ? text : '';
var file = (typeof file !== 'undefined') ? file : '';
var jsonFile = new File(file);
jsonFile.open("w");
jsonFile.encoding = "UTF-8";
jsonFile.lineFeed = "Unix";
jsonFile.write(text);
jsonFile.close();
```

**Example:**
```javascript
var text = "Hello, World!\nThis is a test file.";
var file = "/Users/username/Documents/output.txt";
// Execute saveFile.jsx with text and file parameters
```

**Returns:** Writes the text content to the specified file

**Note:** 
- File is written with UTF-8 encoding
- Uses Unix line feeds (LF)
- If file exists, it will be overwritten
- If file doesn't exist, it will be created

---

## Platform Detection

### Check if Mac

Check if Photoshop is running on macOS.

**File:** `isMac.jsx`

```javascript
/mac/.test($.os.toLowerCase());
```

**Returns:** `boolean` - true if running on macOS, false otherwise

**Example:**
```javascript
// Execute isMac.jsx
// Returns: true on Mac, false on Windows
```

---

### Check if Windows

Check if Photoshop is running on Windows.

**File:** `isWin.jsx`

```javascript
/win/.test($.os.toLowerCase());
```

**Returns:** `boolean` - true if running on Windows, false otherwise

**Example:**
```javascript
// Execute isWin.jsx
// Returns: true on Windows, false on Mac
```

---

## Error Handling

### Common Errors

1. **File Not Found**: When reading a file, the file may not exist.
2. **Permission Denied**: File operations may fail due to permissions.
3. **Invalid Path**: File paths must be valid and absolute.
4. **Encoding Issues**: Text files should use UTF-8 encoding.

### Try-Catch Pattern

Always wrap utility operations in try-catch blocks:

```javascript
try {
    // Execute utility operation
    var result = /* execute script */;
    // Handle result
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Usage Examples

### Complete File Workflow

```javascript
try {
    // 1. Check if file exists
    var filepath = "/Users/username/Documents/data.txt";
    var exists = /* execute fileExists.jsx with filepath */;
    
    if (exists) {
        // 2. Read file
        var content = /* execute readFile.jsx with filepath */;
        
        // 3. Process content
        // ... modify content ...
        
        // 4. Save modified content
        var text = content; // modified content
        var file = filepath;
        // Execute saveFile.jsx with text and file parameters
    } else {
        // Create new file
        var text = "New file content";
        var file = filepath;
        // Execute saveFile.jsx with text and file parameters
    }
    
    "File workflow completed";
} catch (e) {
    "Error: " + e.toString();
}
```

### Platform-Specific Operations

```javascript
try {
    // Detect platform
    var isMac = /* execute isMac.jsx */;
    var isWin = /* execute isWin.jsx */;
    
    // Platform-specific file paths
    var filepath;
    if (isMac) {
        filepath = "/Users/username/Documents/file.txt";
    } else if (isWin) {
        filepath = "C:\\Users\\username\\Documents\\file.txt";
    }
    
    // Platform-specific operations
    if (isMac) {
        // Mac-specific code
    } else if (isWin) {
        // Windows-specific code
    }
    
    "Platform-specific operations completed";
} catch (e) {
    "Error: " + e.toString();
}
```

### Read and Parse JSON File

```javascript
try {
    // 1. Check if JSON file exists
    var filepath = "/Users/username/Documents/data.json";
    var exists = /* execute fileExists.jsx with filepath */;
    
    if (exists) {
        // 2. Read file
        var content = /* execute readFile.jsx with filepath */;
        
        // 3. Parse JSON (if needed in your context)
        // Note: JSX doesn't have native JSON.parse, but you might handle this differently
        // var data = JSON.parse(content);
    }
    
    "JSON file read";
} catch (e) {
    "Error: " + e.toString();
}
```

### Write Configuration File

```javascript
try {
    // Create configuration data
    var config = {
        width: 1920,
        height: 1080,
        format: "JPEG"
    };
    
    // Convert to string (simplified - you may need custom serialization)
    var text = "width=1920\nheight=1080\nformat=JPEG";
    var file = "/Users/username/Documents/config.txt";
    
    // Save configuration
    // Execute saveFile.jsx with text and file parameters
    
    "Configuration saved";
} catch (e) {
    "Error: " + e.toString();
}
```

### Safe File Read

```javascript
try {
    var filepath = "/Users/username/Documents/data.txt";
    
    // Check if file exists before reading
    var exists = /* execute fileExists.jsx with filepath */;
    
    if (exists) {
        var content = /* execute readFile.jsx with filepath */;
        // Process content
    } else {
        // Handle file not found
        "File not found: " + filepath;
    }
    
    "Safe file read completed";
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Notes

- File paths should be absolute paths
- File operations use UTF-8 encoding
- Platform detection is useful for cross-platform scripts
- File existence should be checked before reading
- Writing to a file will overwrite existing content
- Unix line feeds (LF) are used when saving files
- These utilities are helpful for script configuration and data persistence

---

## Related APIs

- [Application Operations](../photoshop_jsx_application_api.md) - For application-level operations
- [Document Operations](../photoshop_jsx_document_api.md) - For document file operations
