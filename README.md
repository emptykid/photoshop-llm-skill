# Photoshop LLM Skill

<div align="center">

**🎨 Control Photoshop with Large Language Models**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[English](README.md) | [中文](README_zh.md)

</div>

---

### 📖 Overview

Photoshop LLM Skill is an intelligent automation framework that enables Large Language Models (LLMs) to control and manipulate Adobe Photoshop. By bridging natural language understanding with Photoshop's powerful APIs, this project allows users to perform complex image editing tasks through simple conversational commands.

### ✨ Features

- 🤖 **Natural Language Control**: Interact with Photoshop using plain English commands
- 🔌 **LLM Integration**: Compatible with popular LLM platforms (OpenAI, Claude, etc.)
- 🎯 **Task Automation**: Execute complex workflows with simple instructions
- 🛠️ **Extensible Architecture**: Easy to add custom skills and commands
- 📚 **Rich Documentation**: Comprehensive guides and examples

### 🎬 Demo

**Click to play:** [**▶ sample.mp4**](https://github.com/emptykid/photoshop-llm-skill/raw/main/sample.mp4) (opens in new tab)

> GitHub does not embed `<video>` or MP4 in README. To show a playable player here, edit this file on GitHub, drag `sample.mp4` into the editor, and use the URL GitHub gives you (e.g. `https://github.com/user-attachments/assets/...`).

### 🚀 Quick Start

#### Prerequisites

- Adobe Photoshop (2020 or later)
- Node.js (v14+) or Python (3.8+)
- An API key from your preferred LLM provider

#### Project Dependencies

This project depends on a **Photoshop communication module** so that the LLM can talk to and control Photoshop. You need to download and install the [photoshop-manipulate-bridge](https://github.com/emptykid/photoshop-manipulate-bridge) plugin:

- **Download & install**: [https://github.com/emptykid/photoshop-manipulate-bridge](https://github.com/emptykid/photoshop-manipulate-bridge)

The plugin runs inside Photoshop as a Generator and starts an HTTP server (default port 8020), exposing APIs for executing JSX and controlling Photoshop. Once installed and enabled, this skill can communicate with Photoshop through that bridge.

#### Installation

```bash
# Clone the repository
git clone https://github.com/emptykid/photoshop-llm-skill.git
cd photoshop-llm-skill

# Install dependencies
# (Installation commands will be added as the project develops)
```

#### Basic Usage

```bash
# Example usage will be provided as features are implemented
```

### 📋 Roadmap

- [ ] Core LLM-Photoshop bridge implementation
- [ ] Basic image manipulation commands
- [ ] Layer management features
- [ ] Filter and effect application
- [ ] Batch processing capabilities
- [ ] Plugin system for custom skills
- [ ] Web interface for easier interaction

### 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🙏 Acknowledgments

- Adobe Photoshop Scripting API
- The open-source LLM community

---

<div align="center">

Made with ❤️ by emptykid

</div>
