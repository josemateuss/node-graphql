const { RESTDataSource } = require('apollo-datasource-rest')

class UserAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000'
    this.customResponse = {
      code: 200,
      message: 'successful operation'
    }
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

  async registerUser(user) {
    const users = await this.get('/users')
    user.id = users.length + 1
    const role = await this.get(`/roles?type=${user.role}`)

    await this.post('users', { id: user.id, name: user.name, email: user.email, age: user.age,
      height: user.height, active: user.active, createdAt: user.createdAt, role : role[0].id })

    user.phones.map(async phone => (
      await this.post('phones', { user: user.id, number: phone })
    ))

    return ({
      ...user,
      role: role[0]
    })
  }

  async updateUser(data) {
    const user = data.user
    const role = await this.get(`/roles?type=${user.role}`)
    await this.put(`users/${data.id}`, { id: data.id, name: user.name, email: user.email,
      age: user.age, height: user.height, active: user.active, updatedAt: user.updatedAt, role: role[0].id })
    return ({
      ...this.customResponse,
      user: {
        ...user,
        role: role[0]
      }
    })
    // TODO: make dynamic update for phones
  }

  async deleteUser(id) {
    const phone_ids = await this.get(`phones?user=${id}`)

    phone_ids.map(async phone => (
      await this.delete(`phones/${phone.id}`)
    ))

    await this.delete(`users/${id}`)
    return this.customResponse
  }
}

module.exports = UserAPI
