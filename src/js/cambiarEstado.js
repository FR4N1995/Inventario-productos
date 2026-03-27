(function() {
    // Aplicar estado guardado al cargar la página
    document.querySelectorAll('.cambiar-estado').forEach(boton => {
        const productoId = boton.dataset.productoId;
        const estadoGuardado = localStorage.getItem(`producto-${productoId}-estado`);
        
        if (estadoGuardado === 'false') {
            const productoItem = boton.closest('.opciones');
            productoItem.querySelector('.entrada')?.classList.add('hidden');
            productoItem.querySelector('.salida')?.classList.add('hidden');
        }
    });

    // Manejador del botón
    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado');
    cambiarEstadoBotones.forEach(boton => {
        boton.addEventListener('click', cambiarEstadoPropiedad);
    });

    async function cambiarEstadoPropiedad(e) {
        const id = e.target.dataset.productoId;
        console.log(id);
        const productoItem = e.target.closest('.opciones');
        const entradaBtn = productoItem.querySelector('.entrada');
        const salidaBtn = productoItem.querySelector('.salida');

        // Cambiar estado visual
        if (e.target.classList.contains('bg-yellow-100')) {
            e.target.classList.replace('bg-yellow-100', 'bg-green-100');
            e.target.classList.replace('text-yellow-800', 'text-green-800');
            e.target.textContent = 'Alta';
            entradaBtn?.classList.remove('hidden');
            salidaBtn?.classList.remove('hidden');
            localStorage.setItem(`producto-${id}-estado`, 'true');
        } else {
            e.target.classList.replace('bg-green-100', 'bg-yellow-100');
            e.target.classList.replace('text-green-800', 'text-yellow-800');
            e.target.textContent = 'Baja';
            entradaBtn?.classList.add('hidden');
            salidaBtn?.classList.add('hidden');
            localStorage.setItem(`producto-${id}-estado`, 'false');
        }

        //Actualizar en base de datos
        try {
          const respues =  await fetch(`/administrador/estado/${id}`, { method: 'PUT' });
          if(respues.ok){
           Swal.fire({
                    icon: 'success', 
                    title: 'Estado actualizado',
                    text: `El producto Se actualizo`,
                    confirmButtonColor: '#16a34a' 
                }).then(() => {
                        location.reload(); // 👈 se ejecuta DESPUÉS de cerrar la alerta
                });
                
          }
         } catch (error) {
             console.error("Error al actualizar estado", error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el estado del producto',
                confirmButtonColor: '#e11d48'
            });
         }
    }
})();