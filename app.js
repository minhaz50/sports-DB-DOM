const allPlayers = () => {
  document.getElementById("player-container").innerHTML = "";
  document.getElementById("spinner").style.display = "block";
  const searchValue = document.getElementById("search-box").value;

  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
  console.log(url);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.player == null) {
        document.getElementById("spinner").style.display = "block";
        document.getElementById("error").innerHTML =
          "Please Enter a valid name";
        console.log("please enter a valid name");
      } else {
        displayPlayerDetails(data.player);
        document.getElementById("spinner").style.display = "none";
      }
    });
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
                  <p>${player.strDescriptionEN?.slice(0, 100)} </p>
                  <div class="allbutton">
                    <button class="btn btn-danger">Delete</button>
                    <button onclick="details('${
                      player.idPlayer
                    }')" class="btn btn-success">Details</button>
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
  console.log(info.strGender);

  if (info.strGender == "Male") {
    document.getElementById("male").style.display = "block";
    document.getElementById("female").style.display = "none";
  } else {
    document.getElementById("female").style.display = "block";
    document.getElementById("male").style.display = "none";
  }

  document.getElementById("details-container").innerHTML = `
  <div>
        <img class="w-25" src="${info.strThumb}" alt="" />
        <h1 class="text-primary">Name: ${info.strPlayer}</h1>
        <h2>Sports: ${info.strSport} </h2>
  </div>
  `;
};
