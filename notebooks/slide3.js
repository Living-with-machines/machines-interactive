function _1(breadCrumb) {
  return (
    breadCrumb({ active: "Choose a place" })
  )
}

function _breadCrumb(html) {
  return (
    ({
      active = ""
    } = {}) => html`<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="slide2.html">Explore sample data</a></li>
      <li class="breadcrumb-item active" aria-current="page">${active}</li>
    </ol>
  </nav>`
  )
}

function _3(width, d3, svg, height, ukIreland, turf, geocodedPlaces, Event, DEBUG, $0, html, location, url) {
  const margin = { top: 0, left: -width / 2, right: 0, bottom: 0 }
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
      const _url = `slide4.html#${d.id}`;
      if (DEBUG) {
        $0.value = html`<a href="${_url}">Link</a>`
      } else {
        location.href = _url;
      }
    })

  return SVG.node()
}


function _4(backToStart) {
  return (
    backToStart()
  )
}

function _url(DEBUG, html) {
  return (
    DEBUG ? html`<a href="">Link</a>` : ``
  )
}

function _DEBUG() {
  return (
    false
  )
}

function _height() {
  return (
    800
  )
}

function _backToStart(html) {
  return (
    () => html`<footer class="mt-auto">
    <p><a class="me-4 btn btn btn-warning rounded-4 shadow" href="slide2.html">Back to start</a></p>
  </footer>`
  )
}

function _ukIreland(FileAttachment) {
  return (
    FileAttachment("ukIreland.json").json()
  )
}

function _geocodedPlaces(FileAttachment) {
  return (
    FileAttachment("geocodedPlaces.json").json()
  )
}

function _turf(require) {
  return (
    require("@turf/turf@6")
  )
}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["geocodedPlaces.json", { url: new URL("./files/adcf0e88ac4b86a1b0d66ac205037a8828df8d8654b8756fd20bfd7f6ad15119112ffa96c28d1d973ac99b5be8f6c8cbe7938999819008056d6c85538ab791d1.json", import.meta.url), mimeType: "application/json", toString }],
    ["ukIreland.json", { url: new URL("./files/847b6341846ec79b66c78adfab81f74815fa583a33c595e653b84705a1a4c4fbd9d5b3442e2bbf8381d589650ddcf29666da80b7a4f896276d71cb81d04a5f38.json", import.meta.url), mimeType: "application/json", toString }]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["breadCrumb"], _1);
  main.variable(observer("breadCrumb")).define("breadCrumb", ["html"], _breadCrumb);
  main.variable(observer()).define(["width", "d3", "svg", "height", "ukIreland", "turf", "geocodedPlaces", "Event", "DEBUG", "mutable url", "html", "location", "url"], _3);
  main.variable(observer()).define(["backToStart"], _4);
  main.define("initial url", ["DEBUG", "html"], _url);
  main.variable(observer("mutable url")).define("mutable url", ["Mutable", "initial url"], (M, _) => new M(_));
  main.variable(observer("url")).define("url", ["mutable url"], _ => _.generator);
  main.variable(observer("DEBUG")).define("DEBUG", _DEBUG);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("backToStart")).define("backToStart", ["html"], _backToStart);
  main.variable(observer("ukIreland")).define("ukIreland", ["FileAttachment"], _ukIreland);
  main.variable(observer("geocodedPlaces")).define("geocodedPlaces", ["FileAttachment"], _geocodedPlaces);
  main.variable(observer("turf")).define("turf", ["require"], _turf);
  return main;
}
