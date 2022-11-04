const {AuthenticationError} = require('apollo-server-express');
const {User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        // not working: I think it's expecting info from the header, not an _id
        user: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id);
              return user;
            }
        }
    },
    Mutation: {
        // working
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
    }
};

module.exports = resolvers; 