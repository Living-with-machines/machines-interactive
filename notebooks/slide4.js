function _1(breadCrumb, place) {
  return (
    breadCrumb({ active: "Machines in a place", place })
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


function _3(d3, Highcharts, width, selectedData) {
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
      height: 800,
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


function _4(backToStart) {
  return (
    backToStart()
  )
}

async function _selectedData(FileAttachment, place, wordcloudData) {
  const data = await FileAttachment("wordcloudData.json").json();

  let d = undefined
  if (place === "all") {
    d = data.all.slice(0, 500)
  } else {
    d = data.byPlace[place]
    if (!d) {
      const found = Object.keys(wordcloudData.byPlace).filter(d => d.toLowerCase().replace(/ /g, "-") === place)
      if (found) {
        d = data.byPlace[found[0]]
      }
    }
  }

  return d
    .filter(d => d)
    .map(d => ({ name: d.text.trim(), weight: d.size }))
}


function _backToStart(html) {
  return (
    () => html`<footer class="mt-auto">
    <p><a class="me-4 btn btn btn-warning rounded-4 shadow" href="slide2.html">Back to start</a></p>
  </footer>`
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

function _wordcloudData(FileAttachment) {
  return (
    FileAttachment("wordcloudData.json").json()
  )
}

async function _Highcharts(require) {
  const Highcharts = await require("highcharts");
  await require("highcharts/modules/wordcloud");

  return Highcharts;
}


function _10(htl) {
  return (
    htl.html`<style>
  .highcharts-color-0,
  .highcharts-color-1,
  .highcharts-color-2,
  .highcharts-color-3,
  .highcharts-color-4,
  .highcharts-color-5,
  .highcharts-color-6,
  .highcharts-color-7,
  .highcharts-color-8,
  .highcharts-color-9 {
    fill: black !important;
  }
  </style>`
  )
}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["wordcloudData.json", { url: new URL("./files/b69156545887e657c70d26ec89cc6df450a301f82c6b66b6b57708b59f0895dde3e7ca6c55bc81ccab770511b309709d90c97e886153f065ad270b48968aac1e.json", import.meta.url), mimeType: "application/json", toString }]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["breadCrumb", "place"], _1);
  main.variable(observer("viewof place")).define("viewof place", ["wordcloudData", "Inputs", "html", "d3", "Event"], _place);
  main.variable(observer("place")).define("place", ["Generators", "viewof place"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3", "Highcharts", "width", "selectedData"], _3);
  main.variable(observer()).define(["backToStart"], _4);
  main.variable(observer("selectedData")).define("selectedData", ["FileAttachment", "place", "wordcloudData"], _selectedData);
  main.variable(observer("backToStart")).define("backToStart", ["html"], _backToStart);
  main.variable(observer("breadCrumb")).define("breadCrumb", ["html"], _breadCrumb);
  main.variable(observer("wordcloudData")).define("wordcloudData", ["FileAttachment"], _wordcloudData);
  main.variable(observer("Highcharts")).define("Highcharts", ["require"], _Highcharts);
  main.variable(observer()).define(["htl"], _10);
  return main;
}
