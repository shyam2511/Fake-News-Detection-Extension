chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("cnbc")) {


        console.log("Hello world");
        chrome.tabs.sendMessage(tabId, {type : "NEW", value: ''},function(response) {
        if (!chrome.runtime.lastError) {
            console.log('response', response);
          }else{
            console.log(chrome.runtime.lastError);
          }
        }
      
      );
    }
  });