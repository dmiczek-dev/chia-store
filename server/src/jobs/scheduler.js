const { getClient } = require("../db/config");
const schedule = require("node-schedule");
const axios = require("axios");

exports.getChiaStats = () => {
  schedule.scheduleJob("*/1 * * * *", async function () {
    const client = getClient();

    //Get Chia netspace
    const netspaceData = await axios({
      method: "GET",
      url: "https://api.chiaprofitability.com/netspace",
      headers: { "Content-Type": "application/json" },
      validateStatus: function (status) {
        return status >= 200 && status <= 302;
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });

    //Get Chia market price
    const marketData = await axios({
      method: "GET",
      url: "https://api.chiaprofitability.com/market",
      headers: { "Content-Type": "application/json" },
      validateStatus: function (status) {
        return status >= 200 && status <= 302;
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });

    //Get USD price
    const usdExchangeRate = await axios({
      method: "GET",
      url: "https://api.nbp.pl/api/exchangerates/rates/a/usd/",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.data.rates[0].mid;
      })
      .catch((err) => {
        console.log(err);
      });

    const netspace = (netspaceData.netspace / 1024 / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(2);
    const price = (marketData.price * usdExchangeRate).toFixed(0);
    const daychange = (marketData.daychange * 3.9).toFixed(0);
    const date = new Date();

    client
      .query("INSERT INTO statistics(netspace, price, daychange, date) VALUES($1, $2, $3, $4)", [netspace, price, daychange, date])
      .catch((err) => {
        console.log(err);
      });
  });
};
