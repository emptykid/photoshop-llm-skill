# Photoshop JSX History API Reference

This document provides reference for Photoshop History-level JSX operations. These operations control history state navigation, listing, and management.

## Table of Contents

- [History Navigation](#history-navigation)
- [History Information](#history-information)
- [History Management](#history-management)
- [Error Handling](#error-handling)

## History Navigation

### Go to History State

Navigate to a specific history state by index.

**File:** `go.jsx`

**Parameters:**
- `index` (number, required) - History state index (0-based)

```javascript
// Expected global: index (number) - history state index
var index = (typeof index !== 'undefined') ? index : 0;
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putIndex(app.stringIDToTypeID("historyState"), index);
desc1.putReference(app.stringIDToTypeID("null"), ref1);
app.executeAction(app.stringIDToTypeID("select"), desc1, DialogModes.NO);
```

**Example:**
```javascript
// Go to the first history state (index 0)
var index = 0;

// Go to the 5th history state
var index = 4;
```

**Returns:** Navigates to the specified history state

**Note:** History states are 0-based. Index 0 is typically the initial state.

---

### Go to History State by Name

Navigate to a specific history state by its name.

**File:** `goByName.jsx`

**Parameters:**
- `name` (string, required) - History state name

```javascript
// Expected global: name (string) - history state name
var name = (typeof name !== 'undefined') ? name : '';
try {
    var state = app.activeDocument.historyStates.getByName(name);
    app.activeDocument.activeHistoryState = state;
} catch (e) {}
```

**Example:**
```javascript
var name = "Brush Tool";
// Execute goByName.jsx with name parameter
```

**Returns:** Navigates to the history state with the specified name

**Note:** History state names are typically the action that created them (e.g., "Brush Tool", "Move", "Crop").

---

### Go to Last History State

Navigate to the most recent history state.

**File:** `last.jsx`

```javascript
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putEnumerated(app.stringIDToTypeID("historyState"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("last"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
app.executeAction(app.stringIDToTypeID("select"), desc1, DialogModes.NO);
```

**Returns:** Navigates to the most recent history state

---

### Go to Previous History State

Navigate to the previous history state (one step back).

**File:** `previous.jsx`

```javascript
var desc1 = new ActionDescriptor();
var ref1 = new ActionReference();
ref1.putEnumerated(app.stringIDToTypeID("historyState"), app.stringIDToTypeID("ordinal"), app.stringIDToTypeID("previous"));
desc1.putReference(app.stringIDToTypeID("null"), ref1);
app.executeAction(app.stringIDToTypeID("select"), desc1, DialogModes.NO);
```

**Returns:** Navigates one step back in history

**Note:** This is equivalent to pressing Ctrl+Z (Cmd+Z on Mac) once.

---

### Undo

Perform an undo operation.

**File:** `undo.jsx`

```javascript
app.executeAction(app.charIDToTypeID("undo"), undefined, DialogModes.NO);
```

**Returns:** Undoes the last action

**Note:** This is equivalent to the standard undo command.

---

## History Information

### List History States

Get a list of all history states in the active document.

**File:** `list.jsx`

```javascript
var arr = [];
var states = app.activeDocument.historyStates;
for (var i = 0; i < states.length; i++) {
    var s = states[i];
    arr.push(i + ":" + s.name);
}
arr.join(",");
```

**Returns:** `string` - Comma-separated string of history states in format "index:name"

**Example:**
```javascript
// Result: "0:Open,1:Brush Tool,2:Move,3:Crop,4:Levels"
```

**Note:** The format is `"index:name"` for each state, separated by commas.

---

## History Management

### Suspend History

Suspend history recording for a script execution.

**File:** `suspend.jsx`

**Parameters:**
- `name` (string, optional, default: 'Script') - Name for the history state
- `script` (string, required) - Script code to execute without creating history states

```javascript
// Expected globals: name (string), script (string)
var name = (typeof name !== 'undefined') ? name : 'Script';
var script = (typeof script !== 'undefined') ? script : '';
app.activeDocument.suspendHistory(name, script);
```

**Example:**
```javascript
var name = "Batch Operation";
var script = "/* your script code here */";
// Execute suspend.jsx with these parameters
```

**Returns:** Executes the script without creating individual history states for each operation

**Use Case:** Useful for batch operations where you want all changes to appear as a single history state.

---

## Error Handling

### Common Errors

1. **No Active Document**: All history operations require an active document.
2. **Invalid Index**: History state index must be within valid range (0 to historyStates.length - 1).
3. **History State Not Found**: When using `goByName`, the state name may not exist.
4. **No History**: New documents may have limited history states.

### Try-Catch Pattern

Always wrap history operations in try-catch blocks:

```javascript
try {
    // Execute history operation
    var result = /* execute script */;
    // Handle result
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Usage Examples

### Complete Workflow: Navigate History

```javascript
try {
    // 1. Get list of history states
    var historyList = /* execute list.jsx */;
    // Parse: "0:Open,1:Brush Tool,2:Move,3:Crop"
    
    // 2. Go to a specific state by index
    var index = 1;
    // Execute go.jsx with index parameter
    
    // 3. Go back to previous state
    // Execute previous.jsx
    
    // 4. Go to last state
    // Execute last.jsx
    
    "History navigation completed";
} catch (e) {
    "Error: " + e.toString();
}
```

### Find and Navigate to History State by Name

```javascript
try {
    // 1. Get all history states
    var historyList = /* execute list.jsx */;
    var states = historyList.split(",");
    
    // 2. Find state by name
    var targetName = "Crop";
    var targetIndex = -1;
    for (var i = 0; i < states.length; i++) {
        var parts = states[i].split(":");
        if (parts[1] === targetName) {
            targetIndex = parseInt(parts[0]);
            break;
        }
    }
    
    // 3. Navigate to found state
    if (targetIndex >= 0) {
        var index = targetIndex;
        // Execute go.jsx with index parameter
    } else {
        // Try by name directly
        var name = targetName;
        // Execute goByName.jsx with name parameter
    }
    
    "History state found and navigated";
} catch (e) {
    "Error: " + e.toString();
}
```

### Undo Multiple Steps

```javascript
try {
    // Undo multiple steps
    var steps = 3;
    for (var i = 0; i < steps; i++) {
        // Execute undo.jsx or previous.jsx
    }
    
    "Multiple undo steps completed";
} catch (e) {
    "Error: " + e.toString();
}
```

### Suspend History for Batch Operations

```javascript
try {
    // Perform multiple operations as a single history state
    var name = "Batch Resize and Crop";
    var script = `
        // Multiple operations here
        // All will appear as one history state
    `;
    // Execute suspend.jsx with name and script parameters
    
    "Batch operation completed as single history state";
} catch (e) {
    "Error: " + e.toString();
}
```

### Get Current History Position

```javascript
try {
    // 1. Get all history states
    var historyList = /* execute list.jsx */;
    var states = historyList.split(",");
    var totalStates = states.length;
    
    // 2. Get current active history state
    var currentState = app.activeDocument.activeHistoryState;
    var currentIndex = -1;
    for (var i = 0; i < app.activeDocument.historyStates.length; i++) {
        if (app.activeDocument.historyStates[i] === currentState) {
            currentIndex = i;
            break;
        }
    }
    
    // currentIndex is the current position
    // totalStates is the total number of states
    
    "Current history position determined";
} catch (e) {
    "Error: " + e.toString();
}
```

---

## Notes

- History states are 0-based (first state is index 0)
- History state names are typically the action that created them
- Navigating to a history state may discard newer states (depending on Photoshop settings)
- The `suspendHistory` function is useful for batch operations
- History operations may be limited by Photoshop's history preferences
- Some operations may not create history states

---

## Related APIs

- [Document Operations](../photoshop_jsx_document_api.md) - For document-level operations
- [Application Operations](../photoshop_jsx_application_api.md) - For application-level settings
