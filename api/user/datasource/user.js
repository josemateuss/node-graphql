const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000'
  }

  async getUsers() {
    const users = await this.get('/users')

    return users.map(async user => ({
      id: user.id,
      name: user.name,
      active: user.active,
      email: user.email,
      age: user.age,
      height: user.height,
      role: await this.get(`/roles/${user.role}`),
      phones: await this.get(`phones?user=${user.id}`)
    }))
  }

  async getUserById(id) {
    const user = await this.get(`/users/${id}`)
    user.role = await this.get(`/roles/${user.role}`)
    user.phones = await this.get(`phones?user=${user.id}`)
    return user
  }
}

module.exports = UserAPI
