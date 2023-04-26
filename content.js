chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "extract_article") {
    console.log("Something happened");
    var header = document.querySelector("h1.ArticleHeader-headline").innerText;
    var body = Array.from(document.querySelectorAll("div.ArticleBody-articleBody p")).map(p => p.innerText).join("\n");
    sendResponse({ header: header, body: body });
  }
});