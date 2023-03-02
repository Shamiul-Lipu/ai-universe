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
}


// invoking all data
loadData();


/* 

<div class="col ">
    <div class="card shadow p-3 mb-5 bg-body rounded">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${Card title}</h5>
            <ul class="list-unstyled">
                <li><span>${1 count}</span>${list....}</li>
            </ul>
            <hr>
            <!-- date and details -->
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5>you chat 2.0</h5>
                    <p><i class="bi bi-calendar4-week"></i></p>
                </div>
                <button class="rounded rounded-circle  border-0 text-danger h3"><i
                        class="bi bi-arrow-right-short"></i></button>
            </div>
        </div>
    </div>
</div>


 */
