const {gql} = require('apollo-server-express');
// typeDefs determine what must(!) or simply can (no "!") be returned in a query/mutation
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): User
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;