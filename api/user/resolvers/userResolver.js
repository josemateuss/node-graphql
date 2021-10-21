const userResolvers = {
  Query: {
    users: (root, args, { dataSources }, info) => dataSources.usersAPI.getUsers(),
    user: (root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
  },
  Mutation: {
    registerUser: async (root, user, { dataSources }) => dataSources.usersAPI.registerUser(user),
    updateUser: async (root, data, { dataSources }) => dataSources.usersAPI.updateUser(data),
    deleteUser: async (root, { id }, { dataSources }) => dataSources.usersAPI.deleteUser(id)
  }
}

module.exports = userResolvers
