var fs      = require('fs');
var q       = require('q');
var shell   = require('shelljs');

module.exports = {
  /**
   *
   * @function uploadFolders
   * @param {array} folders
   * @returns {promise}
   * @desc Will upload all folders
   * to the destination
   *
   */
  folders: [],
  uploadFolders: function(folders) {
      var el = this;
      el.folders = folders;
      var folder = folders[0];
      el.uploadFolder(folder);
      return true;
  },
  /**
   *
   * @function uploadFolder
   * @param {string} folder
   * @desc Will upload one folder
   * at a time
   *
   */
  uploadFolder: function(folder) {
     var el = this;
     var folders = el.folders;
     if(folders.length > 0) {
       var f = folder;
       console.log('Uploading: ' + f);
       el.scp(f, true);
       el.folders.splice(0, 1);
       el.uploadFolder(el.folders[0]);
     }
     else {
       var m = "Uploaded all folders!";
       console.log(m);
       return true;
     }
  },
  /**
   *
   * @function uploadFiles
   * @param {array} files
   * @desc Will upload all
   * files to the destination
   *
   */
  files: [],
  uploadFiles: function(files) {
     var el = this;
     el.files = files;
     var file = files[0];
     el.uploadFile(file);
     return true;
  },
  /**
   *
   * @function uploadFile
   * @param {string} file
   * @desc Will upload a file
   * to the server
   *
   */
  uploadFile: function(file) {
    var el = this;
    var files = el.files;
    if(files.length > 0) {
      var f = file;
      console.log('Uploading: ' + f);
      el.scp(f, false);
      el.files.splice(0, 1);
      el.uploadFile(file);
    }
    else {
      console.log("Uploaded files");
      return true;
    }
  },
  /**
   *
   * @function setConfig
   * @param {object} config
   * @desc Will set configuration
   * for uploading files
   *
   */
  config: {},
  setConfig: function(config) {
    var el = this;
    el.config = config;
  },
  /**
   *
   * @function scp
   * @param {string} path
   * @param {boolean} isDir
   *
   */
  scp: function(path, isDir) {
    var el = this;
    var config = el.config;
    if(config) {
      var host = config.host;
      var user = config.user;
      var dir = config.destination;
      var local = path;
      var remote = dir + path;
      var scp = user + "@" + host;
      scp += ":" + remote;
      var opts = [];
      if(isDir) {
        opts.push('-r');
      }
      opts.push(local);
      opts.push(scp);
      var s = shell.exec("scp " + opts.join(" "));
    }
    else {
      var m = "Config invalid.";
      console.log(m);
      return false;
    }
  }
}
