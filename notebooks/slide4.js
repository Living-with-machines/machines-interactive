function _1(breadCrumb, place, correctCase) {
  return (
    breadCrumb({
      active: "Machines in a place",
      place: place.match(/[a-z]/g).length === place.length ? correctCase[place] : place
    })
  )
}

function _place(wordcloudData, Inputs, html, d3, Event) {
  const m = new Map([["Choose...", "all"], ...Object.keys(wordcloudData.byPlace).map(d => {
    return [d, d.toLowerCase().replace(/\s+/g, "-")]
  })])

  const val = {
    value: window.location.hash ? window.location.hash.slice(1, window.location.hash.length) : "all"
  }
  const elem = Inputs.select(m, val)

  const embedding = html`<div id="data-selector" class="d-flex flex-row">
    <div class="col-8" style="font-size: 1.75vw">
      <div class="input-group input-group-sm mb-3" id="data-selector-group">
        <span class="input-group-text">Select a place to compare</span>
        ${elem}
      </div>
    </div>
  </div>`

  d3.select(embedding).select("select").on("change", function (evt) {
    const chosenText = this.options[this.options.selectedIndex].text;
    embedding.value = chosenText === "Choose..." ? "all" : chosenText;
    embedding.dispatchEvent(new Event("input", { bubbles: true }));
    console.log(embedding.value)
  })

  return Object.assign(html`${embedding}`, val)
}


function _3(d3, Highcharts, selectedData, html) {
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
      width: 1000,
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


  return html`
    <div class="card">
      <div class="card-body">
        ${elem}
      </div>
    </div>
  `
}


function _4(backToMap) {
  return (
    backToMap()
  )
}

function _top() {
  return (
    75
  )
}

async function _selectedData(FileAttachment, place, top, wordcloudData, correctCase) {
  const data = await FileAttachment("wordcloudData@2.json").json();

  let d = undefined
  if (place === "all") {
    d = top ? data.all.slice(0, top) : data.all.slice(0, 500);
  } else {
    d = top && data.byPlace[place] ? data.byPlace[place].slice(0, top) : data.byPlace[place];
    if (!d) {
      const found = wordcloudData.byPlace[correctCase[place]]
      if (found) {
        d = found;
      }
    }
  }

  return d
    .filter(d => d)
    .map(d => ({ name: d.text.trim(), weight: d.size }))
}


function _backToMap(html) {
  return (
    () => html`<footer class="mt-auto">
    <p><a class="me-4 btn btn btn-warning rounded-4 shadow" href="slide3.html">Back to map</a></p>
  </footer>`
  )
}

function _breadCrumb(html) {
  return (
    ({
      active = "",
      place
    } = {}) => html`<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="slide2.html">Explore sample data</a></li>
      <li class="breadcrumb-item" aria-current="page">${active}</li>
      <li class="breadcrumb-item active" aria-current="page">${place === "all" ? "All places" : place}</li>
    </ol>
  </nav>`
  )
}

function _correctCase(wordcloudData) {
  return (
    Object.fromEntries(Object.keys(wordcloudData.byPlace).map(d => [d.toLowerCase().replace(/-/, ""), d]))
  )
}

function _wordcloudData(FileAttachment) {
  return (
    FileAttachment("wordcloudData@2.json").json()
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
    ["wordcloudData@2.json", { url: new URL("./files/31a0e37c393584e5af93abf7abfd4e9be47eb19e8e9a14baa01c1abee16e293a3622c12abe4ebe6e74943d8a128bbcd5e9cb0871922c919d347fa20d76571d9c.json", import.meta.url), mimeType: "application/json", toString }]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["breadCrumb", "place", "correctCase"], _1);
  main.variable(observer("viewof place")).define("viewof place", ["wordcloudData", "Inputs", "html", "d3", "Event"], _place);
  main.variable(observer("place")).define("place", ["Generators", "viewof place"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3", "Highcharts", "selectedData", "html"], _3);
  main.variable(observer()).define(["backToMap"], _4);
  main.variable(observer("top")).define("top", _top);
  main.variable(observer("selectedData")).define("selectedData", ["FileAttachment", "place", "top", "wordcloudData", "correctCase"], _selectedData);
  main.variable(observer("backToMap")).define("backToMap", ["html"], _backToMap);
  main.variable(observer("breadCrumb")).define("breadCrumb", ["html"], _breadCrumb);
  main.variable(observer("correctCase")).define("correctCase", ["wordcloudData"], _correctCase);
  main.variable(observer("wordcloudData")).define("wordcloudData", ["FileAttachment"], _wordcloudData);
  main.variable(observer("Highcharts")).define("Highcharts", ["require"], _Highcharts);
  return main;
}
