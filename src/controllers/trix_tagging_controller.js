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
    this.tribute.range.pasteHtml = this._pasteHtml.bind(this)
    this.fieldTarget.addEventListener("tribute-replaced", this.replace)
  }

  fetchPeople(text) {
    var values = [
      { key: "Olasunkanmi Adeniyi", value: "adeniyi", category: "fa-user" },
      { key: "Marcus Allen", value: "allen", category: "fa-user" },
      { key: "Tyson Alualu", value: "alualu", category: "fa-user" },
      { key: "Zach Banner", value: "banner", category: "fa-user" },
      { key: "Jordan Berry", value: "berry", category: "fa-user" },
      { key: "Chris Boswell", value: "boswell", category: "fa-user" },
      { key: "Antoine Brooks Jr.", value: "brooks", category: "fa-user" },
      { key: "Isaiah Buggs", value: "buggs", category: "fa-user" },
      { key: "Devin Bush", value: "bush", category: "fa-user" },
      { key: "Kameron Canaday", value: "canaday", category: "fa-user" },
      { key: "Chase Claypool", value: "claypool", category: "fa-user" },
      { key: "James Conner", value: "conner", category: "fa-user" },
      { key: "Jordan Dangerfield", value: "dangerfield", category: "fa-user" },
      { key: "Carlos Davis", value: "davis", category: "fa-user" }
    ]
    this.filterArray(values, text)
    return values
  }

  fetchCompanies(text) {
    var values = [
      { key: "Arizona Cardinals", value: "Arizona", category: "fa-building" },
      { key: "Baltimore Ravens", value: "Baltimore", category: "fa-building" },
      { key: "Atlanta Falcons", value: "Atlanta", category: "fa-building" },
      { key: "Buffalo Bills", value: "Buffalo", category: "fa-building" },
      { key: "Carolina Panthers", value: "Carolina", category: "fa-building" },
      { key: "Cincinnati Bengals", value: "Cincinnati", category: "fa-building" },
      { key: "Chicago Bears", value: "Chicago", category: "fa-building" },
      { key: "Cleveland Browns", value: "Cleveland", category: "fa-building" },
      { key: "Dallas Cowboys", value: "Dallas", category: "fa-building" },
      { key: "Denver Broncos", value: "Denver", category: "fa-building" },
      { key: "Detroit Lions", value: "Detroit", category: "fa-building" },
      { key: "Houston Texans", value: "Houston", category: "fa-building" },
      { key: "Green Bay Packers", value: "Green Bay", category: "fa-building" },
      { key: "Indianapolis Colts", value: "Indianapolis", category: "fa-building" },
      { key: "Los Angeles Rams", value: "Los-Angeles", category: "fa-building" },
      { key: "Jacksonville Jaguars", value: "Jacksonville", category: "fa-building" },
      { key: "Minnesota Vikings", value: "Minnesota", category: "fa-building" },
      { key: "Kansas City Chiefs", value: "Kansas-City", category: "fa-building" },
      { key: "New Orleans Saints", value: "New-Orleans", category: "fa-building" },
      { key: "Las Vegas Raiders", value: "Las-Vegas", category: "fa-building" },
      { key: "New York Giants", value: "New-York", category: "fa-building" },
      { key: "Los Angeles Chargers", value: "Los-Angeles", category: "fa-building" },
      { key: "Philadelphia Eagles", value: "Philadelphia", category: "fa-building" },
      { key: "Miami Dolphins", value: "Miami", category: "fa-building" },
      { key: "San Francisco 49ers", value: "San-Francisco", category: "fa-building" },
      { key: "New England Patriots", value: "New-England", category: "fa-building" },
      { key: "Seattle Seahawks", value: "Seattle", category: "fa-building" },
      { key: "New York Jets", value: "New-York", category: "fa-building" },
      { key: "Tampa Bay Buccaneers", value: "Tampa-Bay", category: "fa-building" },
      { key: "Pittsburgh Steelers", value: "Pittsburgh", category: "fa-building" },
      { key: "Washington Football Team", value: "Washington", category: "fa-building" },
      { key: "Tennessee Titans", value: "Tennessee", category: "fa-building" },
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

    return arr.filter(function(el) {
      return el.key.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }

  replace(e) {
    let link = e.detail.item.original
    let content = `<i class="far ${link.type}"></i> <a href="#${link.value}">${link.key}</a>`

    let attachment = new Trix.Attachment({
      sgid: link.value,
      content: `<span class="connection"><a href="#${link.value}">${link.key}</a></span>`
    })
    this.editor.insertAttachment(attachment)
    this.editor.insertString(" ")
  }

  _pasteHtml(html, startPos, endPos) {
    let position = this.editor.getPosition()
    this.editor.setSelectedRange([position - (endPos - startPos), position])
    this.editor.deleteInDirection("backward")
  }
}
