function _crumb(htl,decade){return(
htl.html`<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="slide2.html">Explore sample data</a></li>
    <li class="breadcrumb-item" aria-current="page">Machines in a decade</li>
    <li class="breadcrumb-item active" aria-current="page">${decade}s</li>
  </ol>
</nav>`
)}

function _decade(decadeSelector,wordcloudData){return(
decadeSelector(Object.keys(wordcloudData.byDecade))
)}

function _dataFrame(d3,Highcharts,selectedData,htl)
{
  console.log("ƒ dataFrame")
  const elem = d3.create("div")
    .attr("id", "wordcloud-container")
    .node()
  
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
        width: 1000,
        events: {
            load: function() {
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
  
  return htl.html`
    <div class="card">
      <div class="card-body">
        ${elem}
      </div>
    </div>
  `
}


function _toStart(htl){return(
htl.html`<footer class="mt-auto">
  <p><a class="me-4 btn btn btn-warning rounded-4 shadow" href="slide2.html">Back to start</a></p>
</footer>`
)}

async function _selectedData(FileAttachment,decade)
{
  const data = await FileAttachment("wordcloudData@2.json").json();
  
  const d = data.byDecade[decade].slice(0, 75);
  
  return d
    .filter(d => d)
    .map(d => ({name: d.text.trim(), weight: d.size}))
}


function _decadeSelector(htl){return(
(decadeList=[1830, 1840, 1850, 1860, 1870, 1880, 1890, 1900, 1910]) => {
  const buttons = decadeList
    .map(decade => htl.html`<button type="button" class="btn btn-light" value="${decade}">${decade}s</button>`);
  
  const control = htl.html`<div class="btn-group" role="group" aria-label="Select a decade">${buttons}</div>`;
  buttons.forEach(button => {
    button.onclick = (evt) => {
      evt && evt.preventDefault(); // avoid dispatching 'click' event outside
      control.value = +button.value;
      control.dispatchEvent(new CustomEvent('input'));
    }
  })

  return Object.assign(control, {
    value: decadeList[0]
  });
}
)}

function _wordcloudData(FileAttachment){return(
FileAttachment("wordcloudData@2.json").json()
)}

function _htl(require){return(
require("htl@0.3.1")
)}

function _d3(require){return(
require("d3@7", "d3-selection@2")
)}

function _Inputs(require){return(
require("@observablehq/inputs@0.10.4")
)}

function _wordcloud(require){return(
require("highcharts@10.2.0/modules/wordcloud")
)}

async function _Highcharts(require)
{
  const Highcharts = await require("highcharts@10.2.0");
  console.log("Highcharts", Highcharts)
  await require("highcharts@10.2.0/modules/wordcloud.js");
  
  return Highcharts; 
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["wordcloudData@2.json", {url: new URL("./files/31a0e37c393584e5af93abf7abfd4e9be47eb19e8e9a14baa01c1abee16e293a3622c12abe4ebe6e74943d8a128bbcd5e9cb0871922c919d347fa20d76571d9c.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("crumb")).define("crumb", ["htl","decade"], _crumb);
  main.variable(observer("viewof decade")).define("viewof decade", ["decadeSelector","wordcloudData"], _decade);
  main.variable(observer("decade")).define("decade", ["Generators", "viewof decade"], (G, _) => G.input(_));
  main.variable(observer("dataFrame")).define("dataFrame", ["d3","Highcharts","selectedData","htl"], _dataFrame);
  main.variable(observer("toStart")).define("toStart", ["htl"], _toStart);
  main.variable(observer("selectedData")).define("selectedData", ["FileAttachment","decade"], _selectedData);
  main.variable(observer("decadeSelector")).define("decadeSelector", ["htl"], _decadeSelector);
  main.variable(observer("wordcloudData")).define("wordcloudData", ["FileAttachment"], _wordcloudData);
  main.variable(observer("htl")).define("htl", ["require"], _htl);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("Inputs")).define("Inputs", ["require"], _Inputs);
  main.variable(observer("wordcloud")).define("wordcloud", ["require"], _wordcloud);
  main.variable(observer("Highcharts")).define("Highcharts", ["require"], _Highcharts);
  return main;
}
