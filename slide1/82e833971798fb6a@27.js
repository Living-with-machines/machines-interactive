function _dataFrame(htl){return(
htl.html`<div class="mt-auto">
  <p>What was a machine? Explore real examples from the 1800s</p>
</div>
<div class="mt-auto d-flex flex-column align-items-center pt-5">
  <a class="btn btn-xl btn-warning rounded-4 shadow" href="slide2.html">Touch to explore</a>
</div>`
)}

function _htl(require){return(
require("htl@0.3.1")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("dataFrame")).define("dataFrame", ["htl"], _dataFrame);
  main.variable(observer("htl")).define("htl", ["require"], _htl);
  return main;
}
