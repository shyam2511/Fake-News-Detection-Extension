chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes("cnbc")) {
    console.log("Hello world");
    chrome.tabs.sendMessage(tabId, { action: "extract_article" }, function(response) {
      if (!chrome.runtime.lastError) {
        console.log('response', response);
        fetch('http://mycontainer.dthdcjhebrc7dzf0.southeastasia.azurecontainer.io:8000/predict', {
          method: 'POST',
          body: JSON.stringify(response),
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
        .then(response => response.json())
        .then(data => {
          setTimeout(() => {
            console.log(data);
          }, 10000); // Wait for 10 seconds
        });
      } else {
        console.log(chrome.runtime.lastError);
      }
    });
  }
});