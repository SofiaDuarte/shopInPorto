let urlParams = new URLSearchParams(window.location.search);
let origin = urlParams.get('origin');
let categoriesValues = [];
let zonesValues = {};
let ratingValues = {1: 26, 2: 25, 3: 30, 4: 33, 5: 26};
let scoreList = [{id: 5, name: 'Excelente | 5,0'}, {id: 4, name: 'Muito Bom | 4,0 a 4,9'}, {id: 3, name: 'Médio | 3,0 a 3,9'}, {id: 2, name: 'Fraco | 2,0 a 2,9'}, {id: 1, name: 'Terrível | 1,0 a 1,9'}];
let myStoresArray = [];
let storesList = [];
const filters = {categories: [],zones: [], rating:[]}

const createStoreList = () => {
    fetch('/api/getStoresList')
        .then(response => response.json())
        .then(( storesInfo ) => {
            storesInfo = storesInfo.data;
            myStoresArray = storesInfo;
            storesList = storesInfo;
            applyFilters();
            fetchPage();
    });
}

const fetchPage = (page = 1) => {
    let totalResults = myStoresArray.length;
    let pageTotal = totalResults/10;
    let numberOfPages = (pageTotal % 1 != 0) ? (pageTotal+1)|0 : pageTotal;
    
    origin = origin.charAt(0).toUpperCase() + origin.slice(1);
    document.getElementsByTagName("h1")[0].innerText = origin;
    document.getElementsByClassName("title")[0].getElementsByTagName("span")[0].innerText = `${totalResults} resultados`;
    document.getElementsByClassName("breadcrumb-list")[0].getElementsByTagName('span')[0].innerText = origin;

    let htmlList = '';
    let numberCards = 1;
    let initial = (page-1)*10;

    myStoresArray.slice( initial, initial+10).forEach(element => {
        let portoTradicao = '';
        let promoHtml = '';
        
        if(isPrime(element.id)){
            promoHtml = `
            <div class="circle highlight marginrightone">
                <i class="material-icons-round">loyalty</i>
            </div>`;
        }

        if (element.portotradicao === 1) {
            portoTradicao = `
                <div class="circle marginrightone">
                    <i class="material-icons-round ">
                        <div class="square-trad"></div>
                    </i>
                </div>
            `;
        }

        let name = element.name;
        if (name.length > 25) {
            name = name.substring(0, 24) + "...";
        }
        let category = element.category;
        if (category.length > 20) {
            category = category.substring(0, 19) + "...";
        }

        let addClass = "";
        if (numberCards % 2 === 0){
            addClass = "paddingrightnone";
        }else{
            addClass = "paddingleftnone";
        }

        let storeUrl = `store.html?id=${element.id}`;
        if (promoHtml != '') {
            storeUrl += `&promo=1`;
        }

        htmlList += `
            <div class="col-6 ${addClass}">
            <article>
                <div class="icons">
                    ${promoHtml}
                    ${portoTradicao}
                    <div class="circle">
                        <i class="material-icons-round">favorite_border</i>
                    </div>
                </div>
                <a href="${storeUrl}" >
                    <div class="image">
                        <img class="imgfit" src="hv/${element.image[1]}" alt="Imagem ${element.name}" title="Imagem ${element.name}">
                    </div>
                    <div class="name">
                        <p>
                            ${name}
                        </p>
                    </div>
                    <div class="card-info">
                        <div>
                            <span>Categoria: ${category}<br>Zona: ${element.zone}</span>
                        </div>
                        <div class="rating">
                            <div class="align-self-center">
                            ${element.score}
                            </div> 
                            <div class="align-self-center">
                                <i class="material-icons-round">star</i>
                            </div>
                        </div> 
                    </div>
                </a>
            </article>
        </div>`
        numberCards++;
    });

    document.getElementById('store-list').innerHTML = htmlList;
    document.getElementById("pagination").innerHTML='';
    let pagination = document.getElementById("pagination");
    let pageToFetchPrev = page === 1 ? "":`onclick="fetchPage(${page-1})"`;
    pagination.innerHTML = `
        <div class="arrow-left">
            <a href="javascript:void(0)" ${pageToFetchPrev} >
                <i class="material-icons-round">keyboard_arrow_left</i>
            </a>
        </div>
    `;
    for(let i=1; i<=numberOfPages; i++){
        if(i===page){
            pagination.innerHTML += `<button disabled onClick="fetchPage(${i})">${i}</button>`;
        }else{
            pagination.innerHTML += `<button onClick="fetchPage(${i})">${i}</button>`;
        }
    }
    let pageToFetchNext = page === numberOfPages ? page-1:`onclick="fetchPage(${page+1})"`;
    pagination.innerHTML += `
        <div class="arrow-left">
            <a href="javascript:void(0)" ${pageToFetchNext}>
                <i class="material-icons-round">keyboard_arrow_right</i>
            </a>
        </div>
    `;
    document.getElementById('results').innerHTML = `A mostrar ${page}-${numberOfPages}`;
    categoriesValues = {};
    zonesValues = {};
    ratingValues = {};
    storesList.forEach(element => {        
        if (categoriesValues[element.catId]){
            categoriesValues[element.catId] += 1;
        }else{
            categoriesValues[element.catId] = 1;
        }

        if (zonesValues[element.zoneId]){
            zonesValues[element.zoneId] += 1;
        }else{
            zonesValues[element.zoneId] = 1;
        }

        if (ratingValues[parseInt(element.score)]){
            ratingValues[parseInt(element.score)] += 1;
        }else{
            ratingValues[parseInt(element.score)] = 1;
        }
    });
    window.scrollTo({top: 0, behavior: 'smooth'});
}

const isPrime = num => {
    for(let i = 2; i < num; i++)
        if(num % i === 0) return false;
    return num > 1;
}

const fetchAvaliation = () => {
    let rateFilterHtml = '';
    scoreList.forEach(el => {
        let disabled = 'disabled';
        let resultCount = 0;
        if(ratingValues[el.id]){
            resultCount = ratingValues[el.id];
            disabled = '';
        }
        rateFilterHtml += `
            <li>
                <div class="filter-item">
                    <label for="aval${el.id}" class="container">
                        ${el.name}
                        <input type="checkbox" ${disabled} id="aval${el.id}" class="" onclick="rateFilter(this)"/>
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="filter-result-count">${resultCount}</div>
            </li>
        `
    });
    document.getElementById('rate-filter').innerHTML = rateFilterHtml;
}

const fetchZones = () => {
    fetch('/api/getZonesList')
    .then(response => response.json())
    .then(( zonesInfo ) => {
        zonesInfo = zonesInfo.data;
        let zoneFilterHtml = '';

        let countItems = 1;

        zonesInfo.forEach(el => {
            let disabled = 'disabled';
            let resultCount = 0;
            if(zonesValues[el.id]){
                resultCount = zonesValues[el.id];
                disabled = '';
            }
            let hiddenClass = '';
            if (countItems > 6) {
                hiddenClass = 'class="see-more-target-zones"';
            }
            zoneFilterHtml +=
            `<li ${hiddenClass} >
                <div class="filter-item">
                    <label for="zone${el.id}" class="container">
                        ${el.name}
                        <input type="checkbox" ${disabled} id="zone${el.id}" class="" onclick="zoneFilter(this)" />
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="filter-result-count">${resultCount}</div>
            </li>`;

            countItems++;
        });
        document.getElementById('zones-filter').innerHTML = zoneFilterHtml;
        
    });
}
const zoneFilter = (obj) => {
    let zoneId = obj.id.split("zone");
    zoneId = parseInt(zoneId[1]);
    if(obj.checked){
        if(!filters.zones.includes(zoneId)){        
            filters.zones.push(zoneId);
        }
    } else {
        filters.zones = filters.zones.filter(filterId => filterId !== zoneId );
    }
    applyFilters(true);
}

const fetchCategories = () => {
    fetch('/api/getCategoriesList')
    .then(response => response.json())
    .then(( categoriesInfo ) => {
        categoriesInfo = categoriesInfo.data;        
        let categoryFilterHtml = '';

        let countItems = 1;
        categoriesInfo.forEach(el => {

            let hiddenClass = '';
            if (countItems > 6) {
                hiddenClass = 'class="see-more-target"';
            }
            let disabled = 'disabled';
            let resultCount = 0;
            if(categoriesValues[el.id]){
                resultCount = categoriesValues[el.id];
                disabled = '';
            }
            categoryFilterHtml +=
            `<li ${hiddenClass}>
                <div class="filter-item">
                    <label for="cat${el.id}" class="container">
                        ${el.name}
                        <input type="checkbox" ${disabled} id="cat${el.id}" class="" onclick="catFilter(this)" />
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="filter-result-count">${resultCount}</div>
            </li>`;
            countItems++;
        });
        document.getElementById('category-filter').innerHTML = categoryFilterHtml;
    });
}
const catFilter = (obj) => {
    let catId = obj.id.split("cat");
    catId = parseInt(catId[1]);
    if(obj.checked){
        if(!filters.categories.includes(catId)){        
            filters.categories.push(catId);
        }
    } else {
        filters.categories = filters.categories.filter(filterId => filterId !== catId );
    }
    applyFilters(true);
}

const rateFilter = (obj) => {
    let rateId = obj.id.split("aval");
    rateId = parseInt(rateId[1]);
    if(obj.checked){
        if(!filters.rating.includes(rateId)){        
            filters.rating.push(rateId);
        }
    } else {
        filters.rating = filters.rating.filter(filterId => filterId !== rateId );
    }
    applyFilters(true);
}

const applyFilters = (num = false) => {
    myStoresArray = storesList;
    if(num && filters.categories.length > 0){
        myStoresArray = myStoresArray.filter(store => filters.categories.includes(store.catId));
    }
    if(num && filters.zones.length > 0){
        myStoresArray = myStoresArray.filter(store => filters.zones.includes(store.zoneId));
    }
    if(num && filters.rating.length > 0){
        myStoresArray = myStoresArray.filter(store => filters.rating.includes(store.score));
    }
    fetchPage();
}

document.addEventListener("DOMContentLoaded",  function(){
    createStoreList();
    fetchZones();
    fetchCategories();
    fetchAvaliation();
});
