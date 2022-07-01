highScoreBtn = document.querySelector(".trophy");
menuScaffold = document.querySelector(".menuScaffold");
historyScaffold = document.querySelector(".history");
historyBackBtn = document.querySelector(".historyBackBtn");

highScoreBtn.addEventListener("click", () => {
  menuScaffold.style.display = "none";
  historyScaffold.style.display = "flex";
});

historyBackBtn.addEventListener("click", () => {
  menuScaffold.style.display = "block";
  historyScaffold.style.display = "none";
});

fetchHistory = async () => {
  fetchHistoryData = await fetch(
    "https://v-1-multiplayer-b436a-default-rtdb.asia-southeast1.firebasedatabase.app/history.json"
  );
  historyDataJson = await fetchHistoryData.json();
  historyInnerHtml = Object.values(historyDataJson).map(
    (ele) => `<div class="historyListElement">
              <div class="playerInfoHistory winningInfo">
                <img src="assets/menu/p${ele.winnerSprite}.JPG" />
                <div>
                  <p>Win</p>
                  <p>${ele.winnerName}</p>
                </div>
              </div>
              <span class="vs">VS</span>
              <div class="playerInfoHistory loosingInfo">
                <div>
                  <p>Win</p>
                  <p>${ele.looserName}</p>
                </div>
                <img src="assets/menu/p${ele.looserSprite}.JPG" />
              </div>
            </div>`
  );
  document.querySelector(".historyList").innerHTML = historyInnerHtml;
};
fetchHistory();

historyFlag = false;

createHistory = async (winnerName, winnerSprite, looserName, looserSprite) => {
  if (!historyFlag) {
    historyResponse = await fetch(
      "https://v-1-multiplayer-b436a-default-rtdb.asia-southeast1.firebasedatabase.app/history.json",
      {
        method: "POST",
        body: JSON.stringify({
          winnerName,
          winnerSprite,
          looserName,
          looserSprite,
        }),
      }
    );

    fetchHistory();
  }
};
