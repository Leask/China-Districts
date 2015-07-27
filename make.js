var fs  = require('fs');

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

function prettyJSON(obj) {
    return JSON.stringify(obj, null, 2);
}

function newDistrict(id, name) {
    return {id: id, name: name, districts: []};
}

fs.readFile('districts.txt', 'utf8', function (err, data) {
    if (err) {
        throw err;
    }
    var lines     = data.split('\n');
    var districts = newDistrict('0086', '中华人民共和国');
    var a = 0, b = 0;
    for (var i in lines) {
        if (!lines[i]) {
            continue;
        }
        var id     = lines[i].replace(/^([0-9]*).*$/, '$1');
        var rawDis = lines[i].replace(/^[0-9]*(.*)$/, '$1')
                             .replace(/　/g, 't')
                             .replace(/\ *\ {12}([^\ ]*)/g, 'ttt$1')
                             .trim();
        var dis    = newDistrict(id, rawDis.replace(/^t*/g, '').trim());
        if (rawDis.match(/^t{1}[^t]*$/)) {
            var a = districts.districts.push(dis) - 1;
        } else if (rawDis.match(/^t{2}[^t]*$/)) {
            var b = districts.districts[a].districts.push(dis) - 1;
        } else if (rawDis.match(/^t{3}[^t]*$/)) {
            districts.districts[a].districts[b].districts.push(dis);
        }
    }
    var districtsJson    = prettyJSON(districts);
    var districtsJsonMin = JSON.stringify(districts);
    var districtsJs      = "'use strict';\n\n"
                         + 'var districts = ' + districtsJson + ';\n\n'
                         + 'module.exports = districts;';
    console.log(districtsJson + '\n');
    fs.writeFile(
        'districts.json',
        districtsJson + '\n',
        function (err) {
            if (err) {
                throw err;
            }
        }
    );
    fs.writeFile(
        'districts.min.json',
        districtsJsonMin + '\n',
        function (err) {
            if (err) {
                throw err;
            }
        }
    );
    fs.writeFile(
        'districts.js',
        districtsJs + '\n',
        function (err) {
            if (err) {
                throw err;
            }
        }
    );
    console.log('Done :)');
});
