document.getElementById("extract").addEventListener("click", function () {
  // Show loading animation inside the button
  document.getElementById("button-text").style.display = "none";
  document.getElementById("loading").style.display = "inline-block";

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
          // Hide loading animation inside the button
          document.getElementById("loading").style.display = "none";
          document.getElementById("button-text").style.display = "inline-block";
          // Add code here to process the data from the server
          document.getElementById("response").textContent = JSON.stringify(data);
        }, 10000); // wait for 10 seconds
      });
    });
  });
});