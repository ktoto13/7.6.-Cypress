const {email, pass, bookName1, bookName2, bookDescription, bookAuthor} = require ("../fixtures/data.json");

it("Should open the main page", () => {
    cy.login(email, pass);
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
})
    
it("Should not login with empty login", () => {
    cy.login(null, pass);
    cy.get('#mail').then($el => $el[0].checkValidity()).should('be.false');
})

it("Should not login with empty password", () => {
    cy.login(email, null);
    cy.get('#pass').then($el => $el[0].checkValidity()).should('be.false');
})

it.skip("Should create new book", () => {
    cy.login(email, pass);
    cy.createNewBook(bookName1, bookDescription, bookAuthor);
    cy.contains(bookName1);
})

it.skip("Should add book in favorites during creation", () => {
    cy.login(email, pass);
    cy.addNewBookToFavoritesDuringCreation(bookName2, bookDescription, bookAuthor);
    cy.contains(bookName2);
    cy.checkThatBookExistsInFavorites(bookName2);
})

it.skip("Should add book to favorite in Books List Page ", () => {
    cy.login(email, pass);
    cy.contains(bookName1);
    cy.addToFavorite(bookName1);
    cy.checkThatBookExistsInFavorites(bookName1);
})

it.skip("Should delete book from favorites in Favorites Page", () => {
    cy.login(email, pass);
    cy.contains(bookName1);
    cy.checkThatBookExistsInFavorites(bookName1);
    cy.deleteBookFromFavorites(bookName1, "Favorites");
    cy.wait(3000);
    cy.contains(`${bookName1}`).should('not.exist');
})

it.skip("Should delete book from favorites in Books list Page", () => {
    cy.login(email, pass);
    cy.contains(bookName2);
    cy.checkThatBookExistsInFavorites(bookName2);
    cy.deleteBookFromFavorites(bookName2, "Books list");
    cy.wait(3000);
    cy.contains('Favorites').click();
    cy.contains(`${bookName2}`).should('not.exist'); 
})