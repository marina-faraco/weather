# Weather App 🌤️

Aplicação web de previsão do tempo que permite buscar o clima atual e a previsão para os próximos dias em qualquer cidade do mundo.

O projeto consome dados da API da OpenWeatherMap e apresenta as informações de forma simples e visual.

---

## ✨ Funcionalidades

- Buscar clima por nome da cidade
- Exibir temperatura atual
- Exibir descrição do clima (ex: nublado, chuva, céu limpo)
- Mostrar previsão para os próximos dias
- Interface simples e responsiva
- Detectar automaticamente a localização do usuário
- Buscar clima com base na localização atual (geolocalização)
- Alternar entre temperatura em **Celsius (°C)** e **Fahrenheit (°F)**
- Exibir ícones dinâmicos de acordo com as condições climáticas
- Exibir mensagens de erro quando a cidade não é encontrada

---

## 🛠️ Tecnologias utilizadas

- HTML5  
- CSS3  
- JavaScript (ES6+)  
- OpenWeatherMap API
- Geolocation API (nativa do navegador)

---

## 📡 API utilizada

Este projeto utiliza a API pública da OpenWeatherMap para obter dados meteorológicos em tempo real.

Documentação da API:  
https://openweathermap.org/api

---

## 📂 Estrutura do projeto

```
weather-app
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ⚙️ Como executar o projeto

1. Clone o repositório

```
git clone https://github.com/seu-usuario/weather-app.git
```

2. Acesse a pasta do projeto

```
cd weather-app
```

3. Abra o arquivo `index.html` no navegador.

---

## 🔑 Configuração da API

Para utilizar a aplicação, é necessário obter uma chave gratuita da OpenWeatherMap.

1. Crie uma conta em:  
https://openweathermap.org/

2. Gere sua API Key

3. Insira a chave no arquivo `script.js`:

```javascript
const API_KEY = "sua_api_key_aqui";
```

---

## 🎯 Objetivo do projeto

Este projeto foi desenvolvido com o objetivo de praticar:

- consumo de APIs externas
- requisições HTTP com `fetch`
- manipulação de dados JSON
- manipulação do DOM com JavaScript
- organização de um projeto frontend simples
- uso da Geolocation API

---

## 🚀 Possíveis melhorias

- adicionar fundo dinâmico de acordo com o clima
- adicionar histórico de cidades pesquisadas
- melhorar tratamento de erros da API
- criar opção de tradução para pt-br

---

## 📄 Licença

Este projeto é apenas para fins educacionais e de portfólio.
