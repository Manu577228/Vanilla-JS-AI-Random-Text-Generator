document.getElementById("textForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const textInput = document.getElementById("textInput").value.trim();
    const resultDiv = document.getElementById("generatedText");

    if (textInput === "") {
        M.toast({ html: "Please enter some text!" });
        return;
    }

    const apiKey = "AIzaSyDV7AWgfuD1f3kke1aKDrGG-vRWlLr4Zzs"; // Replace with your Gemini API key

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: textInput },
                        ],
                    },
                ],
            }),
        }
    );

    if (response.ok) {
        const data = await response.json();
        displayResult(data, resultDiv);
    } else {
        M.toast({ html: "Error generating text!" });
        resultDiv.innerHTML = "";
    }
});

function displayResult(data, resultDiv) {
    const generatedText = data.candidates[0].content.parts[0].text.replace(/\*{2}/g, ''); // Remove double asterisks

    resultDiv.innerHTML = `<p>${generatedText}</p>`; // Display generated text
}
