const blogs = [
  { title: 'title1',
    author: 'writer1',
    url: 'http://www.imag.fi'
  },
  { title: 'title2',
    author: 'writer2',
    url: 'http://www.imag3.fi'
  },
  { title: 'title3',
    author: 'writer3',
    url: 'http://www.imag3.fi'
  }
]


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
  describe('When logged in', function(){
    beforeEach(function(){
      cy.login({ username: 'superuser', password: 'topsecret' })
    })
    it('A blog can be created', function(){
      cy.contains('create blog').click()
      cy.get('#title').type('Howdy how')
      cy.get('#author').type('John Wayne')
      cy.get('#url').type('http://www.imag.fi')
      cy.get('#create').click()
      cy.get('.blog').should('contain', 'Howdy how')
      cy.get('.blog').should('contain', 'John Wayne')
    })
    it('User can like blog', function(){
      cy.addblog({ title: blogs[0].title, author: blogs[0].author, url: blogs[0].url })
      cy.get('#view').click()
      cy.get('#like').click()
      cy.get('#like').click()
      cy.get('.blog').should('contain', 'likes 2')
    })
  })
})