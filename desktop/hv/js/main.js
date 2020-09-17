window.addEventListener("load", async () => {
    document.querySelector("body").classList.remove("preload")
    const container = document.getElementsByTagName("body")[0];
    const response = await fetch('/header2.html');
    container.innerHTML = await response.text() + container.innerHTML;

    const containerFooter = document.getElementsByTagName("footer")[0];
    const responseFooter = await fetch('/footer.html');
    containerFooter.innerHTML = await responseFooter.text() + containerFooter.innerHTML;

    if(window.location.href.indexOf('store.html')>-1){
        getSlider();
    };
});
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
const modalClose = (idModal) =>{
    let idModalClose = '#'+idModal;
    console.log(idModalClose);
    let m = document.querySelector(`${idModalClose}`);
    m.classList.remove("showModal");
}
const modalOpen = (idModal) =>{
    let idModalOpen = '#'+idModal;
    let m = document.querySelector(`${idModalOpen}`);
    m.classList.add("showModal");
}

