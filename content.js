chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "extract_article") {
    
    const title = document.querySelector("h1.ArticleHeader-headline").innerText;
    const body = Array.from(document.querySelectorAll("div.ArticleBody-articleBody p")).map(p => p.innerText).join("\n");
    // console.log(title);
    // console.log(body);
    sendResponse({title: title, body:body});
}
});