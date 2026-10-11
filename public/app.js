
const startingBudget = 1000;
const positions = ["QB", "RB", "WR", "TE"];

const draftOrder = [
    "user", "cpu", "cpu", "user",
    "user", "cpu", "cpu", "user"
];

// Player data organized by league
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

// Sample games by league
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

// Team colors for prediction buttons
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

// Store predictions for the current browser session
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
    while (draftOrder[currentPick] === "cpu") {
        const choices = getPlayers().filter(player =>
            canDraft(player, cpuLineup, cpuBudget)
        );

        if (choices.length === 0) {
            document.getElementById("draft-message").textContent =
                "The CPU cannot complete its roster.";
            break;
        }

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
        finished ? "Draft Complete!" : "Your Turn to Draft";

    document.getElementById("play-matchup").disabled =
        !finished || matchupPlayed;

    displayPlayers();
    displayLineup("lineup-list", userLineup);
    displayLineup("cpu-lineup", cpuLineup);
}

function calculateScore(lineup) {
    let total = 0;

    lineup.forEach(player => {
        total += Math.round(
            player.rating * (0.15 + Math.random() * 0.15)
        );
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

    const scores = document.createElement("p");
    scores.textContent =
        `Your Team: ${userScore} points | CPU: ${cpuScore} points`;

    const winner = document.createElement("p");

    if (userScore > cpuScore) {
        winner.textContent = "You won the matchup!";
        winner.className = "result-win";
    } else if (cpuScore > userScore) {
        winner.textContent = "The CPU won the matchup!";
        winner.className = "result-loss";
    } else {
        winner.textContent = "The matchup ended in a tie!";
        winner.className = "result-tie";
    }

    result.appendChild(scores);
    result.appendChild(winner);

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

function makePrediction(gameIndex, team) {
    const key = `${currentLeague}-${gameIndex}`;
    predictions[key] = team;
    displayGames();
}

function displayGames() {
    const gameList = document.getElementById("game-list");
    gameList.innerHTML = "";

    document.getElementById("prediction-league").textContent =
        currentLeague === "COLLEGE" ? "COLLEGE" : currentLeague;

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

        if (predictions[key]) {
            const confirmation = document.createElement("p");
            confirmation.className = "prediction-confirmation";
            confirmation.textContent =
                `Your prediction: ${predictions[key]} to win`;
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

updateDraft();
displayGames();
