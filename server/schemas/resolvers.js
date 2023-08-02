// Imports models
const { User, bookSchema } = require('../models')
// Imports signToken function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
    // Queries defined
    Query: {
        // Me query find user by id
        me: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
        },
    },
    // Mutations defined
    Mutation: {
        // Login mutation takes in email and password to log user in
        login: async (parent, { email, password }) => {
            // Finds user by email
            const user = await User.findOne({ email: email });
            // Throws error if user is not found
            if (!user) {
                throw new Error("Can't find this user")
            }
            // Calls isCorrectPassword function and verifies password
            const correctPw = await user.isCorrectPassword(password);
            // Throws error if password is not correct
            if (!correctPw) {
                throw new Error("Wrong password")
            }
            // Signs token using user info
            const token = signToken(user);
            // Returns token and user which is Auth type in typeDefs
            return ({ token, user });
        },
        // Adds user to database taking in username, email, and password
        addUser: async (parent, { username, email, password }) => {
            // Creates new user using params
            const user = await User.create(username, email, password);
            // Throws error if no user is created
            if (!user) {
                throw new Error('Something is wrong!');
            }
            // Signs and returns token with user
            const token = signToken(user);
            return ({ token, user });
        },
        // Saves book to user's array of savedBooks
        saveBook: async (parent, { userId, bookData }) => {
            try {
                // Finds user by id and adds incoming bookData to set
                const updatedUser = await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                console.log(err);
                return err;
            }
        },
        // Removes book by id
        removeBook: async (parent, { userId, bookId }) => {
            // Finds user by id and removes a book from user's savedBooks array by its id
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: "Couldn't find user with this id!" });
            }
            return updatedUser;
        }
    }
};

module.exports = resolvers;
