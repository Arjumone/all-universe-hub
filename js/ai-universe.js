const loadCard = async () =>{
    const url =`https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayCard(data.data);
   
}
const displayCard = cards =>{
  

toggleSpinner(true);
const cardContainer = document.getElementById('card-container');
// cards.tools = cards.slice(0,6)
const showMore = document.getElementById('show-more');
// console.log(showMore);
if(cards.length>6){
  cards = cards.slice(0,6);
  showMore.classList.remove('d-none');
}
else{
  showMore.classList.add('d-none');
}
cards.tools.forEach(card => {
  
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.innerHTML = `
    <div class="card mb-2 ">
    <img src="${card.image}" class=" w-100 h-50 px-4 py-4  center" alt="...">
    <div class="card-body">
    
      <div>
      <h5 class="card-title bold ms-3"><span id="">Features</span></h5>

      <ol>
      <li>${card.features[0]}</li>
      <li>${card.features[1]}</li>
      <li>${card.features[2]}</li>
       </ol>
      </div>

      <div class="border"></div>

    </div>
    <div class="d-flex justify-content-between px-4 mb-3 ">
    <div>
    <p class="card-text fw-bold">${card.name}</p>
   <div class="d-flex gap-2">
   <i class="fa-solid fa-calendar-days"></i>
   <p class="card-text ">${card.published_in}</p>
   </div>
    </div>
    
  
    <button class="text-danger bg-danger-subtle rounded-circle border border-0  ">
    <p>${card.id}</p>
     <i class="fas fa-arrow-right " onclick="showCardDetails('${card.id}')"></i>
    
    </button>
    
  </div>
    `
    cardContainer.appendChild(cardDiv);
    
});
toggleSpinner(false);
};
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('spinner');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none');
  }
};

const showCardDetails = new_id => {
  let url = `https://openapi.programming-hero.com/api/ai/tool/${new_id}`
  // console.log(url);
  fetch(url)
  .then(res => res.json())
  .then(data =>showDetails (data.data))
}
const showDetails = newCard =>{
  // console.log(newCard);
  const cardDetails = document.getElementById('card-details');
  
  
  cardDetails.innerHTML = `
  <div class="modal-dialog position-relative">
                <div class="modal-content border w-75 h-50 ">
                  <div class="modal-header">
                   
                    <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close" onclick="close"></button>
                  </div>
                  <div class="row row-cols-1 row-cols-md-2  h-100 px-4 py-2">
                  <div class="col">
                    <div class="card  w-100">
                      
                      <div class="card-body border bg-danger-subtle bg-opacity-10 ">
                        
                        <p class="card-text fs-6 fw-bolder px-4 mt-2">${newCard.description}</p>
                       <div class="d-flex gap-3 px-4">
                       <p class="card-text text-success fw-semibold border bg-light rounded px-2 py-2">${newCard.pricing[0].price} <br> Basic</p>
                       <p class="card-text text-danger-emphasis fw-semibold border bg-light rounded px-2 py-2">${newCard.pricing[1].price} <br> Pro</p>
                       <p class="card-text text-danger fw-semibold border bg-light rounded px-1 py-1">${newCard.pricing[2].price} <br> Enterprise</p>
                      
                       </div>
                       <div class="d-flex mt-2">
                       <div>
                       <p class="card-text fs-6 fw-bolder px-4 "><span>Features</span></p>
                       <ul>
                       <li>${newCard.features}</li>
                       <li></li>
                       <li></li>
                       </ul>
                       </div>
                       <div>
                       <div>
                       <p class="card-text fs-6 fw-bolder px-4"><span>Integrations</span></p>
                       <ul>
                       <li>${newCard.integrations ? newCard.integrations[0] : "No Data Found"}</li>
                       <li>${newCard.integrations ? newCard.integrations[1] : "No Data Found"}</li>
                       <li>${newCard.integrations ? newCard.integrations[2] : "No Data Found"}</li>
                       </ul>
                       </div>
                       </div>
                       </div>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card h-100 w-100">
                     
                      <div class="card-body">
                     <div>
                     <img src="${newCard.image_link[0]}" class=" w-100 h-75   center" alt="...">
                     <button class=" position-absolute top-0 end-0 border-0 rounded bg-danger mt-2 me-2">${newCard.accuracy.score}<span>%accuracy</span></button>
                     </div>
                        <p class="card-text">${newCard.input_output_examples }</p>
                        <p class="card-text">${newCard.input_output_examples }</p>
                      </div>
                    </div>
                  </div>
                 
                 
                </div>
                  </div>
                  
                </div>
              </div>
   `
}
const close = closeIt =>{
console.log(closeIt);
const closeDetails = document.getElementById('modal');
}
loadCard();