function updateSettings(itemName) {
    browser.storage.local.get('pretty.kitty.settings')
        .then(item => {
            var update = item['pretty.kitty.settings'];
            update[itemName] = !update[itemName];
            browser.storage.local.set({'pretty.kitty.settings': update})
                .then(() => console.log("OK"));
        });
}

document.getElementById('es').addEventListener('click', function () {
    updateSettings('replaceEs');
});

document.getElementById('imgs').addEventListener('click', function () {
    updateSettings('replaceImgs');
});

browser.storage.local.get('pretty.kitty.settings')
.then(item => {
    var settings = item['pretty.kitty.settings'];
    document.getElementById('es').checked = settings.replaceEs;
    document.getElementById('imgs').checked = settings.replaceImgs;
});