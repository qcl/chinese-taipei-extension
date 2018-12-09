if (chrome) {
    var manifest = chrome.runtime.getManifest();
    console.log(manifest);
}

console.log("Load tpe.js");

let replacementTable = {
    "臺灣" : "中華臺北",
    "台灣" : "中華台北",
    "台湾" : "中华台北",
    "Taiwan": "Chinese Taipei",
    "TAIWAN": "CHINESE TAIPEI",
    "中華民國": "中華臺北",
    "中华民国": "中华台北",
    "R.O.C." : "Chinese Taipei",
    "Republic of China": "Chinese Taipei",
    "Republic Of China": "Chinese Taipei",
    "呆丸": "種花台北",
    "逮丸": "種花台北",
    "歹丸": "種花台北",
};

let processing = false;
let needCheck = false;

let replace = (node) => {
    console.log('replace called for'+node.nodeName);

    if (!node.innerHTML || node.innerHTML.length == 0) {
        return;
    }

    processing = true;
    let html = node.innerHTML;
    for (keyword in replacementTable) {
        let replacement = replacementTable[keyword];
        let re = new RegExp(keyword, 'g');

        html = html.replace(re, replacement);
    }
    node.innerHTML = html
    needCheck = false;
    processing = false;
};

/*let taiwanObserver = new window.MutationObserver((mutationList, observer) => {
    if (processing) {
        return;
    } else {
        needCheck = true;
    }
});*/

replace(document.body);

/*
taiwanObserver.observe(document, {
    subtree: true,
    childList: true
});

let checkTimer = setInterval(() => {
    console.log('time for checking');
    if (needCheck) {
        console.log('need to check');
        replace(document.body);
    } else {
        console.log('no need');
    }
}, 5000);*/
