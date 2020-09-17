let urlParams = new URLSearchParams(window.location.search);
let storeId = urlParams.get('id');
let isPromo = urlParams.get('promo');
if(isPromo == 1) {
    let m= document.querySelector('#promoModal');
    m.classList.add("showModal");
}
fetch('api/getStore?storeId=' + storeId)
.then(response => response.json())
.then(( storeInfo ) => {
    storeInfo = storeInfo.data;
    // console.log(storeInfo);
    document.title = `ShopInPorto - ${storeInfo.name}`;
    let name = storeInfo.name;
    if (name.length > 28) {
        name = name.substring(0, 27) + "...";
    }

    
    document.getElementById('nameModal').innerText = storeInfo.name;

    document.getElementById("store-info").style.backgroundImage = `url(hv/${storeInfo.image[1]})`;
    document.getElementsByTagName('h1')[0].innerText = name;

    if (isPromo == 1) {
        document.getElementById('isPromo').innerHTML = 
        `<div class="circle marginrighttwothirds highlight">
            <button onclick="modalOpen('promoModal')"><i class="material-icons-round">loyalty</i>
        </div>`;
    }
    
    document.getElementById('category').innerText = storeInfo.category;    
    document.getElementById('schedule').innerText = storeInfo.schedule;

    document.getElementById('breadcrumb').innerHTML = "Home | " + storeInfo.category + " | <span>" + storeInfo.name + "</span>";
    document.getElementById('rating').innerHTML = storeInfo.score + ',0';
    document.getElementById('description').innerHTML = storeInfo.description;

    let contactsContent = document.getElementsByClassName('contacts-content')[0].getElementsByTagName('p');

    let contactsPhone = [];
    if(storeInfo.phone != '') {
        contactsPhone.push(storeInfo.phone);
    }
    if(storeInfo.mobile != '') {
        contactsPhone.push(storeInfo.mobile);
    }

    contactsContent[0].innerHTML = storeInfo.address + '<br>' + storeInfo.postalcode;
    contactsContent[1].innerHTML = storeInfo.zone;
    contactsContent[2].innerHTML = contactsPhone.join(' / ');
    contactsContent[3].innerHTML = storeInfo.email;

    let featuresT = '<ul>';

    if (storeInfo.catId === 43) {
        featuresT += `<li><i class="material-icons-round">menu_book</i>Menu: cerveja artesanal, snacks à moda do Porto, opções vegetarianas</li>`;
    }

    if (storeInfo.feature[1] || storeInfo.feature[2] || storeInfo.feature[3]) {
        let obj = storeInfo.feature;
        let iconName = 'keyboard_arrow_right';

        Object.keys(obj).forEach(element => {
            if(!obj[element]){
                return;
            }

            if( obj[element].includes('Multibanco') || obj[element].includes('MB Way') || obj[element].includes('transferência') ){
                iconName = 'euro_symbol';
            }

            if( obj[element].includes('Entrega') || obj[element].includes('Take') ){
                iconName = 'home_work';
            }
            
            featuresT += `<li><i class="material-icons-round">${iconName}</i>${obj[element]}</li>`;
        });
        
    }
    if (storeInfo.catId === 43) {
        featuresT += `<li><i class="material-icons-round">event</i>Aceita reservas</li>`;
    }
    featuresT += '</ul>';

    let features = document.getElementById('features').innerHTML = featuresT;

    if (storeInfo.website != ''){
        let website = `<a href="${storeInfo.website}" target="_blank">Abrir o website</a>`;
        let siteInfo = document.getElementById('website').innerHTML = website;
    }

    let storeImages = storeInfo.image;
    let imgHtml = "";
    Object.keys(storeImages).forEach(imgElement => {
        // let addClass = imgElement > 2 ? "hide" : "";
        // imgHtml += `<div><div class="col-6 imgfit ${addClass}">
        imgHtml += `<div class="col-6"><div class="imgfit ">
                        <img class="slider-image" src="hv/${storeImages[imgElement]}" title="${storeInfo.name} - imagem ${imgElement}" alt="${storeInfo.name} - imagem ${imgElement}" />
                    </div></div>`;
        let siteImagesCarousel = document.getElementById('carousel-images').innerHTML = imgHtml;
    });
    // getSlider();
});
const getSlider = () =>{
    new Glider(document.querySelector('.glider'), {
        slidesToShow: 2, //'auto',
        slidesToScroll: 1,
        itemWidth: 300,
        draggable: true,
        scrollLock: false,
        rewind: true,
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        },
    });

}

function openTab(evt, tabeName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabeName).style.display = "block";
    evt.currentTarget.className += " active";
}