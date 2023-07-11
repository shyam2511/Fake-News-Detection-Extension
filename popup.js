document.getElementById("extract").addEventListener("click", function () {
  // Show loading animation inside the button
  document.getElementById("button-text").style.display = "none";
  document.getElementById("loading").style.display = "inline-block";
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "extract_article" }, function (response) {
      // Remove sentences with less than 50 characters from the body. Sentences are separated by \n
      response.body = response.body.split('\n').filter(sentence => sentence.length > 50)
      // Join the sentences back together
      response.body = response.body.join('. ')
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

          // Check if the response is from Google Fact Check API
          if (data.hasOwnProperty('textualRating')) {
            const resultValue = document.getElementById("result-value");
            resultValue.innerHTML = `Fact Check Result: <strong>${data.textualRating}</strong><br>Source: <a href="${data.url}" target="_blank">${data.publisher.site}</a>`;
          } else {
            // Process the data from the server
            let prediction = data.ensemble_prediction;
            let probability = data.ensemble_probabilities[prediction];

            // Display the prediction result in the prediction result container
            const resultValue = document.getElementById("result-value");
            resultValue.textContent = `The article seems to be ${prediction.toLowerCase()}. Confidence: ${(probability * 100).toFixed(2)}%`;
          }
        })
        .catch(error => {
          console.error('Error:', error);
          // Hide loading animation inside the button
          document.getElementById("loading").style.display = "none";
          document.getElementById("button-text").style.display = "inline-block";

          // Handle errors
          alert("An error occurred. Please try again later.");
        });
    });
  });
});