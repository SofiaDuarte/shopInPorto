window.addEventListener("load", async () => {
   /*  document.querySelector("body").classList.remove("preload")
    const container = document.getElementsByTagName("body")[0];
    const response = await fetch('/header2.html');
    container.innerHTML = await response.text() + container.innerHTML;

    const containerFooter = document.getElementsByTagName("footer")[0];
    const responseFooter = await fetch('/footer.html');
    containerFooter.innerHTML = await responseFooter.text() + containerFooter.innerHTML; */
    getZonesList();
    getSlider();
});


 /*Ir buscar as zonas à API*/
 const getZonesList = () => {
     fetch (`/api/getZonesList`)
     .then (response => response.json())
     .then (json => {
         myZonesArray = json.data;
         zonesList =json.data;

     const zoneList = document.getElementById("zones");
     zonesList.forEach((product) => {
         zoneList.innerHTML +=  `<option value="${product.id}">${product.name}`
         });
     })
 }

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
    new Glider(document.querySelector('.glider2'), {
            slidesToShow: 2, //'auto',
            slidesToScroll: 1,
            itemWidth: 300,
            draggable: true,
            scrollLock: false,
            rewind: true,
            arrows: {
                prev: '.glider-prev-resp',
                next: '.glider-next-resp'
            },
        });
}

//  window.addEventListener("DOMContentLoaded", () => getZonesList());

 

