browser.storage.local.get('pretty.kitty.settings')
    .then(item => {
        if (item['pretty.kitty.settings'].replaceEs) {
            for (elem of document.getElementsByTagName('a')) {
                elem.textContent = elem.textContent.replace(/e/g,'ë');
            }    
        }
        if (item['pretty.kitty.settings'].replaceImgs) {
            for (elem of document.getElementsByTagName('img')) {
                elem.src = 'https://placekitten.com/' + elem.width + '/' + elem.height;
            }    
        }
    })