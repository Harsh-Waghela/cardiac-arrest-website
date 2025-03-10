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
document.getElementById("story-form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent page refresh

    const storyInput = document.getElementById("story-input");
    const storyText = storyInput.value.trim();

    if (!storyText) {
        alert("Please write a story before submitting.");
        return;
    }

    try {
        // Send story to backend using fetch
        const response = await fetch("http://localhost:3000/add-story", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ story: storyText }),
        });

        const data = await response.json();
        alert(data.message); // Show success message

        // If story is submitted successfully, display it on the page
        if (response.ok) {
            const storyContainer = document.getElementById("story-container");
            const newStory = document.createElement("h4");
            newStory.textContent = storyText;
            storyContainer.appendChild(newStory);
        }

        // Clear the input field
        storyInput.value = "";
    } catch (error) {
        console.error("Error submitting story:", error);
        alert("Failed to submit story. Please try again.");
    }
});

// Function to fetch and display comments
function fetchComments() {
    fetch("http://localhost:3000/get-comments") // Make sure this matches your server route
    .then(response => response.json())
    .then(data => {
        console.log("Fetched comments:", data); // Log fetched comments for debugging

        const storyContainer = document.getElementById("story-container");
        storyContainer.innerHTML = ""; // Clear previous comments

        data.forEach(comment => {
            const li = document.createElement("li");
            li.textContent = comment.comment + " (Added on: " + new Date(comment.created_at).toLocaleString() + ")";
            storyContainer.appendChild(li);
        });
    })
    .catch(error => console.error("Error fetching comments:", error));
}

// Fetch comments when the page loads
window.onload = fetchComments;
