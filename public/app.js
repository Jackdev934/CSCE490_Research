
const startingBudget = 1000;
const positions = ["QB", "RB", "WR", "TE"];
const draftOrder = ["user", "cpu", "cpu", "user", "user", "cpu", "cpu", "user"];

const leaguePlayers = {
    NFL: [
        { name: "Patrick Mahomes", team: "Chiefs", position: "QB", cost: 300, rating: 95 },
        { name: "Josh Allen", team: "Bills", position: "QB", cost: 290, rating: 94 },
        { name: "Lamar Jackson", team: "Ravens", position: "QB", cost: 280, rating: 93 },
        { name: "Jalen Hurts", team: "Eagles", position: "QB", cost: 270, rating: 91 },
        { name: "Christian McCaffrey", team: "49ers", position: "RB", cost: 260, rating: 95 },
        { name: "Bijan Robinson", team: "Falcons", position: "RB", cost: 250, rating: 93 },
        { name: "Saquon Barkley", team: "Eagles", position: "RB", cost: 240, rating: 92 },
        { name: "Derrick Henry", team: "Ravens", position: "RB", cost: 230, rating: 90 },
        { name: "Justin Jefferson", team: "Vikings", position: "WR", cost: 250, rating: 96 },
        { name: "Ja'Marr Chase", team: "Bengals", position: "WR", cost: 240, rating: 95 },
        { name: "CeeDee Lamb", team: "Cowboys", position: "WR", cost: 230, rating: 93 },
        { name: "Amon-Ra St. Brown", team: "Lions", position: "WR", cost: 220, rating: 92 },
        { name: "Travis Kelce", team: "Chiefs", position: "TE", cost: 190, rating: 91 },
        { name: "George Kittle", team: "49ers", position: "TE", cost: 180, rating: 90 },
        { name: "Sam LaPorta", team: "Lions", position: "TE", cost: 170, rating: 88 },
        { name: "Trey McBride", team: "Cardinals", position: "TE", cost: 160, rating: 87 }
    ],

    UFL: [
        { name: "UFL Quarterback 1", team: "Stallions", position: "QB", cost: 280, rating: 92 },
        { name: "UFL Quarterback 2", team: "Battlehawks", position: "QB", cost: 270, rating: 90 },
        { name: "UFL Quarterback 3", team: "Defenders", position: "QB", cost: 260, rating: 88 },
        { name: "UFL Quarterback 4", team: "Renegades", position: "QB", cost: 250, rating: 86 },
        { name: "UFL Running Back 1", team: "Stallions", position: "RB", cost: 240, rating: 91 },
        { name: "UFL Running Back 2", team: "Battlehawks", position: "RB", cost: 230, rating: 89 },
        { name: "UFL Running Back 3", team: "Defenders", position: "RB", cost: 220, rating: 87 },
        { name: "UFL Running Back 4", team: "Renegades", position: "RB", cost: 210, rating: 85 },
        { name: "UFL Receiver 1", team: "Battlehawks", position: "WR", cost: 240, rating: 92 },
        { name: "UFL Receiver 2", team: "Stallions", position: "WR", cost: 230, rating: 90 },
        { name: "UFL Receiver 3", team: "Defenders", position: "WR", cost: 220, rating: 88 },
        { name: "UFL Receiver 4", team: "Renegades", position: "WR", cost: 210, rating: 86 },
        { name: "UFL Tight End 1", team: "Stallions", position: "TE", cost: 180, rating: 90 },
        { name: "UFL Tight End 2", team: "Battlehawks", position: "TE", cost: 170, rating: 88 },
        { name: "UFL Tight End 3", team: "Defenders", position: "TE", cost: 160, rating: 86 },
        { name: "UFL Tight End 4", team: "Renegades", position: "TE", cost: 150, rating: 84 }
    ],

    CFL: [
        { name: "CFL Quarterback 1", team: "Argonauts", position: "QB", cost: 280, rating: 92 },
        { name: "CFL Quarterback 2", team: "Blue Bombers", position: "QB", cost: 270, rating: 90 },
        { name: "CFL Quarterback 3", team: "Lions", position: "QB", cost: 260, rating: 88 },
        { name: "CFL Quarterback 4", team: "Alouettes", position: "QB", cost: 250, rating: 86 },
        { name: "CFL Running Back 1", team: "Argonauts", position: "RB", cost: 240, rating: 91 },
        { name: "CFL Running Back 2", team: "Blue Bombers", position: "RB", cost: 230, rating: 89 },
        { name: "CFL Running Back 3", team: "Lions", position: "RB", cost: 220, rating: 87 },
        { name: "CFL Running Back 4", team: "Alouettes", position: "RB", cost: 210, rating: 85 },
        { name: "CFL Receiver 1", team: "Lions", position: "WR", cost: 240, rating: 92 },
        { name: "CFL Receiver 2", team: "Argonauts", position: "WR", cost: 230, rating: 90 },
        { name: "CFL Receiver 3", team: "Blue Bombers", position: "WR", cost: 220, rating: 88 },
        { name: "CFL Receiver 4", team: "Alouettes", position: "WR", cost: 210, rating: 86 },
        { name: "CFL Tight End 1", team: "Argonauts", position: "TE", cost: 180, rating: 90 },
        { name: "CFL Tight End 2", team: "Blue Bombers", position: "TE", cost: 170, rating: 88 },
        { name: "CFL Tight End 3", team: "Lions", position: "TE", cost: 160, rating: 86 },
        { name: "CFL Tight End 4", team: "Alouettes", position: "TE", cost: 150, rating: 84 }
    ],

    COLLEGE: [
        { name: "College Quarterback 1", team: "Gamecocks", position: "QB", cost: 280, rating: 92 },
        { name: "College Quarterback 2", team: "Tigers", position: "QB", cost: 270, rating: 90 },
        { name: "College Quarterback 3", team: "Bulldogs", position: "QB", cost: 260, rating: 88 },
        { name: "College Quarterback 4", team: "Crimson Tide", position: "QB", cost: 250, rating: 86 },
        { name: "College Running Back 1", team: "Gamecocks", position: "RB", cost: 240, rating: 91 },
        { name: "College Running Back 2", team: "Tigers", position: "RB", cost: 230, rating: 89 },
        { name: "College Running Back 3", team: "Bulldogs", position: "RB", cost: 220, rating: 87 },
        { name: "College Running Back 4", team: "Crimson Tide", position: "RB", cost: 210, rating: 85 },
        { name: "College Receiver 1", team: "Gamecocks", position: "WR", cost: 240, rating: 92 },
        { name: "College Receiver 2", team: "Tigers", position: "WR", cost: 230, rating: 90 },
        { name: "College Receiver 3", team: "Bulldogs", position: "WR", cost: 220, rating: 88 },
        { name: "College Receiver 4", team: "Crimson Tide", position: "WR", cost: 210, rating: 86 },
        { name: "College Tight End 1", team: "Gamecocks", position: "TE", cost: 180, rating: 90 },
        { name: "College Tight End 2", team: "Tigers", position: "TE", cost: 170, rating: 88 },
        { name: "College Tight End 3", team: "Bulldogs", position: "TE", cost: 160, rating: 86 },
        { name: "College Tight End 4", team: "Crimson Tide", position: "TE", cost: 150, rating: 84 }
    ]
};

const leagueGames = {
    NFL: [
        { home: "Chiefs", away: "Bills" },
        { home: "Eagles", away: "Cowboys" },
        { home: "Ravens", away: "Bengals" }
    ],
    UFL: [
        { home: "Stallions", away: "Battlehawks" },
        { home: "Defenders", away: "Renegades" }
    ],
    CFL: [
        { home: "Argonauts", away: "Blue Bombers" },
        { home: "Lions", away: "Alouettes" }
    ],
    COLLEGE: [
        { home: "Gamecocks", away: "Tigers" },
        { home: "Bulldogs", away: "Crimson Tide" }
    ]
};

const teamColors = {
    Chiefs: "#e31837",
    Bills: "#00338d",
    Eagles: "#004c54",
    Cowboys: "#003594",
    Ravens: "#241773",
    Bengals: "#fb4f14",
    Stallions: "#c8102e",
    Battlehawks: "#00529b",
    Defenders: "#c8102e",
    Renegades: "#004c97",
    Argonauts: "#003876",
    "Blue Bombers": "#003087",
    Lions: "#f37021",
    Alouettes: "#9e1b34",
    Gamecocks: "#73000a",
    Tigers: "#f56600",
    Bulldogs: "#ba0c2f",
    "Crimson Tide": "#9e1b32"
};

let currentLeague = "NFL";
let userLineup = [];
let cpuLineup = [];
let userBudget = startingBudget;
let cpuBudget = startingBudget;
let currentPick = 0;
let matchupPlayed = false;
let predictions = {};

function getPlayers() {
    return leaguePlayers[currentLeague];
}

function playerTaken(player) {
    return [...userLineup, ...cpuLineup].some(
        selected => selected.name === player.name
    );
}

function positionTaken(lineup, position) {
    return lineup.some(player => player.position === position);
}

function canDraft(player, lineup, budget) {
    if (playerTaken(player)) return false;
    if (positionTaken(lineup, player.position)) return false;
    if (player.cost > budget) return false;

    const remainingPositions = positions.filter(position =>
        position !== player.position &&
        !positionTaken(lineup, position)
    );

    let minimumFutureCost = 0;

    for (const position of remainingPositions) {
        const available = getPlayers().filter(other =>
            other.name !== player.name &&
            other.position === position &&
            !playerTaken(other)
        );

        if (available.length === 0) return false;

        minimumFutureCost += Math.min(
            ...available.map(other => other.cost)
        );
    }

    return player.cost + minimumFutureCost <= budget;
}

function displayPlayers() {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";

    const yourTurn = draftOrder[currentPick] === "user";

    getPlayers().forEach(player => {
        const card = document.createElement("div");
        card.className = "player-card";

        card.innerHTML = `
            <h3>${player.name}</h3>
            <p>${player.team} | ${player.position}</p>
            <p>Cost: ${player.cost} tokens</p>
            <p>Rating: ${player.rating}</p>
        `;

        const button = document.createElement("button");
        button.textContent = playerTaken(player)
            ? "Drafted"
            : "Draft Player";

        button.disabled = !yourTurn ||
            !canDraft(player, userLineup, userBudget);

        button.addEventListener("click", () => draftPlayer(player));

        card.appendChild(button);
        playerList.appendChild(card);
    });

    document.getElementById("player-total").textContent =
        `${getPlayers().length} Players`;
}

function draftPlayer(player) {
    if (draftOrder[currentPick] !== "user") return;
    if (!canDraft(player, userLineup, userBudget)) return;

    userLineup.push(player);
    userBudget -= player.cost;
    currentPick++;

    document.getElementById("draft-message").textContent =
        `You drafted ${player.name}.`;

    processCpuTurns();
    updateDraft();
}

function processCpuTurns() {
    while (currentPick < draftOrder.length &&
           draftOrder[currentPick] === "cpu") {

        const available = getPlayers().filter(player =>
            canDraft(player, cpuLineup, cpuBudget)
        );

        if (available.length === 0) break;

        available.sort((a, b) => b.rating - a.rating);

        const player = available[0];
        cpuLineup.push(player);
        cpuBudget -= player.cost;
        currentPick++;
    }
}

function displayLineup(elementId, lineup) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    if (lineup.length === 0) {
        container.textContent = "No players drafted yet.";
        return;
    }

    lineup.forEach(player => {
        const row = document.createElement("p");
        row.textContent =
            `${player.position}: ${player.name} (${player.rating})`;
        container.appendChild(row);
    });
}

function updateDraft() {
    document.getElementById("remaining-budget").textContent =
        `${userBudget} Tokens`;

    document.getElementById("cpu-budget").textContent =
        `${cpuBudget} Tokens`;

    document.getElementById("current-pick").textContent =
        `${Math.min(currentPick + 1, 8)} / 8`;

    const complete = currentPick >= draftOrder.length;

    document.getElementById("turn-message").textContent =
        complete ? "Draft Complete" :
        draftOrder[currentPick] === "user"
            ? "Your Turn to Draft"
            : "CPU Turn";

    document.getElementById("play-matchup").disabled =
        !complete || matchupPlayed;

    displayLineup("lineup-list", userLineup);
    displayLineup("cpu-lineup", cpuLineup);
    displayPlayers();
}

function calculateScore(lineup) {
    return lineup.reduce((total, player) => {
        const variation = Math.floor(Math.random() * 21) - 10;
        return total + player.rating + variation;
    }, 0);
}


function resetDraft() {
    userLineup = [];
    cpuLineup = [];

    // Use your current token balance as the next draft budget
    userBudget = tokenBalance;
    cpuBudget = startingBudget;

    currentPick = 0;
    matchupPlayed = false;

    document.getElementById("matchup-result").innerHTML = "";

    document.getElementById("draft-message").textContent =
        "New draft started. Select your first player.";

    updateDraft();
}


function displayGames() {
    const gameList = document.getElementById("game-list");
    gameList.innerHTML = "";

    document.getElementById("prediction-league").textContent =
        currentLeague;

    leagueGames[currentLeague].forEach((game, index) => {
        const card = document.createElement("div");
        card.className = "game-card";

        const heading = document.createElement("h3");
        heading.textContent = `${game.away} vs. ${game.home}`;
        card.appendChild(heading);

        const buttons = document.createElement("div");
        buttons.className = "prediction-buttons";

        const key = `${currentLeague}-${index}`;

        [game.away, game.home].forEach(team => {
            const button = document.createElement("button");
            button.className = "prediction-button";
            button.textContent = `Pick ${team}`;
            button.style.backgroundColor =
                teamColors[team] || "#2979ff";

            if (predictions[key] === team) {
                button.classList.add("selected");
            }

            button.addEventListener("click", () => {
                makePrediction(index, team);
            });

            buttons.appendChild(button);
        });

        card.appendChild(buttons);

        const savedResults = JSON.parse(
    localStorage.getItem("sports490-prediction-results") || "{}"
);

function resetPredictions() {
    document.getElementById("reset-predictions")
    .addEventListener("click", resetPredictions);

    if (!confirmed) return;

    // Clear all saved predictions and simulated results
    localStorage.removeItem("sports490-predictions");
    localStorage.removeItem("sports490-prediction-results");

    // Clear predictions currently stored in memory
    predictions = {};

    // Refresh the game cards
    displayGames();
}

document.getElementById("reset-predictions")
    .addEventListener("click", resetPredictions);

const result = savedResults[key];

if (result) {
    const confirmation = document.createElement("p");
    confirmation.className = "prediction-confirmation";

    confirmation.textContent =
        `Your Pick: ${result.selectedTeam} | ` +
        `Simulated Winner: ${result.winningTeam} | ` +
        `${result.correct ? "Correct!" : "Incorrect!"} ` +
        `+${result.reward} Tokens`;

    confirmation.style.color = result.correct
        ? "#22c55e"
        : "#ef4444";

    card.appendChild(confirmation);
}

        gameList.appendChild(card);
    });
}

function changeLeague() {
    currentLeague = document.getElementById("league-select").value;
    resetDraft();
    displayGames();
}

document.getElementById("league-select")
    .addEventListener("change", changeLeague);

document.getElementById("reset-draft")
    .addEventListener("click", resetDraft);

document.getElementById("play-matchup")
    .addEventListener("click", playMatchup);



function playMatchup() {
    if (matchupPlayed || currentPick < draftOrder.length) {
        return;
    }

    const userScore = calculateScore(userLineup);
    const cpuScore = calculateScore(cpuLineup);

    let result = "Tie";
    let reward = 0;

    if (userScore > cpuScore) {
        result = "Win";
        reward = 200;
    } else if (cpuScore > userScore) {
        result = "Loss";
    }

    matchupPlayed = true;

    if (reward > 0) {
        addTokens(reward);
    }

    document.getElementById("matchup-result").textContent =
        `Your Score: ${userScore} | CPU Score: ${cpuScore} | ` +
        `${result}! You earned ${reward} tokens. ` +
        `Token Balance: ${tokenBalance}`;

    const history = JSON.parse(
        localStorage.getItem("sports490-draft-history") || "[]"
    );

    history.push({
        league: currentLeague,
        userScore: userScore,
        cpuScore: cpuScore,
        result: result,
        reward: reward,
        userLineup: [...userLineup],
        cpuLineup: [...cpuLineup],
        date: new Date().toISOString()
    });

    localStorage.setItem(
        "sports490-draft-history",
        JSON.stringify(history)
    );

    updateDraft();
}


    const userScore = calculateScore(userLineup);
    const cpuScore = calculateScore(cpuLineup);

    let result = "It's a tie!";

    if (userScore > cpuScore) {
        result = "You won!";
    } else if (cpuScore > userScore) {
        result = "CPU won!";
    }

    document.getElementById("matchup-result").textContent =
        `Your score: ${userScore} | CPU score: ${cpuScore} | ${result}`;

    matchupPlayed = true;
    updateDraft();

    const history = JSON.parse(
        localStorage.getItem("sports490-draft-history") || "[]"
    );

    history.push({
        league: currentLeague,
        userScore: userScore,
        cpuScore: cpuScore,
        result: result,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "sports490-draft-history",
        JSON.stringify(history)
    );


function makePrediction(index, team) {
    const key = `${currentLeague}-${index}`;
    const resultKey = "sports490-prediction-results";

    const results = JSON.parse(
        localStorage.getItem(resultKey) || "{}"
    );

    // Don't allow the same game to pay rewards twice
    if (results[key]) {
        alert("This game has already been simulated.");
        return;
    }

    const game = leagueGames[currentLeague][index];

    // Randomly simulate the winning team
    const winner = Math.random() < 0.5
        ? game.home
        : game.away;

    const correct = team === winner;
    const reward = correct ? 100 : 0;

    predictions[key] = team;

    if (reward > 0) {
        addTokens(reward);
    }

    results[key] = {
        selectedTeam: team,
        winningTeam: winner,
        correct: correct,
        reward: reward,
        date: new Date().toISOString()
    };

    localStorage.setItem(
        "sports490-predictions",
        JSON.stringify(predictions)
    );

    localStorage.setItem(
        resultKey,
        JSON.stringify(results)
    );

    displayGames();
}


function loadSavedPredictions() {
    try {
        predictions = JSON.parse(
            localStorage.getItem("sports490-predictions") || "{}"
        );
    } catch (error) {
        predictions = {};
    }
}

function displayPosts() {
    const feed = document.getElementById("community-feed");
    const total = document.getElementById("post-total");

    if (!feed || !total) return;

    const posts = JSON.parse(
        localStorage.getItem("sports490-posts") || "[]"
    );

    feed.innerHTML = "";
    total.textContent = `${posts.length} Posts`;

    if (posts.length === 0) {
        feed.textContent = "No posts yet. Be the first to post!";
        return;
    }

    posts.forEach(post => {
        const card = document.createElement("div");
        card.className = "post-card";

        const heading = document.createElement("h3");
        heading.textContent = post.username || post.author || "Sports490 User";

        const content = document.createElement("p");
        content.textContent = post.text || post.content || "";

        card.appendChild(heading);
        card.appendChild(content);
        feed.appendChild(card);
    });
}

document.getElementById("post-form").addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const input = document.getElementById("post-text");
        const text = input.value.trim();

        if (!text) return;

        const posts = JSON.parse(
            localStorage.getItem("sports490-posts") || "[]"
        );

        posts.unshift({
            username: "Sports490 User",
            text: text,
            date: new Date().toLocaleString()
        });

        localStorage.setItem(
            "sports490-posts",
            JSON.stringify(posts)
        );

        input.value = "";
        displayPosts();
    }
);

document.addEventListener("DOMContentLoaded", function () {
    loadSavedPredictions();
    resetDraft();
    displayGames();
    displayPosts();
});

const tokenKey = "sports490-tokens";

let tokenBalance = Number(localStorage.getItem(tokenKey));

if (!Number.isFinite(tokenBalance) || tokenBalance < 1000) {
    tokenBalance = 1000;
}

function addTokens(amount) {
    tokenBalance += amount;
    localStorage.setItem(tokenKey, String(tokenBalance));
}

function saveTokenBalance() {
    localStorage.setItem(tokenKey, String(tokenBalance));
}


function resetPredictions() {
    const confirmed = confirm(
        "Reset all game predictions? Your earned tokens will be kept."
    );

    if (!confirmed) {
        return;
    }

    // Remove saved game predictions and results
    localStorage.removeItem("sports490-predictions");
    localStorage.removeItem("sports490-prediction-results");

    // Clear current predictions
    predictions = {};

    // Show the games again
    displayGames();
}

document.getElementById("reset-predictions")
    .addEventListener("click", resetPredictions);


saveTokenBalance();

