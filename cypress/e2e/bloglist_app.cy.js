describe('Bloglist app', function() {
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'superuser',
      password: 'topsecret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')

  })
  it('front page can be opened', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('Log in to application')
  })
  describe('Login',function(){
    it('succeeds with correct credentials', function(){
      cy.get('#username').type('superuser')
      cy.get('#password').type('topsecret')
      cy.get('#login').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function(){
      cy.get('#username').type('superuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login').click()
      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })


})
