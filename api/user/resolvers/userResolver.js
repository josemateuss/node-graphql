const users = [
  {
    name : "Mateus",
    active : true
  },
  {
    name : "John Doe",
    active : false
  }
]

const userResolvers = {
  Query : {
    users : () => users,
    firstUser : () => users[0]
  }
}

module.exports = userResolvers
