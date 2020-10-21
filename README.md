# Simple Test for WebKit Detection

`isWebKit()` function determines whether JS code is running on a 
WebKit engine (Safari on Desktop, all browsers on IOS). Due to an SVG bug 
on WebKit that manifests itself on mutual usage of viewBox and dominant-baseline
attributes this simple could do the trick. 

A bug report has already been [submitted](https://bugs.webkit.org/show_bug.cgi?id=217564) to WebKit. 
Hopefully if the bug is fixed in newer versions of Webkit, this function would 
become obsolete.

`isWebKit()` function could also be copied from below

```
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

    let epsilon = 1e-8;
    let diff = Math.abs(tYMid - rYMid);
    if (diff > epsilon){
        return true;
    }
    return false;
}
``` 
