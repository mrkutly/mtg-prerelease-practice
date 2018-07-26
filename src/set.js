let setId = 0
let allSets = []

class Set {
  constructor(name, code){
    this.id = ++setId
    this.name = name
    this.code = code

    allSets.push(this)
  }
}
