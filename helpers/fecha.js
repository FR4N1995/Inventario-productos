const formatearFecha = (fecha) => {
    const dateObj = new Date(fecha);
    
    if (isNaN(dateObj.getTime())) {
        return 'Fecha inválida';
    }

    const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    const diaSemana = dias[dateObj.getDay()];
    const dia = dateObj.getDate();
    const mes = meses[dateObj.getMonth()];
    const año = dateObj.getFullYear();

  // Reemplaza la sección de hora con:
    let horas = dateObj.getHours();
    const ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12;
    horas = horas ? horas : 12; // La hora 0 se convierte en 12
    const strHoras = horas.toString().padStart(2, '0');
    const minutos = dateObj.getMinutes().toString().padStart(2, '0');
    const segundos = dateObj.getSeconds().toString().padStart(2, '0');

return `${diaSemana}, ${dia} de ${mes} de ${año} a las ${strHoras}:${minutos}:${segundos} ${ampm}`;
}

export {
    formatearFecha
}