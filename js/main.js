document.addEventListener('DOMContentLoaded', function () {
    const enlaceCines = document.getElementById('enlace-cines');
    const enlaceCartelera = document.getElementById('enlace-cartelera');
    const enlaceEstrenos = document.getElementById('enlace-estrenos');

    enlaceCines.addEventListener('click', function (event) {
        event.preventDefault();
        cargarContenido('cines');
    });

    enlaceCartelera.addEventListener('click', function (event) {
        event.preventDefault();
        cargarContenido('peliculas', 'cartelera');
    });

    enlaceEstrenos.addEventListener('click', function (event) {
        event.preventDefault();
        cargarContenido('peliculas', 'estrenos');
    });

    
});

const cargarContenido = async (seccion, modo = null) => {
    switch (seccion) {
        case 'cines':
            await getCines();
            history.pushState({ seccion: 'cines' }, 'Cines', 'cines.html');
            break;
        case 'peliculas':
            await getPeliculas(modo);
            history.pushState({ seccion: 'peliculas' }, 'Peliculas', 'peliculas.html');
            break;
    }
};


