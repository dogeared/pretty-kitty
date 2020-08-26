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
  })

browser.storage.onChanged.addListener(function (changes) {
  var settings = changes['pretty.kitty.settings'];
  browser.tabs.query({ active: true, currentWindow: true})
    .then(activeTabs => { 
      browser.tabs.reload(activeTabs[0].id);
    })
});


// function onBeforeRequestListener(details) {
//   console.log(details.url);
//   // details.requestHeaders.push({})
//   // return {
//   //   redirectUrl: details.url.replace(/\?injected_param=uh_oh/g,'') + '?injected_param=uh_oh'
//   // }
//   return {}
// }

// function onBeforeSendHeadersListener(details) {
//   console.log(details.requestHeaders);
//   details.requestHeaders.push({name: 'x-bad-hacker', value: 'was-here'})
//   return {
//     requestHeaders: details.requestHeaders
//   };
// }

browser.webRequest.onBeforeRequest.addListener(
  function (details) {
    console.log(details.url);
    // details.requestHeaders.push({})
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
    console.log(details.requestHeaders);
    details.requestHeaders.push({name: 'x-bad-hacker', value: 'was-here'})
    return {
      requestHeaders: details.requestHeaders
    };
  },
  {urls: ["https://*/*"], types: ["main_frame"]},
  ["blocking", "requestHeaders"]
);