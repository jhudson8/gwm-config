gulp-web-modules plugin used to copy build type specific config JSON to the base javascript file

Usage
-----
Your config files should have the name *{build type}.js* in the *config* directory under the project root.  The build type can be *dev.json* or *production.json*
```
    {project root}
    |-- config
        |-- dev.json
        |-- production.json
```

Install
------
Add this plugin to the gulp-web-module reference in your gulpfile
```javascript
    var gulpWebModules = require('gulp-web-modules'),
        gwmConfig = require('gwm-config');

    gulpWebModules({
      plugins: [
        gwmConfig()
      ]
    }).injectTasks(gulp);
```
