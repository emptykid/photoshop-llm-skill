# Photoshop JSX Scripts

本目录包含从 `src/lib` TypeScript 模块转换而来的纯 JSX 脚本。每个模块对应一个子目录，每个函数对应一个独立的 `.jsx` 文件。

## 目录结构

```
scripts/
├── document/      # Document 文档操作
├── application/   # Application 应用操作
├── layer/         # Layer 图层操作
├── guide/         # Guide 参考线
├── history/       # History 历史记录
├── selection/     # Selection 选区
├── colorSampler/  # ColorSampler 颜色取样器
├── rect/          # Rect 矩形工具
├── artboard/      # Artboard 画板
└── utils/         # Utils 工具函数
```

## 使用方式

### 无参数脚本

直接执行或通过 `$.evalFile()` 调用，返回值即脚本最后一行表达式的值：

```jsx
// 获取当前文档名称
var name = $.evalFile(new File("scripts/document/name.jsx"));

// 获取当前文档尺寸（像素）
var size = $.evalFile(new File("scripts/document/size.jsx"));
// size => { width: 1920, height: 1080 }
```

### 带参数脚本

在调用前设置全局变量，再执行脚本：

```jsx
// 保存文档为 PSD
filePath = "~/Desktop/output.psd";
format = "photoshop35Format";
saveAsCopy = false;
$.evalFile(new File("scripts/document/saveAs.jsx"));

// 创建选区（矩形：left, top, right, bottom）
left = 0;
top = 0;
right = 100;
bottom = 100;
$.evalFile(new File("scripts/document/setSelection.jsx"));
```

### 文档相关脚本

多数 `document/` 下脚本针对**当前活动文档**（`app.activeDocument`）。需要操作指定文档时，先执行 `scripts/document/select.jsx` 并传入 `docId`，或先激活目标文档。

## 参数说明

各脚本文件顶部以注释标明了所需全局参数，例如：

- `scripts/document/create.jsx`：`name`, `width`, `height`, `density`, `artboard`, `background`
- `scripts/document/crop.jsx`：`x`, `y`, `right`, `bottom`（矩形像素坐标）
- `scripts/layer/name.jsx`：`layerId`（图层 ID）

未传参数时，脚本内会使用默认值（见各文件注释）。

## 示例：获取文档文件大小

```jsx
var result = $.evalFile(new File("scripts/document/length.jsx"));
// result 为当前文档对应文件的字节数，未保存或无法读取时为 0
```
