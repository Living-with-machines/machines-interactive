function _1(htl) {
  return (
    htl.html`<div class="mt-auto">
  <p class="mb-5"><em>Quick, think of a machine!</em></p>
  <p style="font-size:80%" class="mb-4">Maybe you pictured a <b>car</b>, a <b>robot</b>, a <b>computer</b>? You probably didn’t picture a <em>pram</em>, or a <em>weighing machine</em>.</p>
  <p style="font-size:80%"class="mb-4">People in the 1800s had to get used to machines. We looked at old newspapers to see what they meant when they mentioned ‘machines’.</p>
</div>
<div class="mt-auto d-flex flex-column align-items-center">
  <div>
    <a class="btn btn-xl btn-warning rounded-4 shadow" href="slide3.html">Explore by place</a>
    <a class="btn btn-xl btn-warning rounded-4 shadow" href="slide5.html">Explore by decade</a>
  </div>
</div>`
  )
}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["htl"], _1);
  return main;
}
