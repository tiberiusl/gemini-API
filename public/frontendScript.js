// const inputText = document.getElementById("userInput")
const btn = document.getElementById('sendButton')
const geminiResponseContainer = document.getElementById('response')


btn.addEventListener('click', async () => {
    const inputText = document.getElementById("userInput")
    const userQuery = inputText.value.trim()
    console.log(userQuery)
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
        const data = await response.json()
        geminiResponseContainer.textContent = data.candidates[0].content.parts[0].text;
        // console.log(typeof data)
        // console.log(JSON.parse(response))

    } catch (error) {
        console.error('Error during fetch:', error);
        alert('Error: ' + error.message);
    }
})