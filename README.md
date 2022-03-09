# Chart
Provides Block tool for charts content for the Editor.js. Tool uses Editor.js pasted patterns handling and inserts various charts mentioned on chart.js based pasted data. Data pasted should be upto mark with chart.js data with relative chart type.

## Installation
Install via npm 
```bash
npm install editorjs-chart 
```
or via yarn
```bash
yarn add editorjs-chart
```
Include module at your application

```javascript
import Chart from 'editorjs-chart';
```
## Usage / Example 
Add a new tool to the tools property of EditorJS's initial config

```javascript
var editorjs=new EditorJS({
...
   tools:{
          ...
          chart:Chart
         }
...
});
```
## Input dataset in format of JSON
```javascript
{
    "labels": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "datasets": [{
      "label": "My First Dataset",
      "data": [300, 50, 100],
      "backgroundColor": [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)"
      ],
      "hoverOffset": 4
    }]
  }

```
## Type of chart e.g. bar , pie , bubble, etc.

## Output data

```javascript
{
      "id": "TOhD4DOCu4",
      "data": {
        "text": "{\n  labels: [\n    'Red',\n    'Blue',\n    'Yellow'\n  ],\n  datasets: [{\n    label: 'My First Dataset',\n    data: [300, 50, 100],\n    backgroundColor: [\n      'rgb(255, 99, 132)',\n      'rgb(54, 162, 235)',\n      'rgb(255, 205, 86)'\n    ],\n    hoverOffset: 4\n  }]\n}",
        "caption": "pie",
        "alignment": "center"
      },
      "type": "chart"
    }
```
