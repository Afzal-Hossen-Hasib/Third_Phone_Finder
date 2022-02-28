
// ---------------------------------------
//      Update Input Field Section
// ---------------------------------------
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

// -------------------------------------------------
//      Update Phone Search And Display Section
// -------------------------------------------------
const displayPhone = (phones) => {
    console.log (phones);
        const searchResult = document.getElementById ('search-result');
         phones.forEach(phone => {
             const div = document.createElement('div');
             div.classList.add('col');
             div.innerHTML = `
             <div class="card h-100 phone-container">
                <img src="${phone.image}" class="card-img-top w-50" alt="...">
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

// ----------------------------------------
//     Update Details Field Section
// ----------------------------------------
const loadDetails = (phoneId) => {
    const url = `
    https://openapi.programming-hero.com/api/phone/${phoneId}
    `;
    fetch (url)
    .then (res => res.json())
    .then (data => displayDetails (data.data));
}

// --------------------------------------------
//      Update Phone Details Information
// --------------------------------------------
const displayDetails = (detail) => {
    console.log(detail);
    const detailInformation = document.getElementById('detail-container');
    const div = document.createElement('div');
    console.log(detail.mainFeatures)
    div.classList.add('col');
    div.innerHTML = `
    <div class="card h-100 phone-container">
       <img src="${detail.image}" class="card-img-top w-25" alt="...">
       <div class="card-body">
         <h5 class="card-title">${detail.name}</h5>
         <h5 class="card-title">${detail.name}</h5>
         <p class="card-text"> <span class = "detail-title"> Chipset: </span> ${detail.mainFeatures.chipSet}</p>
         <p class="card-text"> <span class = "detail-title"> Displaysize: </span> ${detail.mainFeatures.displaySize}</p>
         <p class="card-text"> <span class = "detail-title"> Memory: </span> ${detail.mainFeatures.memory}</p>
         <p class="card-text"> <span class = "detail-title"> Storage: </span> ${detail.mainFeatures.storage}</p>
         <p class="card-text"> <span class = "detail-title"> Sensors: </span> ${detail.sensors}</p>
         <p class="card-text"> <span class = "detail-title"> Releasedate: </span> ${detail.releaseDate}</p>
       </div>
     </div>
    `
    detailInformation.appendChild (div);
}