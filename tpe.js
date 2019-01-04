console.log("Load tpe.js");

let replacements = [];

let updateReplacements = (replacementTable) => {
    for(keyword in replacementTable) {
        let replacement = replacementTable[keyword];
        replacements.push({
            "replace": new RegExp(keyword, 'g'),
            "to": replacement
        });
    }
}

let replace = (node) => {
    let needReplceFlag = false;
    if (node.nodeName == "#text" && node.textContent.length > 0) {
        let text = node.textContent;

        replacements.forEach((replacement) => {
            text = text.replace(replacement.replace, replacement.to);
        });

        if (text != node.textContent) {
            //console.log(node.textContent + ' -> ' + text);
            node.textContent = text;
        }

        if (text.indexOf("🇹🇼") >= 0) {
            return true;
        } else {
            return false;
        }
    } else if (node.nodeName == "IMG") {
        // Special case for replacing emoji for Facebook and Twitter
        if (node.alt && node.alt == "🇹🇼" && node.src && node.src.indexOf("emoji") > 0) {
            node.src = chrome.runtime.getURL("tpe.png");
        } else if (node.src && node.src.indexOf("1f1f9_1f1fc") > 0 && node.src.indexOf("emoji.php") > 0) {
            node.src = chrome.runtime.getURL("tpe.png");
        }
    } else {
        node.childNodes.forEach((childNode) => {
            needReplceFlag = needReplceFlag || replace(childNode);
        });
        if (needReplceFlag) {
            if (!node.classList.contains("tpe-flag-font")) {
                node.classList.add("tpe-flag-font");
            }
            // Special case for replacing emoji background for Facebook
            if (node.style.backgroundImage.indexOf("emoji.php") > 0) {
                node.style.backgroundImage = 'url("' + chrome.runtime.getURL("tpe.png") + '")';
            }
        }
    }

    return false;
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

fetch(chrome.runtime.getURL("replacement.json")).then((response) => {
    return response.json();
}).then((jsonObject => {
    let replacementTable = jsonObject;
    updateReplacements(replacementTable);
    replace(document.body);

    taiwanObserver.observe(document, {
        subtree: true,
        childList: true
    });
}));


