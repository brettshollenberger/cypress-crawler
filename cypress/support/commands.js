// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const _ = require('lodash')
const keys = _.keys(Cypress.Commands._commands)
const desired = [
    'map',
    'chunk',
    'flatMap',
]

_.each(desired, (fn) => {
    if(!_.includes(keys, fn)) {
        Cypress.Commands.add(fn, { prevSubject: true }, (...args) => {
            let val = _[fn](...args)
            Cypress.log(val)
            return val
        })
    }
})