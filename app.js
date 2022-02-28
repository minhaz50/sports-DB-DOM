const allPlayers = () => {
  const searchValue = document.getElementById("search-box").value;

  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPlayerDetails(data.player));
};

const displayPlayerDetails = (players) => {
  for (const player of players) {
    const parent = document.getElementById("player-container");
    const div = document.createElement("div");
    div.innerHTML = `
              <div class="card border-2 p-5 m-2">
                  <div class="pro-pic">
                       <img class="w-25" src="${player.strThumb}" alt="" />
                   </div>
                  <h2>Name: ${player.strPlayer}</h2>
                  <h2>Country: ${player.strNationality}</h2>
                  <p>${player.strDescriptionEN} </p>
                  <div class="allbutton">
                    <button class="btn btn-danger">Delete</button>
                    <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
                  </div>
              </div>
              `;
    parent.appendChild(div);
  }
  console.log(players);
};

const details = (info) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${info}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => setDetails(data.players[0]));
};

const setDetails = (info) => {
  document.getElementById("details-container").innerHTML = `
  <div>
        <img class="w-25" src="${info.strThumb}" alt="" />
        <h1 class="text-primary">Name: ${info.strPlayer}</h1>
        <h2>Sports: ${info.strSport} </h2>
  </div>
  `;
  console.log(info);
};
