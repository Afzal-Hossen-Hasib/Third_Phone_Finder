
// ---------------------------------------
//      Update Input Field Section
// ---------------------------------------
const loadPhoneData = () => {
    const searchField = document.getElementById("input-field");
    const errorMassage = document.getElementById ('error-massage');
    const searchPhone = searchField.value;

    // Clear Data 
    searchField.value = '';

    // Error Handle 
    if (searchPhone == '') {
      errorMassage.innerText = "Please Enter A Phone Name";
    }

    else {
      // Load Data 
      const url = `
      https://openapi.programming-hero.com/api/phones?search=${searchPhone}
      `;
      fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhone(data.data)); 
    } 
};

// -------------------------------------------------
//      Update Phone Search And Display Section
// -------------------------------------------------
const displayPhone = (phones) => {

        const slicePhone = phones.slice (0,20);
        const searchResult = document.getElementById ('search-result');
        const errorMassage = document.getElementById ('error-massage');
        searchResult.textContent = '';

        // Error Handle 
        if (slicePhone.length == 0) {
          errorMassage.innerText = "Please Enter A Valid Phone Name";
          searchResult.textContent = ''
        }

        else {
            slicePhone.forEach(phone => {
              
            // Creat Element 
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 phone-container">
               <img src="${phone.image}" class="card-img-top w-50" alt="...">
               <div class="card-body">
                 <h5 class="card-title">Name : ${phone.phone_name}</h5>
                 <p class="card-text">Brand : ${phone.brand}</p>
                 <button onclick="loadDetails ('${phone.slug}')" class ="button">See Details</button>
               </div>
             </div>
            `
            searchResult.appendChild(div);
            errorMassage.innerHTML = "";
        });
         }
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
    
    const phoneDetail = document.getElementById('detail-container');
    phoneDetail.textContent = '';

    // Creat Element 
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card h-100 phone-container">
          <img src="${detail.image}" class="card-img-top w-25" alt="...">
          <div class="card-body">

          <h5 class="card-title"><span class = "detail-title"> Brand: </span> ${detail.name}</h5>
          <h5 class="card-title"><span class = "detail-title"> Name: </span> ${detail.brand}</h5>

          <h2 class = "mt-4 title"> Main Features </h2>
          <p class="card-text"> <span class = "detail-title"> Chipset: </span> ${detail.mainFeatures.chipSet}</p>
          <p class="card-text"> <span class = "detail-title"> Displaysize: </span> ${detail.mainFeatures.displaySize}</p>
          <p class="card-text"> <span class = "detail-title"> Memory: </span> ${detail.mainFeatures.memory}</p>
          <p class="card-text"> <span class = "detail-title"> Storage: </span> ${detail.mainFeatures.storage}</p>

          <h2 id = "sensonr-title" class = "mt-4 title"> Sensors </h2>
          <div id = "sensor-div"></div> 
        
          <h2 class = "mt-4 title"> Other Features </h2>
          <div id = "other-div"></div> 

          <h2 class = "mt-4 title"> Release Date </h2>
         <p class="card-text"> <span class = "detail-title"> Releasedate: </span> ${detail.releaseDate?detail.releaseDate:'No Release Date'}</p>
         
       </div>
     </div>
    `
    phoneDetail.appendChild (div);
    sensors(detail.slug)

}



const sensors = (id) => {
  const url = `
    https://openapi.programming-hero.com/api/phone/${id}
    `;
    fetch (url)
    .then (res => res.json())
    .then (data => sensorData (data));
}

const sensorData = (sensor) => {

    const sensorContainer = document.getElementById ('sensor-div');
    const sensorData = sensor.data.mainFeatures.sensors;

    if (sensorData) {
        sensorData.forEach ((sensorDataText) => {
        const sensorElement = document.createElement ('p');
        sensorElement.innerText = `${sensorDataText}`;
        sensorContainer.appendChild (sensorElement);
      })
    } 
    else {
      const sensonrTitle = document.getElementById ('sensonr-title');
      sensonrTitle.classList.add ('d-none');
    }

    const otherDiv = document.getElementById ('other-div');
    console.log (sensor);
    const otherData = sensor.data.others;
    // console.log (otherData);
    const otherDataArr = Object.entries (otherData);
    // console.log (otherDataArr);
    otherDataArr.forEach (([key, value]) => {
      // console.log (key, value);
      // console.log (v)
      
      const otherElement = document.createElement ('div');
      
        otherElement.innerHTML = `<p class="card-text pt-3"> <span class = "detail-title"> ${key}: </span> ${value}</p>`
        otherDiv.appendChild (otherElement);
        
    })
}










{/* <p class="card-text"> <span class = "detail-title"> Bluetooth: </span> ${detail.others.Bluetooth}</p>
          <p class="card-text"> <span class = "detail-title"> GPS: </span> ${detail.others.GPS}</p>
          <p class="card-text"> <span class = "detail-title"> NFC: </span> ${detail.others.NFC}</p>
          <p class="card-text"> <span class = "detail-title"> Radio: </span> ${detail.others.Radio}</p>
          <p class="card-text"> <span class = "detail-title"> USB: </span> ${detail.others.USB}</p>
          <p class="card-text"> <span class = "detail-title"> WLAN: </span> ${detail.others.WLAN}</p> */}