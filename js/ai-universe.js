  
  const loadCard = async (isShowAll) => {
    toggleLoadingSpinner(true)
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  const cards = data.data.tools;
  displayCard(cards,isShowAll);
};
const displayCard = (cards,isShowAll) => {
  // console.log(cards);
  const alCardContainer = document.getElementById("al-card-container");
  alCardContainer.innerText = "";
  
  const showAllContainer = document.getElementById('show-all-container');
  if(cards.length<6 && !isShowAll){
    showAllContainer.classList.add('hidden')
  }
  else{
    showAllContainer.classList.remove('hidden')
  }

  if(!isShowAll){
    cards= cards.slice(0,6);
  }

  cards.forEach((card) => {
    // console.log(card);
    const cardDiv = document.createElement("div");
    cardDiv.addEventListener('click',function(){
      handleShowDetails(card.id)
    })
    cardDiv.classList = `card bg-base-100 shadow-xl`;
    cardDiv.innerHTML = `
        <figure class='p-8'><img src="${card.image? card.image : 'No image found'}" /></figure>
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
  toggleLoadingSpinner(false)
};
const handleShowMoreBtn = (allCard)=>{
      loadCard(true)
  
}
const toggleLoadingSpinner= (isLoading)=>{   //where the function call
  const loadingSpinner = document.getElementById('loadingSpinner')
  if(isLoading){
    loadingSpinner.classList.remove('hodden');
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
};
const handleShowDetails = async(id) =>{
  console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await res.json();
    console.log(data);
    const card = data.data
    showDetails(card)
}

const showDetails = (card) =>{
  // console.log(card);

  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML=`
  <dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">${card.description}</h3>
    <img class="w-56 h-56" src="${card.image_link[0]}"/>
    <p class="py-4"></p>
    <div class="modal-action border-none ">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn rounded-3xl font-semibold -mt-96 -me-6 bg-red-500 text-2xl">X</button>
    </div>
  </form>
</dialog>
  `

  my_modal_1.showModal()
}

loadCard();









  // const handleSearchBtn=()=>{
//   const searchText = document.getElementById('search-text').value;
//   // console.log(searchText);
// }