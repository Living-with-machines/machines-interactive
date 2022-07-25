function _1(htl) {
    return (
        htl.html`<p>What was a machine? Explore real examples from the 1800s</p>
    <p class="mt-auto"><a class="btn btn-lg btn-warning rounded-4 shadow" href="slide2.html">Touch to explore</a></p>`
    )
}

export default function define(runtime, observer) {
    const main = runtime.module();
    main.variable(observer()).define(["htl"], _1);
    return main;
}
