// 页面加载完成执行函数
function addLoadEvent(func) {
    // 将window.onload赋予一个变量
    var tempOnload = window.onload;
    // 判断window.onload是否和一个函数绑定
    if (typeof window.onload != 'function') {
        // 和函数绑定
        window.onload = func;
    } else {
        // 否则：和函数绑定
        window.onload = function() {
            if (tempOnload) {
                tempOnload();
            }
            func();
        }
    }
}

// 页面加载完成要执行的函数
addLoadEvent(function() {
    allLinks(); // 绑定链接
    pageInit(); // 获取锚点参数执行跳转
});

// 转换为数字
function intval(cssLength) {
    cssLength = parseInt(cssLength);
    // 如果不是一个数，则值为0
    return isNaN(cssLength) ? 0 : cssLength;
}

// 获得元素信息
function getPos(theAnchor) {
    var left = 0;
    var top = 0;
    // 元素宽、高的数值
    var width = intval(theAnchor.style.width);
    var height = intval(theAnchor.style.height);
    // 元素
    var offsetW = theAnchor.offsetWidth;
    var offsetH = theAnchor.offsetHeight;
    while (theAnchor.offsetParent) {
        // XX = 
        left += theAnchor.offsetLeft + (theAnchor.currentStyle ? intval(theAnchor.currentStyle.borderLeftWidth) : 0);
        top += theAnchor.offsetTop + (theAnchor.currentStyle ? intval(theAnchor.currentStyle.borderTopWidth) : 0);
        theAnchor = theAnchor.offsetParent;
    }
    l += theAnchor.offsetLeft + (theAnchor.currentStyle ? intval(theAnchor.currentStyle.borderLeftWidth) : 0);
    t += theAnchor.offsetTop + (theAnchor.currentStyle ? intval(theAnchor.currentStyle.borderTopWidth) : 0);
    return {
        x: left,
        y: top,
        width: width,
        height: height,
        wb: offsetW,
        hb: offsetH
    }
}
// 获取滚动条信息
function getScroll() {
    var top, left, width, height;
    if (document.documentElement && document.documentElement.scrollTop) {
        top = document.documentElement.scrollTop;
        left = document.documentElement.scrollLeft;
        width = document.documentElement.scrollWidth;
        height = document.documentElement.scrollHeight;
    } else if (document.body) {
        top = document.body.scrollTop;
        left = document.body.scrollLeft;
        width = document.body.scrollWidth;
        height = document.body.scrollHeight;
    }
    return {
        top: top,
        left: left,
        width: width,
        height: height;
    }
}
// 防止同时进行多个跳转
var $sr = 1;
// 滚动
function scroller(anchor, duration) {
    if (typeof anchor != 'object') {
        // 找到这个id
        anchor = document.getElementById(anchor);
    }
    // 如果id不存在
    if (!anchor) {
        return;
    }
    var z = this;
    z.el = anchor;
    z.p = getPos(anchor);
    z.s = getScroll();
    z.clear = function() {
        window.clearInterval(z.timer);
        z.timer = null;
    };
    z.t = (new Date).getTime();
    z.step = function() {
        var t = (new Date).getTime();
        var p = (t - z.t) / duration;
        if (t >= duration + z.t) {
            z.clear();
            window.setTimeout(function() {
                z.scroll(z.p.y, z.p.x);
            }, 13);
            $sr = 1;
        } else {
            st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;
            sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;
            z.scroll(st, sl);
        }
    };
    z.scroll = function(t, l) {
        window.scrollTo(l, t);
    };
    z.timer = window.setInterval(function() {
        z.step();
    }, 13);
    $sr = 0;
}

// 给页面添加额外的参数并打开
function goAnchor(initialHref, anchorTarget) {
    splitUrl = initialHref.split("#");
    if (anchorTarget == '') {
        anchorTarget = '_self';
    }
    if (anchorTarget == '_self' && $sr == 1) {
        scroller(splitUrl[1], 800);
    }
    window.open(splitUrl[0] + '#anchor=' + splitUrl[1], anchorTarget = anchorTarget);
}

// 所有的链接
function allLinks() {
    var anchorTag = document.getElementsByTagName('a');
    // 对所有a标签遍历
    for (var i = 0; i < anchorTag.length; i++) {
        var theAnchor = anchorTag[i];
        // 如果有链接且链接的#出现
        if ((theAnchor.href && theAnchor.href.indexOf('#') != -1)) {
            theAnchor.onclick = function(a) {
                if ($sr == 1) {
                    goAnchor(this.href, this.target);
                }
                return false;
            }
        }
    }
}

// 接收页面锚点参数执行平滑跳转
function pageInit() {
    hash = window.location.hash.split('#anchor=');
    scroller(hash[1], 800);
}