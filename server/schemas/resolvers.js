const { User, bookSchema } = require('../models')
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
        },
    },
    Mutation: {
        login: async (email, password) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: "Can't find this user" });
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                return res.status(400).json({ message: 'Wrong password!' });
            }
            const token = signToken(user);
            return ({ token, user });
        },
        addUser: async (username, email, password) => {
            const user = await User.create(username, email, password);

            if (!user) {
                return res.status(400).json({ message: 'Something is wrong!' });
            }
            const token = signToken(user);
            return ({ token, user });
        },
        saveBook: async (parent, userId, bookData) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                console.log(err);
                return res.status(400).json(err);
            }
        },
        removeBook: async (userId, bookId) => {
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
