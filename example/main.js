'use strict';

/* eslint-disable no-console */

const { app, BrowserWindow } = require('electron');
const formatCurrency = require('format-currency');
const path = require('path');
const url = require('url');
const DiscordRPC = require('../');
const request = require('request');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 540,
    height: 580,
    resizable: false,
    titleBarStyle: 'hidden',
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Client ID Buraya
const clientId = 'ClİENT ID BURAYA YAZILACAK!';

// only needed for discord allowing spectate, join, ask to join
DiscordRPC.register(clientId);

const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

async function setActivity() {
  if (!rpc || !mainWindow) {
    return;
  }
  request('https://www.doviz.com/api/v1/currencies/EUR/latest', (error, response, data) => {
          let eual = JSON.parse(data).buying;
          let eusat = JSON.parse(data).selling;
          let eusat2 = eusat.toFixed(3);
          let eual2 = eual.toString();

    request('https://www.doviz.com/api/v1/currencies/KWD/latest', (error, response, data) => {
            let kwdal = JSON.parse(data).buying;
            let kwdsat = JSON.parse(data).selling;
            let kwdal2 = kwdal.toString();
            let kwdsat2 = kwdsat.toFixed(2); 
    
    request('https://www.doviz.com/api/v1/currencies/GBP/latest', (error, response, data) => {
    let gbpal = JSON.parse(data).buying;
    let gbpsat = JSON.parse(data).selling;
    let gbpal2 = gbpal.toString();
    let gbpsat2 = gbpsat.toFixed(2);    
    
    request('https://www.doviz.com/api/v1/currencies/RUB/latest', (error, response, data) => {
    let rubal = JSON.parse(data).buying;
    let rubsat = JSON.parse(data).selling;
    let rubal2 = rubal.toString();
    let rubsat2 = rubsat.toFixed(2);

    request('https://www.doviz.com/api/v1/currencies/USD/latest', (error, response, data) => {
          let dolaral = JSON.parse(data).buying;
          let dolarsat = JSON.parse(data).selling;
          let dolarsat2 = dolarsat.toFixed(3);
          let dolaral2 = dolaral.toString()

    request('https://www.doviz.com/api/v1/golds/all/latest', (error, response, data) => {
          let goldal = JSON.parse(data)[0].buying;
          let goldsat = JSON.parse(data)[0].selling;
          let goldsat2 = goldsat.toFixed(0);
          let goldal2 = goldal.toString()

    request('https://www.doviz.com/api/v1/coins/all/latest', (error, response, data) => {
          let btcal = JSON.parse(data)[14].buying;
          let btcsat = JSON.parse(data)[14].selling;
          let btcsat2 = btcsat.toFixed(2);
          let btcsat3 = dolarsat2*btcsat2;
          let btcsat4 = btcsat3.toFixed(2);
          let btcsat5 = formatCurrency(btcsat4);
          let btcal2 = btcal.toString();
          let github = 'github.com/arpelo';
    request('https://www.doviz.com/api/v1/coins/all/latest', (error, response, data) => {
          let etcal = JSON.parse(data)[1].buying;
          let etcsat = JSON.parse(data)[1].selling;
          let etcsat2 = etcsat.toFixed(2);
          let etcsat3 = dolarsat2*etcsat2;
          let etcsat4 = etcsat3.toFixed(2);
          let etcsat5 = formatCurrency(etcsat4);
          let etcal2 = etcal.toString();
          

      

    request('https://www.doviz.com/api/v1/currencies/AZN/latest', (error, response, data) => {
    let aznal = JSON.parse(data).buying;
    let aznsat = JSON.parse(data).selling;
    let aznal2 = aznal.toString();
    let aznsat2 = aznsat.toFixed(2);
    
    

          rpc.setActivity({
            startTimestamp: new Date(),
            details: `1 Dolar: ${dolarsat2} ₺ | 1 Dinar: ${kwdsat2} ₺ | 1 Manat: ${aznsat2} ₺ | Ç.Altın: ${goldsat2} ₺`,
            state: `1 Euro: ${eusat2} ₺ | 1 Sterlin: ${gbpsat2} ₺ | ${github} | 1 Bitcoin: ${btcsat5} ₺`,
            largeImageKey: 'money', // buraya add image ile eklediğiniz fotoğraflarınızın adını yazın.
            largeImageText: `1 Ethereum ${etcsat5} TL with created by Arpelo`,
            smallImageKey: 'arpelo',
            smallImageText: `${github}`, // burayı değiştirmek istemezsin değil mi? .d
            instance: false,
            
              });

                  });
                });
              });
            });
          });
        });
      });
    });
  });      
  const boops = await mainWindow.webContents.executeJavaScript('window.boops');


}

rpc.on('ready', () => {
  setActivity();

  // her 120 saniyede bir datayı tekrar çekiyor
  setInterval(() => {
    setActivity();
  }, 120e3);
});

rpc.login({ clientId }).catch(console.error);
