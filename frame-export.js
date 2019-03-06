var GET = {};
var query = window.location.search.substring(1).split("&");

for (var i = 0, max = query.length; i < max; i++) {
    if (query[i] === "") // check for trailing & with no param
        continue;
    var param = query[i].split("=");
    // GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
    GET[param[0]] = param[1];
}

var exporting = (GET["exporting"] && GET["exporting"] == "true") ? true : false;

function frameExport(p) {
    var fileName = scene.fileName;
    var formattedFrameCount = "" + exportingFrame;
    while (formattedFrameCount.length < 5) {
        formattedFrameCount = "0" + formattedFrameCount;
    }
    fileName += "-" + formattedFrameCount;
    var dataUrl = p.canvasDOM.toDataURL();
    var data = {
        dataUrl: dataUrl,
        name: fileName
    }
    p.socket.emit('image', data);
}