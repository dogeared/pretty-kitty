browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    console.log(details.url.replace(/\?injected_param=uh_oh/g,'') + '?injected_param=uh_oh');
    // return {
    //   redirectUrl: details.url.replace(/\?injected_param=uh_oh/g,'') + '?injected_param=uh_oh'
    // }
    return {}
  },
  {urls: ["https://*/*"], types: ["main_frame"]},
  ["blocking"]
);

browser.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    details.requestHeaders.push({name: 'x-nothing', value: 'to-see-here'})
    return {
      requestHeaders: details.requestHeaders
    };
  },
  {urls: ["https://*/*"], types: ["main_frame"]},
  ["blocking", "requestHeaders"]
);

browser.storage.onChanged.addListener(changes => {
  browser.tabs.query({ active: true, currentWindow: true})
    .then(activeTabs => {
      browser.tabs.reload(activeTabs[0].id);
    })
});

browser.storage.local.get('pretty.kitty.settings')
  .then(item => {
    if (!item['pretty.kitty.settings']) {
      browser.storage.local.set({
          'pretty.kitty.settings': {
            replaceEs: false,
            replaceImgs: false
          }
      }).then(() => console.log("OK"));
    }
  });