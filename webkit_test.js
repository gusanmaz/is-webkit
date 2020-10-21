/*
 Returns true is called on a browser that uses WebKit as its engine, false otherwise.
 Works on Safari 14 and probably older versions. May not work in newer version if viewbox
 related box is fixed. See README file for more information.
 */

function isWebKit(){
    let svgns = "http://www.w3.org/2000/svg";
    let styleVal = "fill:white;fill-opacity:0.00001";
    let s = document.createElementNS(svgns, "svg");
    s.setAttribute("viewBox", "0 0 1 1");
    s.setAttribute("width", "800");
    s.setAttribute("height", "800");

    let r = document.createElementNS(svgns, "rect");
    r.setAttribute("x", "0.375");
    r.setAttribute("y", "0.375");
    r.setAttribute("width", "0.25");
    r.setAttribute("height", "0.25");
    r.setAttribute("style", styleVal);

    let t = document.createElementNS(svgns, "text");
    t.setAttribute("x", "0.5");
    t.setAttribute("y", "0.5");
    t.setAttribute("dominant-baseline", "central");
    t.setAttribute("text-anchor", "middle");
    t.setAttribute("font-size", "0.1");
    t.setAttribute("style", styleVal);
    t.innerHTML = "A";

    s.appendChild(r);
    s.appendChild(t);
    document.body.appendChild(s);
    let tBB = t.getBBox();
    let rBB = r.getBBox();
    document.body.removeChild(s);
    let tYMid = tBB.y + (tBB.height / 2);
    let rYMid = rBB.y + (rBB.height / 2);
    //console.log(tYMid);
    //console.log(rYMid);
    let epsilon = 1e-8;
    let diff = Math.abs(tYMid - rYMid);
    if (diff > epsilon){
        return true;
    }
    return false;
}