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
        var rawDis = lines[i].replace(/^[0-9]*(.*)$/, '$1');
        var dis    = newDistrict(id, rawDis.trim());
        if (rawDis.match(/^\ {4}[^\ ]*$/)) {
            var a = districts.districts.push(dis) - 1;
        } else if (rawDis.match(/^\ {6}[^\ ]*$/)) {
            var b = districts.districts[a].districts.push(dis) - 1;
        } else if (rawDis.match(/^\ {8}[^\ ]*$/)) {
            districts.districts[a].districts[b].districts.push(dis);
        }
    }
    var jsonDistricts = prettyJSON(districts) + '\n';
    console.log(jsonDistricts);
    fs.writeFile(
        'districts.json',
        jsonDistricts,
        function (err) {
            if (err) {
                throw err;
            }
        }
    );
    fs.writeFile(
        'districts.min.json',
        JSON.stringify(districts),
        function (err) {
            if (err) {
                throw err;
            }
        }
    );
    console.log('Done :)');
});
