
const profileKey = "sports490-profile";

const defaultProfile = {
    displayName: "Player",
    favoriteTeam: "",
    tokens: 1000
};

function loadProfile() {
    const savedProfile = localStorage.getItem(profileKey);

    if (savedProfile) {
        try {
            return {
                ...defaultProfile,
                ...JSON.parse(savedProfile)
            };
        } catch (error) {
            console.log("Could not load saved profile.");
        }
    }

    return { ...defaultProfile };
}

function saveProfile(profile) {
    localStorage.setItem(profileKey, JSON.stringify(profile));
}

function updateProfilePage(profile) {
    document.getElementById("profile-name").textContent =
        profile.displayName;

    document.getElementById("profile-avatar").textContent =
        profile.displayName.charAt(0).toUpperCase();

    document.getElementById("display-name").value =
        profile.displayName;

    document.getElementById("favorite-team").value =
        profile.favoriteTeam;

    document.getElementById("favorite-team-display").textContent =
        profile.favoriteTeam || "Not Selected";

    document.getElementById("account-balance").textContent =
        `${profile.tokens.toLocaleString()} Tokens`;
}

const profile = loadProfile();
updateProfilePage(profile);

document.getElementById("profile-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const displayName = document.getElementById("display-name").value.trim();
    const favoriteTeam = document.getElementById("favorite-team").value;

    if (!displayName) {
        document.getElementById("save-message").textContent =
            "Please enter a display name.";
        return;
    }

    profile.displayName = displayName;
    profile.favoriteTeam = favoriteTeam;

    saveProfile(profile);
    updateProfilePage(profile);

    document.getElementById("save-message").textContent =
        "Profile saved successfully!";
});
