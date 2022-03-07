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
