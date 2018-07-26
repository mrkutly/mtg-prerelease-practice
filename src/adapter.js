const BASE_URL = "https://api.magicthegathering.io/v1/"
'https://api.magicthegathering.io/v1/cards?name="Archangel Avacyn"'

class Adapter {
  static getBooster(setCode) {
    return fetch(`${BASE_URL}sets/${setCode}/booster`)
      .then(resp => resp.json())
  }

  static getSets() {
    return fetch(`${BASE_URL}sets`)
    .then(resp => resp.json())
  }

  static getCardByName(name) {
    return fetch(`${BASE_URL}cards?name=${name}`)
      .then(resp => resp.json())
      .then(console.log)
  }
}
