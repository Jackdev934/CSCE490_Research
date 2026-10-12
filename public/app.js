
// Community feed functionality

const postsKey = "sports490-posts";
const profileKey = "sports490-profile";

function getCurrentProfile() {
    try {
        const saved = JSON.parse(localStorage.getItem(profileKey));
        return saved || { displayName: "Player" };
    } catch (error) {
        return { displayName: "Player" };
    }
}

function loadPosts() {
    try {
        const saved = JSON.parse(localStorage.getItem(postsKey));
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}

let communityPosts = loadPosts();

function savePosts() {
    localStorage.setItem(postsKey, JSON.stringify(communityPosts));
}

function createPost(text) {
    const profile = getCurrentProfile();

    const post = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        author: profile.displayName || "Player",
        text: text,
        createdAt: new Date().toISOString(),
        likes: 0,
        liked: false,
        reposts: 0,
        reposted: false
    };

    communityPosts.unshift(post);
    savePosts();
    displayPosts();
}

function toggleLike(postId) {
    const post = communityPosts.find(p => p.id === postId);

    if (!post) return;

    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;

    savePosts();
    displayPosts();
}

function toggleRepost(postId) {
    const post = communityPosts.find(p => p.id === postId);

    if (!post) return;

    post.reposted = !post.reposted;
    post.reposts += post.reposted ? 1 : -1;

    savePosts();
    displayPosts();
}

function displayPosts() {
    const feed = document.getElementById("community-feed");
    feed.innerHTML = "";

    document.getElementById("post-total").textContent =
        `${communityPosts.length} Posts`;

    if (communityPosts.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty-feed";
        empty.textContent =
            "No posts yet. Be the first to share something!";
        feed.appendChild(empty);
        return;
    }

    communityPosts.forEach(post => {
        const card = document.createElement("div");
        card.className = "post-card";

        const header = document.createElement("div");
        header.className = "post-header";

        const avatar = document.createElement("div");
        avatar.className = "post-avatar";
        avatar.textContent =
            (post.author || "P").charAt(0).toUpperCase();

        const authorInfo = document.createElement("div");

        const author = document.createElement("div");
        author.className = "post-author";
        author.textContent = post.author;

        const date = document.createElement("div");
        date.className = "post-date";
        date.textContent =
            new Date(post.createdAt).toLocaleString();

        authorInfo.appendChild(author);
        authorInfo.appendChild(date);

        header.appendChild(avatar);
        header.appendChild(authorInfo);

        const content = document.createElement("p");
        content.className = "post-content";
        content.textContent = post.text;

        const actions = document.createElement("div");
        actions.className = "post-actions";

        const likeButton = document.createElement("button");
        likeButton.className =
            "post-action-button" + (post.liked ? " active" : "");
        likeButton.textContent =
            `♥ Like (${post.likes})`;

        likeButton.addEventListener("click", () => {
            toggleLike(post.id);
        });

        const repostButton = document.createElement("button");
        repostButton.className =
            "post-action-button" + (post.reposted ? " active" : "");
        repostButton.textContent =
            `↻ Repost (${post.reposts})`;

        repostButton.addEventListener("click", () => {
            toggleRepost(post.id);
        });

        actions.appendChild(likeButton);
        actions.appendChild(repostButton);

        card.appendChild(header);
        card.appendChild(content);
        card.appendChild(actions);

        feed.appendChild(card);
    });
}

document.getElementById("post-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const input = document.getElementById("post-text");
    const text = input.value.trim();

    if (!text || text.length > 280) return;

    createPost(text);

    input.value = "";
    document.getElementById("character-count").textContent = "0 / 280";
    document.getElementById("post-message").textContent =
        "Your post was published!";
});

document.getElementById("post-text").addEventListener("input", function() {
    document.getElementById("character-count").textContent =
        `${this.value.length} / 280`;
});


function playMatchup() {
    if (currentPick < draftOrder.length || matchupPlayed) return;

    matchupPlayed = true;

    const userScore = calculateScore(userLineup);
    const cpuScore = calculateScore(cpuLineup);

    let resultText = "";

    if (userScore > cpuScore) {
        resultText = "Win";
    } else if (cpuScore > userScore) {
        resultText = "Loss";
    } else {
        resultText = "Tie";
    }

    const result = document.getElementById("matchup-result");
    result.innerHTML = "";

    const scores = document.createElement("p");
    scores.textContent =
        `Your Team: ${userScore} points | CPU: ${cpuScore} points`;

    const winner = document.createElement("p");

    if (resultText === "Win") {
        winner.textContent = "You won the matchup!";
        winner.className = "result-win";
    } else if (resultText === "Loss") {
        winner.textContent = "The CPU won the matchup!";
        winner.className = "result-loss";
    } else {
        winner.textContent = "The matchup ended in a tie!";
        winner.className = "result-tie";
    }

    result.appendChild(scores);
    result.appendChild(winner);

    // Save completed matchup to browser storage
    const historyKey = "sports490-draft-history";

    let draftHistory = [];

    try {
        draftHistory = JSON.parse(
            localStorage.getItem(historyKey)
        ) || [];
    } catch (error) {
        draftHistory = [];
    }

    if (!Array.isArray(draftHistory)) {
        draftHistory = [];
    }

    draftHistory.push({
        id: Date.now(),
        league: currentLeague,
        date: new Date().toISOString(),
        userScore: userScore,
        cpuScore: cpuScore,
        result: resultText,
        userLineup: [...userLineup],
        cpuLineup: [...cpuLineup]
    });

    localStorage.setItem(
        historyKey,
        JSON.stringify(draftHistory)
    );

    updateDraft();
}


function makePrediction(gameIndex, team) {
    const key = `${currentLeague}-${gameIndex}`;
    const game = leagueGames[currentLeague][gameIndex];

    predictions[key] = team;

    const historyKey = "sports490-predictions";

    let savedPredictions = {};

    try {
        savedPredictions = JSON.parse(
            localStorage.getItem(historyKey)
        ) || {};
    } catch (error) {
        savedPredictions = {};
    }

    if (
        !savedPredictions ||
        typeof savedPredictions !== "object" ||
        Array.isArray(savedPredictions)
    ) {
        savedPredictions = {};
    }

    savedPredictions[key] = {
        league: currentLeague,
        home: game.home,
        away: game.away,
        team: team,
        date: new Date().toISOString()
    };

    localStorage.setItem(
        historyKey,
        JSON.stringify(savedPredictions)
    );

    displayGames();
}


function loadSavedPredictions() {
    try {
        const saved = JSON.parse(
            localStorage.getItem("sports490-predictions")
        );

        if (!saved || typeof saved !== "object") return;

        Object.entries(saved).forEach(([key, value]) => {
            if (value && typeof value.team === "string") {
                predictions[key] = value.team;
            }
        });
    } catch (error) {
        console.log("No saved predictions found.");
    }
}

loadSavedPredictions();
displayGames();
