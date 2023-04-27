document.getElementById("extract").addEventListener("click", function () {
  // Show loading animation inside the button
  document.getElementById("button-text").style.display = "none";
  document.getElementById("loading").style.display = "inline-block";

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extract_article" }, function (response) {
      console.log(response);
      fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        body: JSON.stringify(response),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // Hide loading animation inside the button
          document.getElementById("loading").style.display = "none";
          document.getElementById("button-text").style.display = "inline-block";
          // Add code here to process the data from the server
          const prediction = data.ensemble_prediction;
          const probability = data.ensemble_probabilities[prediction];
          // Display the prediction result in the prediction result container
          // Hide the rest of the extension
          // document.querySelector(".card-text").style.display = "none";
          const predictionResult = document.getElementById("prediction-result");
          const resultText = document.getElementById("result-text");
          const resultValue = document.getElementById("result-value");
          resultValue.textContent = `${prediction} (${(probability * 100).toFixed(2)}%)`;
          resultText.style.display = "block";
          resultValue.style.display = "block";
          predictionResult.style.display = "block";
        })
        .catch(error => {
          console.error('Error:', error);
          // Hide loading animation inside the button
          document.getElementById("loading").style.display = "none";
          document.getElementById("button-text").style.display = "inline-block";
          // Add code here to handle errors
          alert("An error occurred. Please try again later.");
        });
    });
  });
});