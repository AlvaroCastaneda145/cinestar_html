const getCine = async (cineId) => {
    const id = cineId || new URLSearchParams(window.location.search).get('id');
    
    // Obtener información general del cine
    const cineData = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}`);
    const cine = await cineData.json();

    // Obtener tarifas del cine
    const tarifasData = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/tarifas`);
    const tarifas = await tarifasData.json();

    // Obtener información de las películas del cine
    const peliculasData = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/peliculas`);
    const peliculas = await peliculasData.json();

    // Construir HTML con la información del cine
    let html = `<h2>${cine.RazonSocial}</h2>
                    <div class="cine-info">
                    <div class="cine-info datos">
                        <p>${cine.Direccion} - ${cine.Detalle}</p>
                        <p>${cine.Telefonos}</p>
                        <br/>
                        <div class="tabla">`
    tarifas.forEach(tarifa => {
        html += `<div class="fila">
                    <div class="celda-titulo">${tarifa.DiasSemana}</div>
                    <div class="celda">${tarifa.Precio}</div>
                </div>
                `
    });
        html += `</div>
                <div class="aviso">
                <p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
                </div>
                </div>
                <img src="img/cine/${cine.id}.2.jpg"/>
				<br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
                <div class="cine-info peliculas">
                <div class="tabla">`;
    peliculas.forEach(pelicula => {
        html += `<div class="fila">
                    <div class="celda-cabecera">${pelicula.Titulo}</div>
                    <div class="celda-cabecera">${pelicula.Horarios}</div>
                </div>`
    });
    html += `</div>
            </div>
            </div>
            <div>
			<img style="float:left;" src="img/cine/${cine.id}.3.jpg" alt="Imagen del cine"/>
					<span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
						Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
						<br/><br/>
						Visitános y diviértete con nosotros. 
						<br/><br/>
						<b>CINESTAR</b>, siempre pensando en tí. 
					</span>		
				</div>
				
			</div>
            </div>
            <div class="clearbox"><br/></div>

            `

  
    
    
    document.getElementById('contenido-interno').innerHTML = html;

    history.pushState({ id: id }, `Cine ${cine.RazonSocial}`, `?id=${id}`);
};




