// const inputText = document.getElementById("userInput")
const btn = document.getElementById('sendButton')
const geminiResponseContainer = document.getElementById('response')

function parseMarkdown(markdown) {
    if (!markdown) return "";
    let html = markdown;
    html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); // escape HTML chars
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"); // bold
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>"); // italics
    html = html.replace(/^\s*-\s+(.+)$/gm, "<li>$1</li>"); // unordered lists
    if (html.includes("<li>")) {
        html = "<ul>" + html.replace(/\n/g, "") + "</ul>"; // wrap list items in <ul>
    }
    html = html.replace(/^\s*\d+\.\s+(.+)$/gm, "<li>$1</li>"); // ordered lists
    if (html.includes("<li>")) {
        html = html.replace(/((?:<li>.*<\/li>\s*)+)/g, "<ol>$1</ol>"); // wrap in <ul>
    }
    html = html.replace(/\n/g, "<br>"); // line breaks
    html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>"); // heading 3
    html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>"); // heading 2
    html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>"); // heading 1
    return html;
}

btn.addEventListener('click', async () => {
    const inputText = document.getElementById("userInput")
    const userQuery = inputText.value.trim()
    console.log(userQuery)
    geminiResponseContainer.innerHTML = "<p>loading...</p>"
    try {
        // Use fetch to send the data to your backend
        const response = await fetch('/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userQuery }),
        });

        if (!response.ok) {
            //   geminiResponseContainer.textContent = response.status
            throw new Error('Network response was not ok: ' + response.status);
        }

        // Get the response text (or JSON if your server returns JSON)
        const data = await response.json();
        let markdown = data.candidates[0].content.parts[0].text;
        geminiResponseContainer.innerHTML = parseMarkdown(markdown);
        // console.log(typeof data)
        // console.log(JSON.parse(response))

    } catch (error) {
        console.error('Error during fetch:', error);
        alert('Error: ' + error.message);
    }
})