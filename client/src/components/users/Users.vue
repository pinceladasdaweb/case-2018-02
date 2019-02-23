<template>
  <div class="users">
    <h3>{{ page }}</h3>
    <div class="card">
      <div class="card-header">Adicionar Paciente</div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Nome:</label>
            <input type="text" v-model="userData.name" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Adicionar</button>  
          </div>
        </form>
      </div>
    </div>  
    <div class="card mt-5">
      <div class="card-header">Lista de Pacientes</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <template v-if="editId == user.id">
                <td>
                  <input v-model="editUserData.name" class="form-control ml-sm-2 mr-sm-4 my-2" type="text">
                </td>
                <td>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onEditSubmit(user.id)"><i class="fa fa-check"></i></a>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onCancel"><i class="fa fa-ban"></i></a>
                </td>
              </template>
              <template v-else>
                <td>{{ user.name }}</td>
                <td>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onEdit(user)"><i class="fa fa-pencil"></i></a>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onDelete(user.id)"><i class="fa fa-trash"></i></a>
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { server } from "../../helper"
import axios from 'axios'

export default {
  name: 'users',
  data () {
    return {
      page: 'Pacientes',
      editId: '',
      userData: {
        'name': ''
      },
      editUserData: {
        'name': ''
      },
      users: []
    }
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios.get(`${server.baseURL}/users`)
      .then(data => (this.users = data.data.data))
    },
    onSubmit(event) {
      axios.post(`${server.baseURL}/users`, { user: this.userData.name })
      .then(this.getUsers);
      this.userData.name = ''
      event.target.reset()
    },
    onEdit(user) {
      this.editId = user.id
      this.editUserData.name = user.name
    },
    onDelete(id) {
      axios.delete(`${server.baseURL}/users/${id}`)
      .then(this.getUsers)
    },
    onEditSubmit(id) {
      axios.put(`${server.baseURL}/users/${id}`, { user: this.editUserData.name }).then(this.getUsers)
      this.editId = ''
      this.editUserData.name = ''
    },
    onCancel() {
      this.editId = ''
      this.editUserData.name = ''
    }
  }
}
</script>

<style>
  .icon {
    margin-right: 10px
  }
</style>