China-Districts
===============

Make JSON Tree of China Districts.

https://www.npmjs.com/package/china-districts


## Node Model
```
{
    id        : [string],
    name      : [string],
    districts : [array]
}
```


## How to use?
```
npm install china-districts
var chinaDistricts = require('china-districts');
console.log(chinaDistricts);
```


## Contribution
```
$ git clone https://github.com/Leask/China-Districts.git
# update the source data in districts.txt
$ node make.js
$ ls districts.js districts.json districts.min.json
# pull request
```


## Data Source
- 数据来源：[中华人民共和国国家统计局](http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/)
- 当前版本：[最新县及县以上行政区划代码（截止2014年10月31日）](http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201504/t20150415_712722.html)
