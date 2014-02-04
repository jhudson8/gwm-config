var fs = require('fs'),
    es = require('event-stream');

module.exports = function() {

  return {
    javascript: {
      afterMergeBase: function(options, pipeline) {
        var type = options.buildType,
            configFileName = './config/' + type + '.json',
            fileData = '{}',
            successCallback,
            errorText;

        // load the config file
        if (fs.existsSync(configFileName)) {
          fs.readFile(configFileName, {encoding: 'utf-8'}, function(err, data) {
            if (err) {
              errorText
            } else {
              fileData = data;
            }
            successCallback && successCallback();
            successCallback = true;
          });
        }

         return pipeline.pipe(es.map(function (file, cb) {
          function onLoadedFiles() {
            if (errorText) {
              cb('could not load file: ' + errorText, file);
            } else {
              file.contents = Buffer.concat([new Buffer('global.config = ' + fileData + ';\n'), file.contents]);
              cb(null, file);
            }
          }

          // there will only be a single file in this stream so we're using successCallback as a flag if we've fully loaded
          if (successCallback) {
            onLoadedFiles();
          } else {
            successCallback = onLoadedFiles;
          }
        }));
      }
    }
  };
};
