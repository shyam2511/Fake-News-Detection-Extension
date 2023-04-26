document.getElementById("extract").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extract_article" }, function (response) {
      console.log(response);
      fetch('http://mycontainer.dthdcjhebrc7dzf0.southeastasia.azurecontainer.io:8000/predict', {
        method: 'POST',
        body: JSON.stringify(response),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      .then(response => response.json())
      .then(data => {
        setTimeout(function () {
          console.log(data);
          // Add code here to process the data from the server
        }, 10000); // wait for 10 seconds
      });
    });
  });
});