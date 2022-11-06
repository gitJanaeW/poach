// AuthenticationError: sends a message to the client when authentication fails
const {AuthenticationError} = require('apollo-server-express');
const {User} = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args) => {
            if (context.user) {
                const userData = await User.findOne({})
                .select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
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
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});
            // if no email matches...
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            // if no password matches...
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return {token, user};
        }
    }
};

module.exports = resolvers; 