
const startingBudget = 1000;
const positions = ["QB", "RB", "WR", "TE"];
const draftOrder = [
    "user", "cpu", "cpu", "user",
    "user", "cpu", "cpu", "user"
];

const players = [
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
];

const games = [
    { home: "Chiefs", away: "Bills" },
    { home: "Eagles", away: "Cowboys" },
    { home: "Ravens", away: "Bengals" }
];

let userLineup = [];
let cpuLineup = [];
let userBudget = startingBudget;
let cpuBudget = startingBudget;
let currentPick = 0;
let matchupPlayed = false;

function playerTaken(player) {
    return [...userLineup, ...cpuLineup].some(
        selected => selected.name === player.name
    );
}

function positionTaken(lineup, position) {
    return lineup.some(player => player.position === position);
}

// Check that a team can still afford its remaining positions.
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
        const available = players.filter(other =>
            other.name !== player.name &&
            other.position === position &&
            !playerTaken(other)
        );

        if (available.length === 0) return false;

        const cheapest = Math.min(...available.map(p => p.cost));
        minimumFutureCost += cheapest;
    }

    return player.cost + minimumFutureCost <= budget;
}

function displayPlayers() {
    const playerList = document.getElementById("player-list");
    playerList.innerHTML = "";

    const yourTurn = draftOrder[currentPick] === "user";

    players.forEach(player => {
        const card = document.createElement("div");
        card.className = "player-card";

        const taken = playerTaken(player);
        const allowed = yourTurn &&
            canDraft(player, userLineup, userBudget);

        card.innerHTML = `
            <h3>${player.name}</h3>
            <p>${player.team} | ${player.position}</p>
            <p>Cost: ${player.cost} tokens</p>
            <p>Rating: ${player.rating}</p>
        `;

        const button = document.createElement("button");
        button.textContent = taken ? "Drafted" : "Draft Player";
        button.disabled = !allowed;

        button.addEventListener("click", () => {
            draftPlayer(player);
        });

        card.appendChild(button);
        playerList.appendChild(card);
    });
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
    while (draftOrder[currentPick] === "cpu") {
        const choices = players.filter(player =>
            canDraft(player, cpuLineup, cpuBudget)
        );

        if (choices.length === 0) {
            document.getElementById("draft-message").textContent =
                "The CPU cannot complete its roster.";
            break;
        }

        // CPU chooses the highest-rated affordable player.
        choices.sort((a, b) => b.rating - a.rating);

        const selected = choices[0];
        cpuLineup.push(selected);
        cpuBudget -= selected.cost;
        currentPick++;
    }
}

function displayLineup(elementId, lineup) {
    const container = document.getElementById(elementId);
    container.innerHTML = "";

    positions.forEach(position => {
        const player = lineup.find(p => p.position === position);
        const card = document.createElement("div");

        if (player) {
            card.className = "lineup-card";
            card.innerHTML = `
                <h4>${position}: ${player.name}</h4>
                <p>${player.team}</p>
                <p>${player.cost} tokens | Rating: ${player.rating}</p>
            `;
        } else {
            card.className = "empty-slot";
            card.textContent = `${position}: Not drafted`;
        }

        container.appendChild(card);
    });
}

function updateDraft() {
    document.getElementById("remaining-budget").textContent =
        `${userBudget} Tokens`;

    document.getElementById("cpu-budget").textContent =
        `${cpuBudget} Tokens`;

    const finished = currentPick >= draftOrder.length;

    document.getElementById("current-pick").textContent =
        finished ? "8 / 8" : `${currentPick + 1} / 8`;

    document.getElementById("turn-message").textContent =
        finished ? "Draft Complete!" :
        draftOrder[currentPick] === "user" ?
        "Your Turn to Draft" : "CPU Drafting";

    document.getElementById("play-matchup").disabled =
        !finished || matchupPlayed;

    displayPlayers();
    displayLineup("lineup-list", userLineup);
    displayLineup("cpu-lineup", cpuLineup);
}

function calculateScore(lineup) {
    let total = 0;

    lineup.forEach(player => {
        // Simulated fantasy score based on rating.
        const points = Math.round(
            player.rating * (0.15 + Math.random() * 0.15)
        );
        total += points;
    });

    return total;
}

function playMatchup() {
    if (currentPick < draftOrder.length || matchupPlayed) return;

    matchupPlayed = true;

    const userScore = calculateScore(userLineup);
    const cpuScore = calculateScore(cpuLineup);

    const result = document.getElementById("matchup-result");
    result.innerHTML = "";

    const scoreText = document.createElement("p");
    scoreText.textContent =
        `Your Team: ${userScore} points | CPU: ${cpuScore} points`;

    const winnerText = document.createElement("p");

    if (userScore > cpuScore) {
        winnerText.textContent = "You won the matchup!";
        winnerText.className = "result-win";
    } else if (cpuScore > userScore) {
        winnerText.textContent = "The CPU won the matchup!";
        winnerText.className = "result-loss";
    } else {
        winnerText.textContent = "The matchup ended in a tie!";
        winnerText.className = "result-tie";
    }

    result.appendChild(scoreText);
    result.appendChild(winnerText);

    updateDraft();
}

function resetDraft() {
    userLineup = [];
    cpuLineup = [];
    userBudget = startingBudget;
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

    games.forEach(game => {
        const card = document.createElement("div");
        card.className = "game-card";
        card.innerHTML = `
            <h3>${game.away} vs. ${game.home}</h3>
            <p>Prediction coming soon</p>
        `;
        gameList.appendChild(card);
    });
}

document.getElementById("reset-draft")
    .addEventListener("click", resetDraft);

document.getElementById("play-matchup")
    .addEventListener("click", playMatchup);

updateDraft();
displayGames();
