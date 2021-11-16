"use strict"

const axios = require("axios")

exports.getUserA = endpoint => {
  const url = endpoint.url
  const port = endpoint.port

  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "/users/UserA",
    headers: { Accept: "application/json" },
  })
}

