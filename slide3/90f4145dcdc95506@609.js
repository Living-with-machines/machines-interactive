function _crumb(htl){return(
htl.html`<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="slide2.html">Explore sample data</a></li>
    <li class="breadcrumb-item" aria-current="page">Machines in a place</li>
    <li class="breadcrumb-item active" aria-current="page">Choose a place</li>
  </ol>
</nav>`
)}

function _dataFrame(d3,htl,width,height,geo,path,locations,rScale,Event,textScale,voronoi,location)
{
  console.log("ƒ dataFrame")
  
  const SVG = d3.select(htl.svg`<svg width=${width} height=${height} viewBox="0,0,${width},${height}" style="max-width:100%;height:auto;">`)

  const p = SVG.append('g')
    .selectAll('path')
  	.data(geo.features)
  	.join("path")
  	.attr("d", path)
    .attr("fill", "#83c8b6");

  const circle = SVG.selectAll("circle")
    .data(locations)
    .join("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", d => rScale(d.count))
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
          -rScale(d.count) - 2 :
          d.placement === "right" ?
          rScale(d.count) + 2 :
          0
    )
    .attr("dy", d => d.placement === "bottom" ?
          rScale(d.count) * 2 + 2:
          d.placement === "top" ?
          -rScale(d.count) - 5:
          rScale(d.count) / 2)
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
    .on("mouseenter", function(evt, d) {      
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
    .on("click", function(evt, d) {
      location.href = `slide4.html#${d.id}`;
    })
  
  return htl.html`
    <div class="card">
      <div class="card-body p-0">
        ${SVG.node()}
      </div>
    </div>`;
}


function _toStart(htl){return(
htl.html`<footer class="mt-auto">
  <p><a class="me-4 btn btn btn-warning rounded-4 shadow" href="slide2.html">Back to start</a></p>
</footer>`
)}

function _margin(){return(
{top: 0, left: -100, right: 0, bottom: 0}
)}

function _projection(d3,margin,width,height,geo){return(
d3.geoMercator()
  .fitExtent([ [margin.left, margin.top], [width-margin.right, height-margin.bottom]], geo)
)}

function _path(d3,projection){return(
d3.geoPath().projection(projection)
)}

function _voronoi(d3,locations,width,height){return(
d3.Delaunay
    .from(locations, d => d.x, d => d.y)
    .voronoi([0, 0, width, height])
)}

function _textScale(d3,locations){return(
d3.scaleSqrt()
    .domain(d3.extent(locations, o => o.count))
    .range([10, 20])
)}

function _rScale(d3,locations){return(
d3.scaleSqrt()
    .domain(d3.extent(locations, o => o.count))
    .range([4, 20])
)}

function _height(){return(
800
)}

function _geo(FileAttachment){return(
FileAttachment("geo.json").json()
)}

function _locations(FileAttachment,projection){return(
FileAttachment("geocodedPlaces.json").json().then(d => d.map(o => Object.assign(o, {
  x: projection([o.lon, o.lat])[0],
  y: projection([o.lon, o.lat])[1],
  fill: "#463b76",
  id: o.place.replace(/\s/g, "-").toLowerCase(),
  placement: o.place === "Denbigh" ? "right" :
    o.place === "Caernarvon" ? "bottom" : 
    o.place === "Manchester" ? "right" : 
    o.place === "Bristol" ? "bottom" : 
    o.place === "Edinburgh" ? "right" :
    o.place === "Leeds" ? "top" :
    "left"
})))
)}

function _d3(require){return(
require("d3@7", "d3-selection@2", "d3-array@3", "d3-geo@3", "d3-delaunay@6", "d3-scale@3")
)}

function _htl(require){return(
require("htl@0.3.1")
)}

function _turf(require){return(
require("@turf/turf@6.5.0")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["geocodedPlaces.json", {url: new URL("./files/adcf0e88ac4b86a1b0d66ac205037a8828df8d8654b8756fd20bfd7f6ad15119112ffa96c28d1d973ac99b5be8f6c8cbe7938999819008056d6c85538ab791d1.json", import.meta.url), mimeType: "application/json", toString}],
    ["geo.json", {url: new URL("./files/34e34227ce9254acc78d34b587135c33683345858b12be0fceaed2e77d27af86c8085c6bfb4cdfcd93a37b760f23252f40b3a1a31c4e075946ffc8ebf8416fe4.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("crumb")).define("crumb", ["htl"], _crumb);
  main.variable(observer("dataFrame")).define("dataFrame", ["d3","htl","width","height","geo","path","locations","rScale","Event","textScale","voronoi","location"], _dataFrame);
  main.variable(observer("toStart")).define("toStart", ["htl"], _toStart);
  main.variable(observer("margin")).define("margin", _margin);
  main.variable(observer("projection")).define("projection", ["d3","margin","width","height","geo"], _projection);
  main.variable(observer("path")).define("path", ["d3","projection"], _path);
  main.variable(observer("voronoi")).define("voronoi", ["d3","locations","width","height"], _voronoi);
  main.variable(observer("textScale")).define("textScale", ["d3","locations"], _textScale);
  main.variable(observer("rScale")).define("rScale", ["d3","locations"], _rScale);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("geo")).define("geo", ["FileAttachment"], _geo);
  main.variable(observer("locations")).define("locations", ["FileAttachment","projection"], _locations);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("htl")).define("htl", ["require"], _htl);
  main.variable(observer("turf")).define("turf", ["require"], _turf);
  return main;
}
