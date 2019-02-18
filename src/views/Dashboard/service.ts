import request from "@api/io";

function getWeather() {
  return request.sendRequest("get", {
    path: "https://restapi.amap.com/v3/weather/weatherInfo",
    options: {
      params: {
        key: "cc24ccab0a88c3ee17eb8dee0e07ba61",
        city: 350200,
        extensions: "all"
      }
    }
  });
}

export { getWeather };
