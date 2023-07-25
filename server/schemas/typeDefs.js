const { gql } = require('apollo-server-express')

const typeDefs = gql`
type User {
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}

type bookSchema {
    authors: [{String!}]
    description: String!
    bookId: ID!
    image: String!
    link: String!
    title: String!
}

type Query {
    user: [user] 
    book: [bookSchema] 
}
`

module.exports = typeDefs;