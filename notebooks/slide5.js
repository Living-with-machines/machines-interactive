function _1(breadCrumb) {
  return (
    breadCrumb({ active: "Machines in a decade" })
  )
}

function _decade(decadeSelector, wordcloudData) {
  return (
    decadeSelector(Object.keys(wordcloudData.byDecade))
  )
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

async function _selectedData(FileAttachment, decade) {
  const data = await FileAttachment("wordcloudData.json").json();

  const d = data.byDecade[decade].slice(0, 250)

  return d
    .filter(d => d)
    .map(d => ({ name: d.text.trim(), weight: d.size }))
}


function _decadeSelector(html) {
  return (
    (decadeList = [1830, 1840, 1850, 1860, 1870, 1880, 1890, 1900, 1910]) => {
      const buttons = decadeList
        .map(decade => html`<button type="button" class="btn btn-light" value="${decade}">${decade}s</button>`);

      const control = html`<div class="btn-group" role="group" aria-label="Select a decade">${buttons}</div>`;
      buttons.forEach(button => {
        button.onclick = (evt) => {
          evt && evt.preventDefault(); // avoid dispatching 'click' event outside
          control.value = +button.value;
          control.dispatchEvent(new CustomEvent('input'));
        }
      })

      // if (!control.value)
      //   control.value = 1830

      return Object.assign(control, {
        value: 1830
      });
    }
  )
}

function _wordcloudData(FileAttachment) {
  return (
    FileAttachment("wordcloudData.json").json()
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

function _backToStart(html) {
  return (
    () => html`<footer class="mt-auto">
    <p><a class="me-4 btn btn btn-warning rounded-4 shadow" href="slide2.html">Back to start</a></p>
  </footer>`
  )
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

async function _Highcharts(require) {
  const Highcharts = await require("highcharts");
  await require("highcharts/modules/wordcloud");

  return Highcharts;
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["wordcloudData.json", { url: new URL("./files/b69156545887e657c70d26ec89cc6df450a301f82c6b66b6b57708b59f0895dde3e7ca6c55bc81ccab770511b309709d90c97e886153f065ad270b48968aac1e.json", import.meta.url), mimeType: "application/json", toString }]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["breadCrumb"], _1);
  main.variable(observer("viewof decade")).define("viewof decade", ["decadeSelector", "wordcloudData"], _decade);
  main.variable(observer("decade")).define("decade", ["Generators", "viewof decade"], (G, _) => G.input(_));
  main.variable(observer()).define(["d3", "Highcharts", "width", "selectedData"], _3);
  main.variable(observer()).define(["backToStart"], _4);
  main.variable(observer("selectedData")).define("selectedData", ["FileAttachment", "decade"], _selectedData);
  main.variable(observer("decadeSelector")).define("decadeSelector", ["html"], _decadeSelector);
  main.variable(observer("wordcloudData")).define("wordcloudData", ["FileAttachment"], _wordcloudData);
  main.variable(observer("breadCrumb")).define("breadCrumb", ["html"], _breadCrumb);
  main.variable(observer("backToStart")).define("backToStart", ["html"], _backToStart);
  main.variable(observer()).define(["htl"], _10);
  main.variable(observer("Highcharts")).define("Highcharts", ["require"], _Highcharts);
  return main;
}
