const fs = require('fs');

var path = process.argv[2];

function getFiles(path) {
    var tree = {
        files: [],
        dirs: []
    };
    var list = fs.readdirSync(path);
    list.forEach(function(file) {
        let formatPath = path == './' ? file : path + '/' + file;
        var stat = fs.statSync(formatPath);
        if (stat && stat.isDirectory()) { 
            tree.dirs.push(formatPath);
            let app = getFiles(formatPath);
            tree.files = tree.files.concat(app.files);
            tree.dirs = tree.dirs.concat(app.dirs);
        } else { 
            tree.files.push(formatPath);
        }
    });
    return tree;
}

console.log(JSON.stringify(getFiles(path)));