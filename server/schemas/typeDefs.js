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

type Query {
    me(_id: String!): User
    }

type Mutation {
    login(email, password): Auth
    addUser(username, email, password): Auth
    saveBook([authors], description, title, bookId, image, link): User
    removeBook(bookId): User
}
`

module.exports = typeDefs;