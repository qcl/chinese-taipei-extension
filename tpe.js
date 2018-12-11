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

let replacements = [];

for(keyword in replacementTable) {
    let replacement = replacementTable[keyword];
    replacements.push({
        "replace": new RegExp(keyword, 'g'),
        "to": replacement
    });
}

let replace = (node) => {
    if (node.nodeName == "#text" && node.textContent.length > 0) {
        let text = node.textContent;

        replacements.forEach((replacement) => {
            text = text.replace(replacement.replace, replacement.to);
        });

        if (text != node.textContent) {
            //console.log(node.textContent + ' -> ' + text);
            node.textContent = text;
        }
    } else {
        node.childNodes.forEach((childNode) => {
            replace(childNode);
        });
    }
};

let taiwanObserver = new window.MutationObserver((mutationList, observer) => {
    mutationList.forEach((mutation) => {
        let type = mutation.type;
        if (type != "childList") {
            return;
        }

        let addedNodes = mutation.addedNodes;
        addedNodes.forEach((node) => {
            if (["SCRIPT", "STYLE"].indexOf(node.nodeName) >= 0) {
                return;
            }

            replace(node);
        });
    });
});

replace(document.body);

taiwanObserver.observe(document, {
    subtree: true,
    childList: true
});
