var fs        = require('fs');
var path      = require('path');
var directory = path.resolve();

function getDirectories(p) {
  return fs.readdirSync(p).filter(function(file) {
    return fs.statSync(path.join(p, file)).isDirectory();
  });
}

function getFiles(p) {
  return fs.readdirSync(p).filter(function(file) {
    return fs.statSync(path.join(p, file)).isFile();
  });
}

module.exports = {
    questions: [
        {
            type: "input",
            name: "host",
            message: "What is the destination ip? (127.0.0.1)"
        },
        {
            type: "input",
            name: "destination",
            message: "What is the destination directory? (/var/www/html)",
            default: "/var/www/html/"
        },
        {
            type: "input",
            name: "user",
            message: "What is the user? (root)",
            default: "root"
        },
        {
            type: "checkbox",
            name: "directories",
            message: "What directories to include?",
            choices: getDirectories(directory)
        },
        {
            type: "checkbox",
            name: "files",
            message: "What files to include?",
            choices: getFiles(directory)
        }
    ]
};
