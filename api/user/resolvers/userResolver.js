const { GraphQLScalarType } = require('graphql')

const userResolvers = {
  RolesType: {
    STUDENT: 'STUDENT',
    TEACHER: 'TEACHER',
    COORDINATION: 'COORDINATION',
    // DIRECTOR: 'CODE-001'
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'date string with ISO-8601 format',
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value)
  }),
  Query: {
    users: (root, args, { dataSources }, info) => dataSources.usersAPI.getUsers(),
    user: (root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
  },
  Mutation: {
    registerUser: async (root, { user }, { dataSources }) => dataSources.usersAPI.registerUser(user),
    updateUser: async (root, data, { dataSources }) => dataSources.usersAPI.updateUser(data),
    deleteUser: async (root, { id }, { dataSources }) => dataSources.usersAPI.deleteUser(id)
  }
}

module.exports = userResolvers
