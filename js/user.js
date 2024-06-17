document.addEventListener("DOMContentLoaded", function() {
    const profileIcon = document.getElementById("profileIcon");
    const helloText = document.getElementById("helloText");

    // Mock user data
    const user = {
        firstName: "Chibuzor",
        lastName: "Daniel",
        profilePicture: "" // URL to the user's profile picture if available
    };

    // Set profile picture or initials
    if (user.profilePicture) {
        profileIcon.style.backgroundImage = `url(${user.profilePicture})`;
        profileIcon.style.backgroundSize = "cover";
    } else {
        profileIcon.innerText = user.firstName.charAt(0) + user.lastName.charAt(0);
    }

    // Set hello text
    if (helloText) {
        helloText.innerText = `Hello, ${user.firstName}`;
    }
});
