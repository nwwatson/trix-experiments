import { Controller } from "stimulus"
import Tribute from "tributejs"
import Trix from "trix"

export default class extends Controller {
  static targets = [ "field" ]

  connect() {
    this.editor = this.fieldTarget.editor
    this.initializeTribute()
  }

  disconnect() {
    this.tribute.detach(this.fieldTarget)
  }

  initializeTribute() {
    this.tribute = new Tribute({
      collection: [
        {
          trigger: 'p:',
          allowSpaces: true,
          lookup: 'key',
          values: this.fetchPeople()
        },
        {
          trigger: 'c:',
          allowSpaces: true,
          lookup: 'key',
          values: this.fetchCompanies()
        }
      ]
    })
    this.tribute.attach(this.fieldTarget)
  }

  fetchPeople(text) {
    var values = [
      { key: "Olasunkanmi Adeniyi", value: "adeniyi" },
      { key: "Marcus Allen", value: "allen" },
      { key: "Tyson Alualu", value: "alualu" },
      { key: "Zach Banner", value: "banner" },
      { key: "Jordan Berry", value: "berry" },
      { key: "Chris Boswell", value: "boswell" },
      { key: "Antoine Brooks Jr.", value: "brooks" },
      { key: "Isaiah Buggs", value: "buggs" },
      { key: "Devin Bush", value: "bush" },
      { key: "Kameron Canaday", value: "canaday" },
      { key: "Chase Claypool", value: "claypool" },
      { key: "James Conner", value: "conner" },
      { key: "Jordan Dangerfield", value: "dangerfield" },
      { key: "Carlos Davis", value: "davis" }
    ]
    this.filterArray(values, text)
    return values
  }

  fetchCompanies(text) {
    var values = [
      { key: "Arizona Cardinals", value: "Arizona" },
      { key: "Baltimore Ravens", value: "Baltimore" },
      { key: "Atlanta Falcons", value: "Atlanta" },
      { key: "Buffalo Bills", value: "Buffalo" },
      { key: "Carolina Panthers", value: "Carolina" },
      { key: "Cincinnati Bengals", value: "Cincinnati" },
      { key: "Chicago Bears", value: "Chicago" },
      { key: "Cleveland Browns", value: "Cleveland" },
      { key: "Dallas Cowboys", value: "Dallas" },
      { key: "Denver Broncos", value: "Denver" },
      { key: "Detroit Lions", value: "Detroit" },
      { key: "Houston Texans", value: "Houston" },
      { key: "Green Bay Packers", value: "Green Bay" },
      { key: "Indianapolis Colts", value: "Indianapolis" },
      { key: "Los Angeles Rams", value: "Los Angeles" },
      { key: "Jacksonville Jaguars", value: "Jacksonville" },
      { key: "Minnesota Vikings", value: "Minnesota" },
      { key: "Kansas City Chiefs", value: "Kansas City" },
      { key: "New Orleans Saints", value: "New Orleans" },
      { key: "Las Vegas Raiders", value: "Las Vegas" },
      { key: "New York Giants", value: "New York" },
      { key: "Los Angeles Chargers", value: "Los Angeles" },
      { key: "Philadelphia Eagles", value: "Philadelphia" },
      { key: "Miami Dolphins", value: "Miami" },
      { key: "San Francisco 49ers", value: "San Francisco" },
      { key: "New England Patriots", value: "New England" },
      { key: "Seattle Seahawks", value: "Seattle" },
      { key: "New York Jets", value: "New York" },
      { key: "Tampa Bay Buccaneers", value: "Tampa Bay" },
      { key: "Pittsburgh Steelers", value: "Pittsburgh" },
      { key: "Washington Football Team", value: "Washington" },
      { key: "Tennessee Titans", value: "Tennessee" },
    ]
    this.filterArray(values, text)
    return values
  }

  fetchData(text, callback) {
    fetch('/data.json')
      .then(response => response.json())
      .then(json => callback(json))
      //.catch(error => callback([]))
  }

  filterArray(arr, query) {
    if (query === undefined) {
      return []
    }
    console.log('in filter array')
    return arr.filter(function(el) {
      return el.key.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }
}
