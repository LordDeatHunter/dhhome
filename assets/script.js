function setup() {
  setCopyables();
  VANTA.FOG({
    el: "html",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    highlightColor: 0x000000,
    midtoneColor: 0x000000,
    lowlightColor: 0x000000,
    baseColor: 0xff0000,
    blurFactor: 0.48,
    speed: 2.0,
    zoom: 0.5,
  });
}

function setCopyables() {
  let copyables = document.querySelectorAll(".copyable");
  for (let copyable of copyables) {
    copyable.innerHTML = copyable.getAttribute("default-text");
    copyable.addEventListener("click", function (e) {
      let copiedText = e.target.getAttribute("copied-text");
      navigator.clipboard.writeText(copiedText);
      e.target.innerHTML = " Copied!";
      setTimeout(function () {
        e.target.innerHTML = e.target.getAttribute(
          e.target.classList.contains("copyable-highlight")
            ? "hovered-text"
            : "default-text"
        );
      }, 1000);
    });
    copyable.onmouseover = function (e) {
      e.target.classList.add("copyable-highlight");
      if (e.target.innerHTML === "Copied!") return;
      e.target.innerHTML = e.target.getAttribute("hovered-text");
    };
    copyable.onmouseout = function (e) {
      e.target.classList.remove("copyable-highlight");
      if (e.target.innerHTML === "Copied!") return;
      e.target.innerHTML = e.target.getAttribute("default-text");
    };
  }
}

window.addEventListener("DOMContentLoaded", setup);
