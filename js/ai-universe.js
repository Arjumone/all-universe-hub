const loadCard = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  const cards = data.data.tools;
  // console.log(cards);
  displayCard(cards);
};
const displayCard = (cards) => {
  const alCardContainer = document.getElementById("al-card-container");
  alCardContainer.innerText = "";

  cards= cards.slice(0,6);

  // console.log(cards);
  cards.forEach((card) => {
    console.log(card);
    const cardDiv = document.createElement("div");
    cardDiv.classList = `card bg-base-100 shadow-xl`;
    cardDiv.innerHTML = `
        <figure class='p-8'><img src="${card.image}" /></figure>
        <div class="card-body">
        <h1 class="font-bold text-xl">Feature</h1>
        <ol>
        <li>1.${card.features[0]}</li>
        <li>2.${card.features[1]}</li>
        <li>3.${card.features[2]}</li>
        </ol>
        <hr>

        <p class="font-bold text-2xl">${card.name}</p>
        <p>${card.published_in}</p>
        <i class="fa-solid fa-arrow-right"></i>
        </div>
`;
    alCardContainer.appendChild(cardDiv);
  });
};

// const handleSearchBtn=()=>{
//   const searchText = document.getElementById('search-text').value;
//   // console.log(searchText);
// }
const handleShowMoreBtn = ()=>{
  // console.log('hello');
  loadCard()
}


loadCard();
