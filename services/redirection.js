require("dotenv").config();
const axios = require("axios");

module.exports.getStrapiRedirect = async ({ query }) => {
  return axios.get(process.env.REDIRECT_QUERY + query);
};

module.exports.getRedirectUrl = async ({ protocol, hostname, originalUrl }) => {
  const filter = {
    "/undefined": 1,
    "/": 1
  };

  const url = filter[originalUrl] ? "" : originalUrl;

  return this.getStrapiRedirect({ query: hostname + url })
    .then(response => {
      return response.data && response.data.length > 0 ? response.data[0].destination : process.env.DEFAULT_URL;
    })
    .catch(e => {
      console.log(e.toString());
      return process.env.DEFAULT_URL;
    });
};
