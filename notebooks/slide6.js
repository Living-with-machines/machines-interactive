function _1(md) {
  return (
    md`# Testing map as view`
  )
}

function _2(map, wordcloud, htl) {
  return (
    htl.html`<div id="data-content" class="d-flex flex-row align-items-start" style="">
  <div class="card shadow-sm col-12 me-3">
    <div class="card-header">
      Where??
    </div>
    <div class="card-body row m-2">
      <div class="col-8">
        ${map}
      </div>
      <div class="col-4">
        ${wordcloud}
      </div>
    </div>
  </div>
</div>`
  )
}

function _height() {
  return (
    600
  )
}

function _location() {
  return (
    "all"
  )
}

function _map(width, d3, svg, height, ukIreland, turf, geocodedPlaces, Event, $0) {
  const margin = { top: 0, left: -width / 1.5, right: 0, bottom: 0 }
  const latCrop = [49, 57.4];
  const lonCrop = [-15, 2]; // [-7.6, 1.8];

  const SVG = d3
    .select(svg`<svg width=${width} height=${height} viewBox="0,0,${width},${height}" style="max-width:100%;height:auto;">`)

  const projection = d3.geoMercator();

  const o = {
    type: "FeatureCollection",
    features: ukIreland.features
      .map(feature => turf.bboxClip(feature, [lonCrop[0], latCrop[0], lonCrop[1], latCrop[1]]))
  }

  projection.fitExtent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]], o);

  var path = d3.geoPath().projection(projection);

  var locations = geocodedPlaces.slice()

  locations = locations
    .map(o => Object.assign(o, {
      x: projection([o.lon, o.lat])[0],
      y: projection([o.lon, o.lat])[1],
      //r: scale(o.count),
      fill: "#463b76",
      //dx: -scale(o.count) - 2,
      //dy: scale(o.count) / 2,
      id: o.place.replace(/\s/g, "-").toLowerCase(),
      placement: o.place === "Denbigh" ? "right" :
        o.place === "Caernarvon" ? "bottom" :
          o.place === "Manchester" ? "right" :
            o.place === "Bristol" ? "bottom" :
              o.place === "Edinburgh" ? "right" :
                o.place === "Leeds" ? "top" :
                  "left"
    }))

  const scale = d3.scaleSqrt()
    .domain(d3.extent(locations, o => o.count))
    .range([4, 20])

  const textScale = d3.scaleSqrt()
    .domain(d3.extent(locations, o => o.count))
    .range([10, 20])

  const voronoi = d3.Delaunay
    .from(locations, d => d.x, d => d.y)
    .voronoi([0, 0, width, height])

  // Draw each province as a path
  const p = SVG.append('g')
    .selectAll('path')
    .data(o.features)
    .join("path")
    .attr("d", path)
    .attr("fill", "#83c8b6");

  const circle = SVG.selectAll("circle")
    .data(locations)
    .join("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => scale(d.count))
    .attr("id", d => `${d.id}-circle`)
    .attr("fill", d => d.fill)
    .attr("style", "pointer-events: none;")
    .on("click", (evt, d) => {
      const e = new Event("click")
      document.querySelector(`#${d.id}-path`).dispatchEvent(e)
    })

  const text = SVG.selectAll("text")
    .data(locations)
    .join("text")
    .text(d => d.place)
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("font-family", "GT Walsheim, Zen Kaku Gothic New, Century Gothic, sans-serif")
    .attr("font-size", d => textScale(d.count))
    .attr("fill", d => d.fill)
    .attr("id", d => `${d.id}-text`)
    .attr("style", "text-shadow: none;pointer-events: none !important; cursor: pointer !important;")
    .attr("dx", d => d.placement === "left" ?
      -scale(d.count) - 2 :
      d.placement === "right" ?
        scale(d.count) + 2 :
        0
    )
    .attr("dy", d => d.placement === "bottom" ?
      scale(d.count) * 2 + 2 :
      d.placement === "top" ?
        -scale(d.count) - 5 :
        scale(d.count) / 2)
    .attr("text-anchor", d => d.placement === "left" ?
      "end" :
      d.placement === "right" ?
        "start" :
        "middle")

  SVG.selectAll("path.voronoi")
    .data(locations)
    .join("path")
    .attr("d", (d, i) => voronoi.renderCell(i))
    .attr("fill", "rgba(255,255,255,0)")
    .classed("voronoi", true)
    .attr("stroke-width", "0px")
    .attr("stroke", "none")
    .attr("pointer-events", "all")
    .attr("id", d => `${d.id}-path`)
    .on("mouseenter", function (evt, d) {
      d3.selectAll("text[id$='-text']")
        .attr("font-weight", "normal")
        .attr("fill", d => d.fill)
        .attr("style", "text-shadow: none;pointer-events: none !important; cursor: pointer !important;")

      d3.selectAll("circle[id$='-circle']")
        .attr("fill", d => d.fill)
        .attr("style", "none")

      d3.select(`#${d.id}-text`)
        .attr("font-weight", "bold")
        .attr("fill", "#f9b233")
        .attr("style", "text-shadow: 0px 0px 3px #000000, 0px 2px 0px rgb(0 0 0 / 15%);pointer-events: none !important; cursor: pointer !important;")
        .raise()

      d3.select(`#${d.id}-circle`)
        .attr("fill", "#f9b233")
        .attr("style", "-webkit-filter: drop-shadow( 1px 1px 2px rgba(0, 0, 0, .7)); filter: drop-shadow( 1px 1px 2px rgba(0, 0, 0, .7));")
        .raise()
    })
    .on("click", function (evt, d) {
      $0.value = d.id
    })

  return SVG.node()
}


function _top() {
  return (
    20
  )
}

async function _selectedData(FileAttachment, $0, top, wordcloudData) {
  const data = await FileAttachment("wordcloudData.json").json();

  let d = undefined
  const location = $0.value

  if (location === "all") {
    d = data.all.slice(0, top);
  } else {
    d = top && data.byPlace[location] ? data.byPlace[location].slice(0, top) : data.byPlace[location];
    if (!d) {
      const found = Object.keys(wordcloudData.byPlace).filter(d => d.toLowerCase().replace(/ /g, "-") === location)
      if (found) {
        d = top ? data.byPlace[found[0]].slice(0, top) : data.byPlace[found[0]];
      }
    }
  }

  return d
    .filter(d => d)
    .map(d => ({ name: d.text.trim(), weight: d.size }))
}


function _wordcloudData(FileAttachment) {
  return (
    FileAttachment("wordcloudData.json").json()
  )
}

function _wordcloud(d3, Highcharts, width, selectedData) {
  const elem = d3.create("div").attr("id", "wordcloud-container").node()

  Highcharts.seriesTypes.wordcloud.prototype.deriveFontSize = function (relativeWeight) {
    var maxFontSize = 75;

    return Math.floor(maxFontSize * relativeWeight) + 20;
  };

  Highcharts.chart(elem, {
    plotOptions: {
      wordcloud: {
        animation: true,
        rotation: 0,
        animation: {
          duration: 250
        }
      }
    },

    chart: {
      height: 600,
      width,
      events: {
        load: function () {
          var allSeries = this.series,
            noBreakSpace = String.fromCharCode(0xA0),
            WordCloudSeries = Highcharts.seriesTypes.wordcloud,
            data, options, point, series, spacing, wordSpaces;

          for (var i = 0, ie = allSeries.length; i < ie; ++i) {
            series = allSeries[i];
            if (!(series instanceof WordCloudSeries)) continue;
            options = series.options;
            wordSpaces = (options.wordSpaces || 0);
            if (!wordSpaces) continue;
            data = options.data.slice();
            spacing = '';
            while (wordSpaces--) spacing += noBreakSpace;
            for (var j = 0, je = data.length; j < je; ++j) {
              point = data[j];
              point.name = spacing + point.name + spacing;
            }
            series.setData(data);
          }
        }
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      type: 'wordcloud',
      spiral: 'archimedean',
      data: selectedData.slice(),
      name: 'Occurrences',
      placementStrategy: 'center',
      wordSpaces: 3
    }],
    title: {
      text: null
    },
  });

  d3.select(elem).select("svg").selectAll("text").attr("style", function () {
    return d3.select(this)
      .attr("style").replace("font-family: sans-serif;",
        `font-family: "GT Walsheim", "Zen Kaku Gothic New", 'Century Gothic', sans-serif !important;`)
  })


  return elem
}


function _ukIreland(FileAttachment) {
  return (
    FileAttachment("uk-ireland.geojson").json()
  )
}

function _turf(require) {
  return (
    require("@turf/turf@6")
  )
}

function _geocodedPlaces(FileAttachment) {
  return (
    FileAttachment("geocodedPlaces.json").json()
  )
}

async function _Highcharts(require) {
  const Highcharts = await require("highcharts");
  await require("highcharts/modules/wordcloud");

  return Highcharts;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["uk-ireland.geojson", { url: new URL("./files/04f392513c5eca238bc889367557b196c3cf6f9a758e53f4cf57854a0d9bd659d93c912a9202df32bcdbce7caf89befbb29dd86105047dc5df3692d8209b8fca.geojson", import.meta.url), mimeType: "application/geo+json", toString }],
    ["geocodedPlaces.json", { url: new URL("./files/f37691f49d5976ae2446fe4968642162c9a1b0df9775f1de86e596ccfee50185d8729683950b1f6240461bf771f83b04a2e38cd57087f244d0978c0eb03c10cb.json", import.meta.url), mimeType: "application/json", toString }],
    ["wordcloudData.json", { url: new URL("./files/fe74ff9ae8418bbd4cf8aba05aec06597cee54a95d23a5cb9123ffa6d2800a45df67211a5b5740a03872a3cd5ecadda73b3c43e4ded0a8267cc2e88f8e0f995b.json", import.meta.url), mimeType: "application/json", toString }]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["map", "wordcloud", "htl"], _2);
  main.variable(observer("height")).define("height", _height);
  main.define("initial location", _location);
  main.variable(observer("mutable location")).define("mutable location", ["Mutable", "initial location"], (M, _) => new M(_));
  main.variable(observer("location")).define("location", ["mutable location"], _ => _.generator);
  main.variable(observer("map")).define("map", ["width", "d3", "svg", "height", "ukIreland", "turf", "geocodedPlaces", "Event", "mutable location"], _map);
  main.variable(observer("top")).define("top", _top);
  main.variable(observer("selectedData")).define("selectedData", ["FileAttachment", "mutable location", "top", "wordcloudData"], _selectedData);
  main.variable(observer("wordcloudData")).define("wordcloudData", ["FileAttachment"], _wordcloudData);
  main.variable(observer("wordcloud")).define("wordcloud", ["d3", "Highcharts", "width", "selectedData"], _wordcloud);
  main.variable(observer("ukIreland")).define("ukIreland", ["FileAttachment"], _ukIreland);
  main.variable(observer("turf")).define("turf", ["require"], _turf);
  main.variable(observer("geocodedPlaces")).define("geocodedPlaces", ["FileAttachment"], _geocodedPlaces);
  main.variable(observer("Highcharts")).define("Highcharts", ["require"], _Highcharts);
  return main;
}
