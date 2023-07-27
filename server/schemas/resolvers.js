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
        }
        // saveBook([authors], description, title, bookId, image, link): User
        // removeBook(bookId): User
    }
};

module.exports = resolvers;
