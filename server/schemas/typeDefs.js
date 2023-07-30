const { gql } = require('apollo-server-express')

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
    login(email, password): Auth
    addUser(username, email, password): Auth
    saveBook(userId, book: bookData): User
    removeBook(bookId): User
}
`

module.exports = typeDefs;