// script.js
function showCPRTutorial() {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = `
        <iframe width="640" height="360" 
            src="https://www.youtube.com/embed/hizBdM1Ob68?si=I9PrdwacPsHT4lOR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" 
            title="CPR Tutorial" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen></iframe>
        <button onclick="closeVideo('video-container')">Close</button>`;
}

function showAEDTutorial() {
    const videoContainer = document.getElementById("video2-container");
    videoContainer.innerHTML = `
        <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/2VxVQ2expR0?si=ZbUIOo6SnSZrBhGR" 
            title="AED Tutorial" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen></iframe>
        <button onclick="closeVideo('video2-container')">Close</button>`;
}

function closeVideo(containerId) {
    document.getElementById(containerId).innerHTML = "";
}

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
}


// Handle story submission
document.getElementById("story-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get the story input
    const storyInput = document.getElementById("story-input");
    const storyText = storyInput.value.trim(); // Get and trim the user's input
    if (!storyInput) {
        console.error("The element with id 'story-input' was not found in the DOM.");
    }

    if (storyText) {
        // Create a new h4 element for the story
        const storyContainer = document.getElementById("story-container");
        const newStory = document.createElement("h4");
        newStory.textContent = storyText;

        // Append the new story to the story container
        storyContainer.appendChild(newStory);

        // Clear the input field
        storyInput.value = "";

        // Alert the user and confirm submission
        alert("Thank you for sharing your story!");
    } else {
        alert("Please write a story before submitting.");
    }
});
