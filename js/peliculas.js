const getPeliculas = async (modo) => {
    let url;
    if (modo === 'cartelera' || modo === 'estrenos') {
        // Utiliza la URL correcta para "cartelera" o "estrenos"
        url = `https://oaemdl.es/cinestar_sweb_php/peliculas/${modo}`;
    } else {
        const id = new URLSearchParams(window.location.search).get('id');
        url = `https://oaemdl.es/cinestar_sweb_php/peliculas/${id}`;
    }

    console.log('URL en getPeliculas:', url); // Agrega esta línea para depurar

    const data = await fetch(url);
    
    if (data.status == 200) {
        const peliculas = await data.json();
        let html = `<br/><h1>${modo ? modo.charAt(0).toUpperCase() + modo.slice(1) : 'Detalles de la Película'}</h1><br/>`;

        peliculas.forEach(pelicula => {
            html += `
            <div class="contenido-pelicula">
                <div class="datos-pelicula">
                    <h2>${pelicula.Titulo}</h2><br/>
                    <p>${pelicula.Sinopsis}</p>
                    <br/>
                    <div class="boton-pelicula">
                    <button onclick="getPelicula('${pelicula.id}')">
                        <img src="img/varios/btn-mas-info.jpg" width="120" height="30" alt="Ver info"/>
                    </button>
                </div>
                    </div>
                    <div class="boton-pelicula"> 
                        <a href="https://www.youtube.com/v/${pelicula.Link}" target=_blank  onclick="return hs.htmlExpand(this, { objectType: 'iframe' } )" >
                            <img src="img/varios/btn-trailer.jpg" width="120" height="30" alt="Ver trailer"/>
                        </a>
                    </div> 
                </div>
                <img src="img/pelicula/${pelicula.id}.jpg" width="160" height="226"/><br/><br/>
            </div>`;
        });

        document.getElementById('contenido-interno').innerHTML = html;
        
    }
};



