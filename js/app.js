

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
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Card title</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
              </div>
             `
             searchResult.appendChild(div);
            //  const {phone_name} = phone
            //  console.log (phone_name);
         });
      
}