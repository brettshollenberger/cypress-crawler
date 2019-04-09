const _ = require('lodash')
const moment = require('moment');

describe('Crawler', () => {
    it("crawls", () => {
        cy.visit('http://badslava.com/open-mics.php?city=New%20York&state=NY&type=Comedy')

        cy.get('#demo')
            .children()
            .chunk(2)
            .map(function(components) {
                return {
                    date: components[0].textContent,
                    table: Cypress.$(components[1])
                }
            })
            .flatMap(function(c) {
              let th        = c.table.find('th')
              let tbody     = c.table.find('tbody')
              let tableKeys = _.map(th, function (th) {
                  return th.textContent
              })
              let tableRows = _.map(tbody, function (tbody) {
                  return _.fromPairs(_.zip(tableKeys, Cypress.$(tbody).find('td')))
              })
              let finalRows = _.map(tableRows, function (tableRow) {
                  return _.reduce(tableRow, (hash, td, key) => {
                      switch (key) {
                          case 'Info':
                            let onclick = Cypress.$(td).find('a').attr('onclick')

                            if (!_.isUndefined(onclick)) {
                                onclick = onclick.replace(/alert\(\'/, "").replace(/\'\).*/, "")
                            }

                            hash[key] = onclick

                            break;
                          case 'Email':
                            hash[key] = Cypress.$(td).find('a').attr('href').replace(/mailto\:/, "")
                            break;
                          case 'Link':
                            hash[key] = Cypress.$(td).find('a').attr('href')
                            break;
                          default:
                            hash[key] = td.textContent
                      }
                      return hash
                  }, {})
              })

              _.each(finalRows, (row) => { row['Date'] = c.date })

              return finalRows
            })
            .map((day) => {
                debugger
                let d = moment(`${day.Date} ${day.Time} -5:00`, "DDDD MM/DD/YYYY hh:mma ZZ")
            })
    })
})