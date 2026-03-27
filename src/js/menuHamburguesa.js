
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function(e) {
            e.stopPropagation();
            console.log('click')
            // Alternar visibilidad
            mobileMenu.classList.toggle("hidden");
            
            // Cambiar ícono 
            const icon = menuToggle.querySelector('i'); 
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
            
            // Bloquear scroll del body cuando el menú está abierto
            document.body.classList.toggle("overflow-hidden");
        });

        // Cerrar menú al hacer click en cualquier enlace
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add("hidden");
                menuToggle.querySelector('i').classList.add("fa-bars");
                menuToggle.querySelector('i').classList.remove("fa-times");
                document.body.classList.remove("overflow-hidden");
            });
        });
    }
});