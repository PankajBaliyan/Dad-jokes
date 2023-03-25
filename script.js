const button = document.querySelector(".container button");
const jokeDiv = document.querySelector(".container .joke p");
const copyBtn = document.querySelector("#copy");
const shareTwitterButton = document.querySelector("#share-twitter");
const shareMailButton = document.querySelector("#share-mail");
let currentJoke;

document.addEventListener("DOMContentLoaded", getJock);
button.addEventListener("click", getJock);

async function getJock() {
    const jokeData = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
    });
    const jokeObj = await jokeData.json();
    currentJoke = jokeObj.joke;
    jokeDiv.innerHTML = currentJoke;
}

// copy joke to clipboard
copyBtn.addEventListener("click", () => {
    // Select the text area and get its contents
    let text = document.getElementById("joke-content").innerHTML;

    // Create a temporary element to copy the text to
    let temp = document.createElement("textarea");
    temp.value = text;
    document.body.appendChild(temp);

    // Select the text in the temporary element and copy it to the clipboard
    temp.select();
    document.execCommand("copy");

    // Remove the temporary element
    document.body.removeChild(temp);

    // Show a confirmation message to the user
    alert("Joke copied to clipboard!");
});

// share current joke on twitter
shareTwitterButton.addEventListener('click', () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(currentJoke)}`;
    window.open(tweetUrl, '_blank');
});

// share current joke to mail
shareMailButton.addEventListener('click', () => {
    let textValue = document.getElementById("joke-content").innerHTML;

    const shareUrl = `mailto:?body=${encodeURIComponent(textValue)}`;
    window.location.href = shareUrl;
});