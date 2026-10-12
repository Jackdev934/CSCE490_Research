
const historyKeys = {
    drafts: "sports490-draft-history",
    predictions: "sports490-predictions",
    posts: "sports490-posts",
    profile: "sports490-profile"
};

function readHistory(key, fallback) {
    try {
        const saved = JSON.parse(localStorage.getItem(key));
        return saved === null ? fallback : saved;
    } catch (error) {
        return fallback;
    }
}

function formatHistoryDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
        ? "Unknown date"
        : date.toLocaleString();
}

function makeHistoryCard(title, lines) {
    const card = document.createElement("div");
    card.className = "history-card";

    const heading = document.createElement("h3");
    heading.textContent = title;
    card.appendChild(heading);

    lines.forEach(line => {
        const paragraph = document.createElement("p");
        paragraph.textContent = line;
        card.appendChild(paragraph);
    });

    return card;
}

function showEmptyHistory(container, message) {
    const empty = document.createElement("div");
    empty.className = "empty-feed";
    empty.textContent = message;
    container.appendChild(empty);
}

function getDraftHistory() {
    const data = readHistory(historyKeys.drafts, []);
    return Array.isArray(data) ? data : [];
}

function getPredictionHistory() {
    const data = readHistory(historyKeys.predictions, {});
    return data && typeof data === "object" && !Array.isArray(data)
        ? data
        : {};
}

function getCommunityPosts() {
    const data = readHistory(historyKeys.posts, []);
    return Array.isArray(data) ? data : [];
}

function getProfileName() {
    const profile = readHistory(historyKeys.profile, {});
    return profile.displayName || "Player";
}

function displayActivityStats() {
    const drafts = getDraftHistory();
    const predictions = getPredictionHistory();
    const posts = getCommunityPosts();
    const profileName = getProfileName();

    const wins = drafts.filter(draft => draft.result === "Win").length;

    const myPosts = posts.filter(post =>
        post.author === profileName
    );

    document.getElementById("stat-matchups").textContent =
        drafts.length;

    document.getElementById("stat-wins").textContent =
        wins;

    document.getElementById("stat-predictions").textContent =
        Object.keys(predictions).length;

    document.getElementById("stat-posts").textContent =
        myPosts.length;
}

function displayDraftHistory() {
    const container = document.getElementById("draft-history");
    container.innerHTML = "";

    const drafts = getDraftHistory();

    if (drafts.length === 0) {
        showEmptyHistory(
            container,
            "No completed matchups yet. Play a fantasy matchup to get started."
        );
        return;
    }

    drafts.slice().reverse().forEach(draft => {
        const lineupNames = Array.isArray(draft.userLineup)
            ? draft.userLineup.map(player =>
                `${player.position}: ${player.name}`
            ).join(", ")
            : "Not available";

        const cpuNames = Array.isArray(draft.cpuLineup)
            ? draft.cpuLineup.map(player =>
                `${player.position}: ${player.name}`
            ).join(", ")
            : "Not available";

        const card = makeHistoryCard(
            `${draft.league} Fantasy Matchup`,
            [
                formatHistoryDate(draft.date),
                `Your Score: ${draft.userScore}`,
                `CPU Score: ${draft.cpuScore}`,
                `Result: ${draft.result}`,
                `Your Lineup: ${lineupNames}`,
                `CPU Lineup: ${cpuNames}`
            ]
        );

        container.appendChild(card);
    });
}

function displayPredictionHistory() {
    const container = document.getElementById("prediction-history");
    container.innerHTML = "";

    const predictions = getPredictionHistory();
    const entries = Object.values(predictions);

    if (entries.length === 0) {
        showEmptyHistory(
            container,
            "No predictions yet. Visit the Game Predictions section."
        );
        return;
    }

    entries.forEach(prediction => {
        const card = makeHistoryCard(
            `${prediction.league}: ${prediction.away} vs. ${prediction.home}`,
            [
                `Your Pick: ${prediction.team}`,
                `Saved: ${formatHistoryDate(prediction.date)}`
            ]
        );

        container.appendChild(card);
    });
}

function displayCommunityHistory(showReposts = false) {
    const container = document.getElementById("community-history");
    container.innerHTML = "";

    const posts = getCommunityPosts();
    const profileName = getProfileName();

    const filtered = showReposts
        ? posts.filter(post => post.reposted)
        : posts.filter(post => post.author === profileName);

    if (filtered.length === 0) {
        showEmptyHistory(
            container,
            showReposts
                ? "You haven't reposted anything yet."
                : "You haven't created any posts yet."
        );
        return;
    }

    filtered.forEach(post => {
        const card = makeHistoryCard(
            post.author,
            [
                post.text,
                formatHistoryDate(post.createdAt),
                `Likes: ${post.likes} | Reposts: ${post.reposts}`
            ]
        );

        container.appendChild(card);
    });
}

const myPostsButton = document.getElementById("show-my-posts");
const myRepostsButton = document.getElementById("show-my-reposts");

myPostsButton.addEventListener("click", () => {
    myPostsButton.className = "active-tab";
    myRepostsButton.className = "secondary-action";
    displayCommunityHistory(false);
});

myRepostsButton.addEventListener("click", () => {
    myRepostsButton.className = "active-tab";
    myPostsButton.className = "secondary-action";
    displayCommunityHistory(true);
});

displayActivityStats();
displayDraftHistory();
displayPredictionHistory();
displayCommunityHistory();
