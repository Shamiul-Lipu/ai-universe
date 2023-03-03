// fetching(load) all data
const loadData = async (datalimit) => {
    // start spinner
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const allData = await res.json();
    displayData(allData.data.tools, datalimit);
    // Show-all button
    document.getElementById('btn-show-all').addEventListener('click', function () {
        // star spinner
        toggleSpinner(true);
        loadData(6);
    })
}

// adding button sort by date
document.getElementById('btn-sort').addEventListener('click', function () {
    //     loadSortData();
    // fetching(load) and sending the data by date sort
    const loadSortData = async (datalimit) => {
        // start spinner
        toggleSpinner(true);
        const url = `https://openapi.programming-hero.com/api/ai/tools`;
        const res = await fetch(url);
        const allData = await res.json();
        allData.data.tools.sort(function (a, b) {
            return new Date(a.published_in) - new Date(b.published_in)
        });
        displayData(allData.data.tools, datalimit);
        // Show-all button
        document.getElementById('btn-show-all').addEventListener('click', function () {
            // star spinner
            toggleSpinner(true);
            loadSortData(6);
        })
    }
    loadSortData();
})

// display all data
const displayData = (dataList, datalimit) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    // limit data/show-all
    const showAllBtn = document.getElementById('show-all');
    if (datalimit === undefined) {
        dataList = dataList.slice(0, 6);
        showAllBtn.classList.remove('d-none');
    }
    else {
        dataList = dataList;
        showAllBtn.classList.add('d-none');
    }

    // display data on single card
    dataList.forEach(data => {
        const { id, name, features, published_in, image } = data;
        cardContainer.innerHTML += `     

        <div class="col">
            <div class="card h-100 shadow p-3 mb-5 bg-body rounded">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bolder">Features</h5>
                    <p class="card-text">
                        <!-- card details -->
                    <ul id="features-${id}" class="list-unstyled features-ul">
        
                    </ul>
                    <hr>
                    <!-- date and modal details -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="fw-bolder">${name}</h5>
                            <p><i class="bi bi-calendar4-week px-1"></i>${published_in}</p>
                        </div>
                        <button onclick="loadModalData('${id}')" class="rounded rounded-circle  border-0 text-danger h3" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                                class="bi bi-arrow-right-short"></i></button>
                    </div>
                    </p>
                </div>
            </div>
        </div>
    
        `
        // card feastures list
        let countFeatures = 1;
        const ul = document.getElementById(`features-${id}`)
        features.forEach(feature => {
            ul.innerHTML += `<li>${countFeatures++}. ${feature}</li>`;
        });
    });
    // stop spinner
    toggleSpinner(false);
}

// toggle Spinner functionality
const toggleSpinner = (isLoading) => {
    const spinnig = document.getElementById('loding-spinner');
    isLoading ? spinnig.classList.remove('d-none') : spinnig.classList.add('d-none');
}


// fetching data on modal
const loadModalData = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const modalData = await res.json();
    displayModalData(modalData.data);
}

// data display on modal's card
const displayModalData = (modalData) => {
    const { id, description, pricing, features, integrations, input_output_examples, image_link, accuracy } = modalData;
    console.log(modalData, id);


    const cards = document.getElementById('card-details');
    cards.textContent = '';

    // Modal Card display
    cards.innerHTML = `
    
    <div class="col">
        <div class="card card-one">
            <div class="card-body">
                <h6 class="card-title fw-bolder">${description}</h6>
                <div class="d-flex text-center pricing-plan">
                    <p class="card-text p-2 m-1 bg-white rounded-3 text-success fw-bold">
                        ${pricing ? pricing[0]?.price : 'Free of cost/'}<br>${pricing ? pricing[0]?.plan : 'Basic'}</p>
                    <p class="card-text p-2 m-1 bg-white rounded-3 text-warning fw-bold">
                    ${pricing ? pricing[1]?.price : 'Free of cost/'}<br>${pricing ? pricing[1]?.plan : 'Pro'}</p>
                    <p class="card-text p-2 m-1 bg-white rounded-3 text-danger fw-bold">
                    ${pricing ? pricing[2]?.price : 'Pricing not fixed yet!'}<br>${pricing ? pricing[2]?.plan : 'Enterprise!'}</p>
                </div>
                <div class="d-flex justify-content-between ai-details">
                    <div>
                        <h6 class="fw-bolder">Features</h6>
                        <ul id="modal-features-${id}">
                            
                        </ul>
                    </div>
                    <div>
                        <h6 class="fw-bolder">Integrations</h6>
                        <ul id="modal-integrations-${id}">
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
    <div class="col">
        <div class="card text-center position-relativ">
            <div>
            <span id="accuracy-${id}" class="px-3 py-2 badge rounded-3 text-bg-danger bedge-position position-absolute badge-position">${accuracy ? accuracy?.score * 100 : ''}% accuracy</span>
                <img src="${image_link[0]}" class="card-img-top p-1 " alt="card image">
            </div>
            <div class="card-body">
                <h6 class="card-title fw-bolder">${input_output_examples ? input_output_examples[0]?.input : 'no input examples found'}</h6>
                <p class="card-text">${input_output_examples ? input_output_examples[0]?.output : 'No, Not yet, Take a break!'}</p>
            </div>
        </div>
    </div>

    `
    // modal features details
    const ulFeature = document.getElementById(`modal-features-${id}`);
    for (const key in features) {
        ulFeature.innerHTML += `<li>${features[key].feature_name}</li>`;
    }
    // modal integrations details
    const ulIntegrations = document.getElementById(`modal-integrations-${id}`);
    if (integrations === null) {
        return ulIntegrations.innerHTML += `<li>No Data Found</li>`;
    };
    integrations.forEach(integration => {
        ulIntegrations.innerHTML += `<li>${integration}</li>`;
    })

    // accurecy
    if (accuracy.score === null || accuracy.score === 'null') {
        const accuracyId = document.getElementById(`accuracy-${id}`);
        accuracyId.classList.add('d-none');
        console.log(`accuracy-${id}`);
    }

}


// adding button sort by date
// document.getElementById('btn-sort').addEventListener('click', function () {
//     loadSortData();
// })

// invoking all data
loadData();
// invoking modal data
// loadModalData('03');

