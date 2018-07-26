document.addEventListener('DOMContentLoaded', init)


function init() {
  const setFormEl = document.querySelector('#set-form')
  const boosterContainerEl = document.querySelector('#booster-container')
  const setListEl = document.querySelector('#set-list')
  const setTemplates = makeSetTemplates()

  Adapter.getSets()
    .then(makeSetsFromJSON)
    .then(sets => renderSets())

  setFormEl.addEventListener('submit', handleSetSubmit)


  function handleSetSubmit(e) {
    e.preventDefault()
    boosterContainerEl.innerHTML = ""
    let setName = e.target.querySelector('#set-choice').value
    let set = allSets.find(set => set.name === setName)
    getSixBoosters(set)
  }

  function getSixBoosters(set){
    for(let i = 0; i < 6; i++) {
      Adapter.getBooster(set.code).then(boosterResp => {
        if(boosterResp.status === "400" && i === 0) {
          alert("Sorry! Looks like that set doesn't have boosters.")
        } else {
          renderCards(boosterResp.cards)
        }
      })
    }
  }

  function makeSetsFromJSON(json) {
    json.sets.forEach(set => {
      new Set(set.name, set.code)
    })
  }

  function makeSetTemplate(set) {
    return `<option value="${set.name}"></option>`
  }

  function makeSetTemplates() {
    return allSets.map(set => makeSetTemplate(set)).join("")
  }

  function makeCardTemplate(card) {
    // if (card.layout === "double-faced") {
    //   return ``
    // } else {
      return `<img src=${card.imageUrl}></img>`
    // }
  }

  function makeCardsTemplate(cards) {
    return cards.map(card => makeCardTemplate(card)).join("")
  }

  function renderCards(cards){
    let template = makeCardsTemplate(cards)
    boosterContainerEl.innerHTML += template
  }

  function renderSets() {
    let setTemplates = makeSetTemplates()
    setListEl.innerHTML += setTemplates
  }
}
