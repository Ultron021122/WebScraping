const axios = require('axios');
const cheerio = require('cheerio');

async function scrape() {
    const url = 'https://eventos.cucei.udg.mx/';
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Array para almacenar los resultados
        const eventos = [];

        // Seleccionar elementos de eventos
        $('.bg-white.border.border-gray-200.rounded-lg.shadow.zoom-in.flex.flex-col.justify-stretch').each((index, element) => {
            // Seleccionar elementos dentro de cada evento
            const titulo = $(element).find('h2 a').text().trim().replace(/\s+/g, ' ');
            const descripcion = $(element).find('p').text().trim().replace(/\s+/g, ' ');
            const fechaHora = $(element).find('.flex.items-center div:first-child span').text().trim().replace(/\s+/g, ' ');

            // Crear un objeto con la información y agregarlo al array
            const evento = {
                titulo,
                descripcion,
                fechaHora,
            };

            eventos.push(evento);
        });

        return { eventos };
    } catch (error) {
        throw new Error('Error al realizar la solicitud HTTP');
    }
}

scrape()
    .then(results => console.log(results))
    .catch(error => console.error(error));

module.exports = scrape;