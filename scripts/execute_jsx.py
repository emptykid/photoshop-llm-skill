#!/usr/bin/env python3
"""
Execute Photoshop JSX code via HTTP service.

This script sends JSX code to the Photoshop execution service
running at http://127.0.0.1:8020/execute
"""

import json
import sys
import requests
from typing import Optional, Dict, Any


EXECUTION_ENDPOINT = "http://127.0.0.1:8020/execute"


def execute_jsx(jsx_code: str, endpoint: str = EXECUTION_ENDPOINT) -> Dict[str, Any]:
    """
    Execute JSX code by sending it to the Photoshop execution service.
    
    Args:
        jsx_code: The Photoshop JSX code to execute
        endpoint: The execution service endpoint URL
        
    Returns:
        Dictionary containing:
            - success: bool indicating if request was successful
            - status_code: HTTP status code
            - response: Response text from the service
            - error: Error message if request failed
            
    Raises:
        requests.RequestException: If the HTTP request fails
    """
    headers = {
        "Content-Type": "application/json",
        "User-Agent": "Photoshop-LLM-Skill/1.0"
    }
    
    # Prepare the request body
    # The exact format depends on what the service expects
    # Common formats: {"code": jsx_code} or {"script": jsx_code} or {"jsx": jsx_code}
    # Using "script" as default based on actual service format
    # If your service expects a different format, modify this section
    body = {
        "script": jsx_code
    }
    
    # Alternative formats (uncomment if needed):
    # body = {"code": jsx_code}
    # body = {"jsx": jsx_code}
    # body = jsx_code  # If service expects raw string
    
    try:
        response = requests.post(
            endpoint,
            headers=headers,
            json=body,
            timeout=30  # 30 second timeout for script execution
        )
        
        result = {
            "success": response.status_code == 200,
            "status_code": response.status_code,
            "response": response.text,
        }
        
        # Try to parse JSON response if possible
        try:
            result["data"] = response.json()
        except (ValueError, json.JSONDecodeError):
            pass
        
        return result
        
    except requests.exceptions.ConnectionError:
        return {
            "success": False,
            "status_code": None,
            "response": None,
            "error": f"Connection failed. Ensure Photoshop is running with the execution service active at {endpoint}"
        }
    except requests.exceptions.Timeout:
        return {
            "success": False,
            "status_code": None,
            "response": None,
            "error": "Request timed out. The JSX script may be taking too long to execute."
        }
    except requests.exceptions.RequestException as e:
        return {
            "success": False,
            "status_code": None,
            "response": None,
            "error": f"Request failed: {str(e)}"
        }


def main():
    """CLI entry point for executing JSX code."""
    if len(sys.argv) < 2:
        print("Usage: execute_jsx.py <jsx_code>")
        print("   or: execute_jsx.py -f <jsx_file>")
        sys.exit(1)
    
    # Check if reading from file
    if sys.argv[1] == "-f" and len(sys.argv) > 2:
        try:
            with open(sys.argv[2], "r", encoding="utf-8") as f:
                jsx_code = f.read()
        except FileNotFoundError:
            print(f"Error: File '{sys.argv[2]}' not found")
            sys.exit(1)
        except Exception as e:
            print(f"Error reading file: {e}")
            sys.exit(1)
    else:
        # Read JSX code from command line argument
        jsx_code = sys.argv[1]
    
    # Execute the JSX code
    result = execute_jsx(jsx_code)
    
    # Print results
    if result["success"]:
        print("✓ Execution successful")
        if "data" in result:
            print(json.dumps(result["data"], indent=2))
        elif result["response"]:
            print(result["response"])
    else:
        print("✗ Execution failed")
        if "error" in result:
            print(f"Error: {result['error']}")
        if result.get("status_code"):
            print(f"Status code: {result['status_code']}")
        if result.get("response"):
            print(f"Response: {result['response']}")
        sys.exit(1)


if __name__ == "__main__":
    main()
