const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const API_KEY = '922b6346a2afe88f8f800c813d37433c'; // 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Função para buscar o clima 
async function getWeather(city) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // Celsius
        lang: 'pt_br'    // Idioma português
      }
    });

    const data = response.data;
    console.log(`
    🌤️  Clima em ${data.name}, ${data.sys.country}:
    - Temperatura: ${data.main.temp}°C
    - Sensação térmica: ${data.main.feels_like}°C
    - Condição: ${data.weather[0].description}
    - Umidade: ${data.main.humidity}%
    `);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('❌ Cidade não encontrada! Verifique o nome e tente novamente.');
    } else {
      console.log('❌ Ocorreu um erro ao buscar os dados:', error.message);
    }
  }
}

rl.question('Digite o nome da cidade: ', (city) => {
  getWeather(city).finally(() => rl.close());
});
