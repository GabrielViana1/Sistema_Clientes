//Função para abrir e fecha o menu
const toggleMenu = document.getElementById('btnToggle')
toggleMenu.addEventListener('click', function(){
    const navBarNav = document.getElementById('navbarNav')
    if(navBarNav.classList.contains('show')){
        closeMenu()
    } else {
        openMenu()
    }
})

    //abrir menu
    function openMenu(){
        const navBarNav = document.getElementById('navbarNav')
        navBarNav.classList.toggle('show')
    }

    //fechar menu
    function closeMenu(){
        const navBarNav = document.getElementById('navbarNav')
        navBarNav.classList.remove('show')
    }