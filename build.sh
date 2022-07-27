#!/bin/bash

slide1v=27
slide2v=33
slide3v=609
slide4v=374
slide5v=136

BRANCH=main
BUILD_BRANCH=build

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

rm -rf build

mkdir build
mkdir build/static
mkdir .temp

cp ./components/index.html build
cp ./components/slide2.html build
cp ./components/slide3.html build
cp ./components/slide4.html build
cp ./components/slide5.html build
cp -r ./components/static build

curl -o .temp/1.tgz $slide1 && mkdir build/slide1 && tar -C build/slide1 -xvzf .temp/1.tgz && rm build/slide1/index.html build/slide1/index.js build/slide1/inspector.css build/slide1/package.json build/slide1/README.md build/slide1/runtime.js
curl -o .temp/2.tgz $slide2 && mkdir build/slide2 && tar -C build/slide2 -xvzf .temp/2.tgz && rm build/slide2/index.html build/slide2/index.js build/slide2/inspector.css build/slide2/package.json build/slide2/README.md build/slide2/runtime.js
curl -o .temp/3.tgz $slide3 && mkdir build/slide3 && tar -C build/slide3 -xvzf .temp/3.tgz && rm build/slide3/index.html build/slide3/index.js build/slide3/inspector.css build/slide3/package.json build/slide3/README.md build/slide3/runtime.js
curl -o .temp/4.tgz $slide4 && mkdir build/slide4 && tar -C build/slide4 -xvzf .temp/4.tgz && rm build/slide4/index.html build/slide4/index.js build/slide4/inspector.css build/slide4/package.json build/slide4/README.md build/slide4/runtime.js
curl -o .temp/5.tgz $slide5 && mkdir build/slide5 && tar -C build/slide5 -xvzf .temp/5.tgz && rm build/slide5/index.html build/slide5/index.js build/slide5/inspector.css build/slide5/package.json build/slide5/README.md build/slide5/runtime.js

curl -o build/static/modules/d3.js 'https://cdn.jsdelivr.net/npm/d3@7'
curl -o build/static/modules/d3-selection.js 'https://cdn.jsdelivr.net/npm/d3-selection@2'
curl -o build/static/modules/d3-array.js 'https://cdn.jsdelivr.net/npm/d3-array@3'
curl -o build/static/modules/d3-hierarchy.js 'https://cdn.jsdelivr.net/npm/d3-hierarchy@3'
curl -o build/static/modules/d3-geo.js 'https://cdn.jsdelivr.net/npm/d3-geo@3'
curl -o build/static/modules/d3-scale.js 'https://cdn.jsdelivr.net/npm/d3-scale@6'
curl -o build/static/modules/d3-delaunay.js 'https://cdn.jsdelivr.net/npm/d3-delaunay@3'
curl -o build/static/modules/htl.js 'https://cdn.jsdelivr.net/npm/htl@0.3.1'
curl -o build/static/modules/inputs.js 'https://cdn.jsdelivr.net/npm/@observablehq/inputs@0.10.4'
curl -o build/static/modules/plot.js 'https://cdn.jsdelivr.net/npm/@observablehq/plot@0.5.2'
curl -o build/static/modules/lodash.js 'https://cdn.jsdelivr.net/npm/lodash@4.17.21'
curl -o build/static/modules/moment.js 'https://cdn.jsdelivr.net/npm/moment@2.29.4'
curl -o build/static/modules/turf.js 'https://cdn.jsdelivr.net/npm/@turf/turf@6.5.0'
curl -o build/static/modules/highcharts.js 'https://cdn.jsdelivr.net/npm/highcharts@10.2.0/highcharts.js'
curl -o build/static/modules/highcharts.js.map 'https://cdn.jsdelivr.net/npm/highcharts@10.2.0/highcharts.js.map'
curl -o build/static/modules/wordcloud.js 'https://cdn.jsdelivr.net/npm/highcharts@10.2.0/modules/wordcloud.js'
curl -o build/static/modules/wordcloud.js.map 'https://cdn.jsdelivr.net/npm/highcharts@10.2.0/modules/wordcloud.js.map'

curl -o build/static/core/runtime.js 'https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js'

curl -o build/static/style/bootstrap.min.css 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css'
curl -o build/static/style/bootstrap.min.css.map 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css.map'

rm -rf .temp

# git checkout $BUILD_BRANCH
# git add *
# git commit -m "Build $now"
# git push
# git checkout $BRANCH