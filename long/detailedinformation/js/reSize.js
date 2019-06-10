/**
 * Created by tan on 2017/3/24.
 */
//自动适应屏幕
!(function(doc, win) {
    var docEle = doc.documentElement,
        evt = "onorientationchange" in window ? "orientationchange" : "resize",
        fn = function() {
            var width = docEle.clientWidth;
            width && (docEle.style.fontSize = 100 * (width / 750) + "px");
        };
    win.addEventListener(evt, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);
}(document, window));

//整体页面拉动
var myScroll;
function loaded () {
    myScroll = new IScroll('#wrapper', {
        scrollbars: false,
        click:true,
        preventDefault:false
    });
}
// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
//     capture: false,
//     passive: false
// } : false);
