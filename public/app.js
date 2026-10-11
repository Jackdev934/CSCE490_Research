// Sample NFL players for the fantasy draft
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

// Sample NFL matchups for predictions
const games = [
    { home: "Chiefs", away: "Bills" },
    { home: "Eagles", away: "Cowboys" },
    { home: "Ravens", away: "Bengals" }
];

function displayPlayers() {
    const playerList = document.getElementById("player-list");

    players.forEach(player => {
        const card = document.createElement("div");
        card.className = "player-card";

        card.innerHTML = `
            <h3>${player.name}</h3>
            <p>${player.team} | ${player.position}</p>
            <p>Cost: ${player.cost} tokens</p>
            <p>Rating: ${player.rating}</p>
        `;

        playerList.appendChild(card);
    });
}

function displayGames() {
    const gameList = document.getElementById("game-list");

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

displayPlayers();
displayGames();