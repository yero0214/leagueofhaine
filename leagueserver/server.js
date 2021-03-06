'use strict';

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const PORT = 25565;
const HOST = '0.0.0.0';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.get('/eid', async (req, res) => {
    const name = req.query.name;

    await axios.get('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + encodeURI(name), {
        headers:{'X-Riot-Token': 'RGAPI-27005fbf-01a5-45ea-bb00-218f51912675'}
    })
    .then(function(response){
        res.send(response.data.id);
        console.log(response.data.id)
    })
    .catch(error => (console.log(error.message)))
})

app.get('/info', async (req, res) => {
    const eid = req.query.eid;
    await axios.get('https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/' + encodeURI(eid), {
        headers:{'X-Riot-Token': 'RGAPI-27005fbf-01a5-45ea-bb00-218f51912675'}
    })
    .then(function(response){
        // info = getInfo(response);
        res.send(response.data);
        console.log(response.data)
    })
    .catch(error => (console.log(error.message)))
})

app.listen(PORT, HOST);