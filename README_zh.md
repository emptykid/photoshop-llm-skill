# Photoshop LLM Skill

<div align="center">

**🎨 用大语言模型控制 Photoshop**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[English](README.md) | 中文

</div>

---

### 📖 项目简介

Photoshop LLM Skill 是一个智能自动化框架，使大型语言模型（LLM）能够控制和操作 Adobe Photoshop。通过将自然语言理解与 Photoshop 强大的 API 相结合，该项目允许用户通过简单的对话命令执行复杂的图像编辑任务。

### ✨ 特性

- 🤖 **自然语言控制**：使用简单的中英文命令与 Photoshop 交互
- 🔌 **LLM 集成**：兼容主流 LLM 平台（OpenAI、Claude 等）
- 🎯 **任务自动化**：通过简单指令执行复杂工作流
- 🛠️ **可扩展架构**：轻松添加自定义技能和命令
- 📚 **丰富文档**：提供全面的指南和示例

### 🎬 演示

点击下方视频即可播放：

<p align="center">
  <video src="https://github.com/emptykid/photoshop-llm-skill/raw/main/sample.mp4" controls width="640" style="max-width:100%;">
    您的浏览器不支持视频播放。<a href="https://github.com/emptykid/photoshop-llm-skill/raw/main/sample.mp4">下载 sample.mp4</a>
  </video>
</p>

### 🚀 快速开始

#### 前置要求

- Adobe Photoshop（2020 或更高版本）
- Node.js（v14+）或 Python（3.8+）
- 你所选择的 LLM 服务提供商的 API 密钥

#### 项目依赖

本项目依赖一个 **Photoshop 通信模块**，以便 LLM 能够与 Photoshop 通信并操控它。请从以下地址下载并安装 [photoshop-manipulate-bridge](https://github.com/emptykid/photoshop-manipulate-bridge) 插件：

- **下载与安装**：[https://github.com/emptykid/photoshop-manipulate-bridge](https://github.com/emptykid/photoshop-manipulate-bridge)

该插件以 Generator 形式运行于 Photoshop 内，并启动 HTTP 服务（默认端口 8020），提供执行 JSX 和控制 Photoshop 的 API。安装并启用后，本 skill 即可通过该桥接与 Photoshop 通信。

#### 安装

```bash
# 克隆仓库
git clone https://github.com/emptykid/photoshop-llm-skill.git
cd photoshop-llm-skill

# 安装依赖
# (随着项目开发，安装命令将会添加)
```

#### 基本使用

```bash
# 随着功能的实现，将提供使用示例
```

### 📋 开发路线

- [ ] 核心 LLM-Photoshop 桥接实现
- [ ] 基础图像处理命令
- [ ] 图层管理功能
- [ ] 滤镜和效果应用
- [ ] 批处理能力
- [ ] 自定义技能插件系统
- [ ] Web 交互界面

### 🤝 参与贡献

欢迎贡献！请随时提交 Pull Request。对于重大更改，请先开 issue 讨论您想要更改的内容。

### 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

### 🙏 致谢

- Adobe Photoshop 脚本 API
- 开源 LLM 社区

---

<div align="center">

Made with ❤️ by emptykid

</div>
