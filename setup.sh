#!/bin/bash

slide1v=27
slide2v=33
slide3v=609
slide4v=374
slide5v=136

slide1h=82e833971798fb6a
slide2h=eabf8ab27939911d
slide3h=90f4145dcdc95506
slide4h=9e39c41960fbda2a
slide5h=c2ceaa128d318e96

slide1=https://api.observablehq.com/d/$slide1h@$slide1v.tgz?v=3
slide2=https://api.observablehq.com/d/$slide2h@$slide2v.tgz?v=3
slide3=https://api.observablehq.com/d/$slide3h@$slide3v.tgz?v=3
slide4=https://api.observablehq.com/d/$slide4h@$slide4v.tgz?v=3
slide5=https://api.observablehq.com/d/$slide5h@$slide5v.tgz?v=3

curl -o slide1.tgz $slide1 && rm -rf slide1 && mkdir slide1 && tar -C slide1 -xvzf slide1.tgz && rm slide1.tgz && rm slide1/index.html slide1/index.js slide1/inspector.css slide1/package.json slide1/README.md slide1/runtime.js
curl -o slide2.tgz $slide2 && rm -rf slide2 && mkdir slide2 && tar -C slide2 -xvzf slide2.tgz && rm slide2.tgz && rm slide2/index.html slide2/index.js slide2/inspector.css slide2/package.json slide2/README.md slide2/runtime.js
curl -o slide3.tgz $slide3 && rm -rf slide3 && mkdir slide3 && tar -C slide3 -xvzf slide3.tgz && rm slide3.tgz && rm slide3/index.html slide3/index.js slide3/inspector.css slide3/package.json slide3/README.md slide3/runtime.js
curl -o slide4.tgz $slide4 && rm -rf slide4 && mkdir slide4 && tar -C slide4 -xvzf slide4.tgz && rm slide4.tgz && rm slide4/index.html slide4/index.js slide4/inspector.css slide4/package.json slide4/README.md slide4/runtime.js
curl -o slide5.tgz $slide5 && rm -rf slide5 && mkdir slide5 && tar -C slide5 -xvzf slide5.tgz && rm slide5.tgz && rm slide5/index.html slide5/index.js slide5/inspector.css slide5/package.json slide5/README.md slide5/runtime.js

curl -o static/modules/d3.js 'https://cdn.jsdelivr.net/npm/d3@7'
curl -o static/modules/d3-selection.js 'https://cdn.jsdelivr.net/npm/d3-selection@2'
curl -o static/modules/d3-array.js 'https://cdn.jsdelivr.net/npm/d3-array@3'
curl -o static/modules/d3-hierarchy.js 'https://cdn.jsdelivr.net/npm/d3-hierarchy@3'
curl -o static/modules/d3-geo.js 'https://cdn.jsdelivr.net/npm/d3-geo@3'
curl -o static/modules/d3-scale.js 'https://cdn.jsdelivr.net/npm/d3-scale@6'
curl -o static/modules/d3-delaunay.js 'https://cdn.jsdelivr.net/npm/d3-delaunay@3'
curl -o static/modules/htl.js 'https://cdn.jsdelivr.net/npm/htl@0.3.1'
curl -o static/modules/inputs.js 'https://cdn.jsdelivr.net/npm/@observablehq/inputs@0.10.4'
curl -o static/modules/plot.js 'https://cdn.jsdelivr.net/npm/@observablehq/plot@0.5.2'
curl -o static/modules/lodash.js 'https://cdn.jsdelivr.net/npm/lodash@4.17.21'
curl -o static/modules/moment.js 'https://cdn.jsdelivr.net/npm/moment@2.29.4'
curl -o static/modules/turf.js 'https://cdn.jsdelivr.net/npm/@turf/turf@6.5.0'
curl -o static/modules/highcharts.js 'https://cdn.jsdelivr.net/npm/highcharts@10.2.0/highcharts.js'
curl -o static/modules/highcharts.js.map 'https://cdn.jsdelivr.net/npm/highcharts@10.2.0/highcharts.js.map'
curl -o static/modules/wordcloud.js 'https://cdn.jsdelivr.net/npm/highcharts@10.2.0/modules/wordcloud.js'
curl -o static/modules/wordcloud.js.map 'https://cdn.jsdelivr.net/npm/highcharts@10.2.0/modules/wordcloud.js.map'

curl -o static/core/runtime.js 'https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js'

curl -o static/style/bootstrap.min.css 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css'
curl -o static/style/bootstrap.min.css.map 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css.map'
