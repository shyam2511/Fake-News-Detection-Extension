document.getElementById("extract").addEventListener("click", function () {
  console.log("Hello world");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extract_article" }, function (response) {
      fetch('http://mycontainer.dthdcjhebrc7dzf0.southeastasia.azurecontainer.io:8000/predict', {
        method: 'POST',
        body: JSON.stringify({ heading, body }),
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
    });
  });
});