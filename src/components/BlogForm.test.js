import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


const blog = {
  title: 'test blog',
  author: 'imaginary writer',
  url: 'http://wwww.some.sm',
  likes: 2,
  user: {
    username: 'username',
    name: 'some name'
  }
}

test('create blog called right', async () => {
  



})