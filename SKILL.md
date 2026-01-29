---
name: photoshop-llm-skill
description: Control Adobe Photoshop through LLM conversations by generating and executing JSX scripts. Use when users want to manipulate Photoshop documents, create new documents, edit images, manage layers, apply filters, or perform any Photoshop automation tasks through natural language commands. This skill bridges LLM instructions to Photoshop's JSX scripting API via a local HTTP service.
---

# Photoshop LLM Skill

Control Adobe Photoshop through natural language by generating and executing JSX scripts.

## Overview

This skill enables LLM to control Photoshop by:
1. Generating Photoshop JSX (JavaScript) code based on user requests
2. Sending the JSX code to a local HTTP service running in Photoshop
3. The service executes the JSX script to manipulate Photoshop

## Execution Service

The skill sends JSX code to a local HTTP endpoint:

- **Endpoint**: `http://127.0.0.1:8020/execute`
- **Method**: POST
- **Content-Type**: `application/json`
- **Body**: JSON containing the JSX code (format may vary - see script configuration)

The service runs within Photoshop and executes the JSX scripts to control the application.

**Note**: The request body format depends on your execution service implementation. The default script uses `{"script": jsx_code}`, but you may need to adjust this in `scripts/execute_jsx.py` if your service expects a different format (e.g., `{"code": jsx_code}`, `{"jsx": jsx_code}`, or raw string).

## Workflow

When a user requests Photoshop operations:

1. **Understand the request**: Parse the user's natural language command
2. **Generate JSX code**: Create appropriate Photoshop JSX script
3. **Execute via service**: Use `scripts/execute_jsx.py` to send the code to the execution service
4. **Handle response**: Process any errors or confirmations from the service

## Generating JSX Code

Generate Photoshop JSX code based on user requests. Common operations include:

- **Document creation**: `app.documents.add(width, height, resolution, name, mode)`
- **Layer operations**: Creating, deleting, renaming, moving layers
- **Image manipulation**: Resizing, cropping, rotating, adjusting colors
- **Filter application**: Applying Photoshop filters and effects
- **Selection operations**: Creating and modifying selections
- **File operations**: Opening, saving, closing documents

See `references/photoshop_jsx_api.md` for detailed JSX API reference and examples.

## Executing JSX

Use the provided script to execute JSX code:

```bash
# Install dependencies first
pip install -r scripts/requirements.txt

# Execute JSX from command line
python scripts/execute_jsx.py "<jsx_code>"

# Or execute from file
python scripts/execute_jsx.py -f path/to/script.jsx
```

Or use it programmatically in Python:

```python
from scripts.execute_jsx import execute_jsx

result = execute_jsx(jsx_code)
if result["success"]:
    print("Success:", result["response"])
else:
    print("Error:", result.get("error", result["response"]))
```

The script handles:
- Formatting JSX code as JSON
- Sending POST request to the execution service
- Error handling and response parsing

## JSX Code Format

When generating JSX code:

- Use proper Photoshop JSX syntax
- Wrap code in try-catch blocks for error handling when appropriate
- Include comments for complex operations
- Return meaningful values or status messages when possible

Example JSX structure:

```javascript
try {
    // Create a new document
    var doc = app.documents.add(800, 600, 72, "New Document");
    
    // Perform operations
    // ...
    
    // Return success
    "Operation completed successfully";
} catch (e) {
    "Error: " + e.toString();
}
```

## Error Handling

- If the execution service is unavailable, inform the user to ensure Photoshop is running with the service active
- Parse JSX execution errors and provide meaningful feedback
- Validate JSX syntax before sending when possible

## Common Use Cases

- **Create new document**: Generate JSX to create a document with specified dimensions
- **Edit current document**: Generate JSX to modify the active document
- **Layer management**: Add, remove, rename, or reorder layers
- **Image adjustments**: Apply color corrections, filters, or transformations
- **Batch operations**: Process multiple operations in sequence
