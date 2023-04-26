document.getElementById("extract").addEventListener("click", function () {
  console.log("Hello world");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extract_article" }, function (response) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://mycontainer.dthdcjhebrc7dzf0.southeastasia.azurecontainer.io:8000/predict", true);
      console.log("this works");
      xhr.setRequestHeader("Content-Type", "application/json");
      console.log(response);
      xhr.send(JSON.stringify(response));
    });
  });
});