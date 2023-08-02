// Imports gql from apoll server
const { gql } = require('apollo-server-express')

// Types, queries and mutations defined
const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int!
    password: String!
    savedBooks: [Book]
}

type Book {
    bookId: ID!
    authors: [String!]
    description: String!
    title: String!
    image: String!
    link: String!
}

type Auth {
    token: ID!
    user: User
}

input bookData {
    bookId: ID!
    authors: [String!]
    description: String!
    title: String!
    image: String!
    link: String!
}

type Query {
    me(_id: String!): User
    }

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(userId: ID!, book: bookData!): User
    removeBook(userId: ID!, bookId: ID!): User
}
`

module.exports = typeDefs;