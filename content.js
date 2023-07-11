chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "extract_article") {
    let title = "";
    let body = "";

    // Get title 
    title = document.querySelector("title").textContent;

    // Check multiple meta tags and og tags for content 
    getContentFromTags(["content", "og:description", "description"]);

    // Check for dedicated content containers 
    getContentFromElements(["#content", ".article-content", ".entry-content"]);

    // Get content from <p> paragraphs (fallback) 
    if (!body) {
      body = getContentFromParagraphs();
    }

    // Cleanup and condense content 
    body = body.trim().replace(/\s+/g, ' ');

    // Send response 
    sendResponse({ title: title, body: body });
  }
});

function getContentFromTags(tags) {
  for (const tag of tags) {
    const metaTag = document.querySelector(`meta[name="${tag}"]`);
    if (metaTag?.body) {
      body = metaTag.body;
      return;
    }
  }
}

function getContentFromElements(selectors) {
  for (const selector of selectors) {
    const contentEl = document.querySelector(selector);
    if (contentEl?.textContent) {
      body = contentEl.textContent;
      return;
    }
  }
}

function getContentFromParagraphs() {
  let body = "";
  const paragraphs = document.querySelectorAll("p");
  for (const paragraph of [...paragraphs]) {
    body += paragraph.textContent + "\n";
  }
  return body;
}

function getInnerText(el) {
  // Recursively get inner text of elements
  let body = "";
  for (const node of [...el.childNodes]) {
    if (node.nodeType === 3) {
      body += node.nodeValue;
    } else if (node.nodeType === 1 && node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
      body += getInnerText(node);
    }
  }
  return body.trim();
}