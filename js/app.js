
const loadPhoneData = () => {
    const searchField = document.getElementById("input-field");
    const searchPhone = searchField.value;
    searchField.value = '';
    
        const url = `
        https://openapi.programming-hero.com/api/phones?search=${searchPhone}
        `;
        fetch(url)
        .then((res) => res.json())
        .then((data) => displayPhone(data.data));  
};


const displayPhone = (phones) => {
    console.log (phones);
        const searchResult = document.getElementById ('search-result');
         phones.forEach(phone => {
             const div = document.createElement('div');
             div.classList.add('col');
             div.innerHTML = `
             <div class="card h-100">
                <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <p class="card-text">${phone.brand}</p>
                  <button onclick="loadDetails ('${phone.slug}')" class ="btn btn-info"> Details</button>
                </div>
              </div>
             `
             searchResult.appendChild(div);
         });
      
}


const loadDetails = (phoneId) => {
    const url = `
    https://openapi.programming-hero.com/api/phone/${phoneId}
    `;
    fetch (url)
    .then (res => res.json())
    .then (data => displayDetails (data.data));
}

const displayDetails = (detail) => {
    console.log(detail);
    const div = document.createElement('div');
    console.log(detail.mainFeatures)
    div.classList.add('col');
    div.innerHTML = `
    <div class="card h-100">
       <img src="${detail.image}" class="card-img-top img-fluid" alt="...">
       <div class="card-body">
         <h5 class="card-title">${detail.name}</h5>
         <p class="card-text">Chipset: ${detail.mainFeatures.chipSet}</p>
         <p class="card-text">Displaysize: ${detail.mainFeatures.displaySize}</p>
         <p class="card-text">Memory: ${detail.mainFeatures.memory}</p>
         <p class="card-text">Storage: ${detail.mainFeatures.storage}</p>
         <p class="card-text">Sensors: ${detail.sensors}</p>
         <p class="card-text">Releasedate: ${detail.releaseDate}</p>
       </div>
     </div>
    `
    document.getElementById('detail-container').appendChild (div);
}