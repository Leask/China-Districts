China-Districts
===============

Make JSON Tree of China Districts.

## Node Model
```
{
    id        : [string],
    name      : [string],
    districts : [array]
}
```


## Data Source
中华人民共和国国家统计局
http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/

当前数据版本《最新县及县以上行政区划代码（截止2014年10月31日）》
http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/201504/t20150415_712722.html


## How to use?
```
$ node make.js
$ ls districts.js districts.json districts.min.json
```
