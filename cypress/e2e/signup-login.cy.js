/// <reference types="cypress" />

// const { only } = require("node:test");

describe("Signup and Login", ()=> {
    let randomString = Math.random().toString(36).substring(2);
    let username = "QA" + randomString;
    let email = "QATest" + randomString + "@mail.com";
    let password = "Password1"

    it.only("Test Valid Signup", ()=>{
        cy.intercept("POST","**/*.realworld.io/api/users").as("newUser");
        
        cy.visit("http://localhost:4200/");
        cy.get(".nav").contains("Sign up").click();
        cy.get("[placeholder='Username']").type("QA" + randomString);
        cy.get("[placeholder='Email']").type("QATest" + randomString + "@mail.com");
        cy.get("[placeholder='Password']").type("Password1");
        cy.get("button").contains("Sign up").click();
        Cypress.Screenshot.defaults({
            capture: 'runner',
          })
        
        cy.wait("@newUser").then(({request, response}) => {
            cy.log("request: " + JSON.stringify(request));
            cy.log("response: " + JSON.stringify(response));

            expect(response.statusCode).to.eq(201);
            expect(request.body.user.username).to.eq(username);
            expect(request.body.user.email).to.eq(email);
        })
    })

    it("Test Valid Login & Mock Popular tags", ()=>{
        cy.intercept("GET","**/tags",{fixture: 'popularTags.json'});
        cy.visit("http://localhost:4200/");
        cy.get(".nav").contains("Sign in").click();
        cy.get("[placeholder='Email']").type(email);
        cy.get("[placeholder='Password']").type(password);
        cy.get("button").contains("Sign in").click();
        cy.get(':nth-child(4) .nav-link').contains(username);
        cy.screenshot();
        cy.screenshot("latihan SS Angular2");

        cy.get('.tag-list').should("contain","JavaScript").and("contain","cypress");
        
    })

    it("Mock global feed data", () => {
        cy.intercept("GET","**/api/articles*",{fixture: 'testArticels.json'}).as("articles");
        cy.visit("http://localhost:4200/");
        cy.get(".nav").contains("Sign in").click();
        cy.get("[placeholder='Email']").type(email);
        cy.get("[placeholder='Password']").type(password);
        cy.get("button").contains("Sign in").click();
        cy.get(':nth-child(4) .nav-link').contains(username); 
        cy.screenshot();
        cy.screenshot("latihan SS Angular3");
        cy.wait("@articles");
    })
})