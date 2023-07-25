const { gql } = require('apollo-server-express')

const typeDefs = gql`
type User {
    username: String!
    email: String!
    password: String!
    savedBooks: [bookSchema]
}

type bookSchema {
    authors: [String!]
    description: String!
    bookId: ID!
    image: String!
    link: String!
    title: String!
}

type Query {
    users: [User] 
    user(_id: String!): User
    books: [bookSchema] 
}
`

module.exports = typeDefs;