// fetching(load) all data
const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const allData = await res.json();
    displayData(allData.data.tools);
}

// display all data
const displayData = (dataList) => {
    console.log(dataList);
    const cardContainer = document.getElementById('card-container');
    dataList.forEach(data => {
        const { id, name, features, published_in, image } = data;
        cardContainer.innerHTML += `     

        <div class="col">
            <div class="card h-100 shadow p-3 mb-5 bg-body rounded">
                <img src="${image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Features</h5>
                    <p class="card-text">
                        <!-- card details -->
                    <ul id="features-${id}" class="list-unstyled features-ul">
        
                    </ul>
                    <hr>
                    <!-- date and modal details -->
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5>${name}</h5>
                            <p><i class="bi bi-calendar4-week px-1"></i>${published_in}</p>
                        </div>
                        <button onclick="getDetails('${id}')" class="rounded rounded-circle  border-0 text-danger h3"><i
                                class="bi bi-arrow-right-short"></i></button>
                    </div>
                    </p>
                </div>
            </div>
        </div>
    
        `
        let countFeatures = 1;
        console.log(features);
        const ul = document.getElementById(`features-${id}`)
        features.forEach(feature => {
            ul.innerHTML += `<li>${countFeatures++}. ${feature}</li>`;
            console.log(feature)
        });
    });
}



// invoking all data
loadData();
