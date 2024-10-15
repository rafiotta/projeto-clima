const apiKey = 'SUA_API_KEY'; // Substitua com sua chave da API
const botaoBuscar = document.getElementById('buscar');
const campoCidade = document.getElementById('cidade');
const resultadoDiv = document.getElementById('resultado');

botaoBuscar.addEventListener('click', () => {
    const cidade = campoCidade.value;
    if (cidade) {
        buscarPrevisao(cidade);
    } else {
        resultadoDiv.innerHTML = 'Por favor, insira o nome de uma cidade.';
    }
});

async function buscarPrevisao(cidade) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;
    
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error('Cidade não encontrada');
        }
        const dados = await resposta.json();
        exibirResultados(dados);
    } catch (erro) {
        resultadoDiv.innerHTML = erro.message;
    }
}

function exibirResultados(dados) {
    const { name, main, weather } = dados;
    resultadoDiv.innerHTML = `
        <h2>Clima em ${name}</h2>
        <p>Temperatura: ${main.temp} °C</p>
        <p>Condições: ${weather[0].description}</p>
        <p>Umidade: ${main.humidity}%</p>
    `;
}
