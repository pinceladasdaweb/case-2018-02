<template>
  <div class="doctors">
    <h3>{{ page }}</h3>
    <div class="card">
      <div class="card-header">Adicionar Médico</div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Nome:</label>
            <input type="text" v-model="doctorData.name" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Adicionar</button>  
          </div>
        </form>
      </div>
    </div>  
    <div class="card mt-5">
      <div class="card-header">Lista de Médicos</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doctor in doctors" :key="doctor.id">
              <template v-if="editId == doctor.id">
                <td>
                  <input v-model="editDoctorData.name" class="form-control ml-sm-2 mr-sm-4 my-2" type="text">
                </td>
                <td>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onEditSubmit(doctor.id)"><i class="fa fa-check"></i></a>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onCancel"><i class="fa fa-ban"></i></a>
                </td>
              </template>
              <template v-else>
                <td>{{ doctor.name }}</td>
                <td>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onEdit(doctor)"><i class="fa fa-pencil"></i></a>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onDelete(doctor.id)"><i class="fa fa-trash"></i></a>
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
  name: 'doctors',
  data () {
    return {
      page: 'Médicos',
      editId: '',
      doctorData: {
        'name': ''
      },
      editDoctorData: {
        'name': ''
      },
      doctors: []
    }
  },
  created() {
    this.getDoctors();
  },
  methods: {
    getDoctors() {
      axios.get(`${server.baseURL}/doctors`)
      .then(data => (this.doctors = data.data.data))
    },
    onSubmit(event) {
      axios.post(`${server.baseURL}/doctors`, { doctor: this.doctorData.name })
      .then(this.getDoctors)
      this.doctorData.name = ''
      event.target.reset()
    },
    onEdit(doctor) {
      this.editId = doctor.id
      this.editDoctorData.name = doctor.name
    },
    onDelete(id) {
      axios.delete(`${server.baseURL}/doctors/${id}`)
      .then(this.getDoctors)
    },
    onEditSubmit(id) {
      axios.put(`${server.baseURL}/doctors/${id}`, { doctor: this.editDoctorData.name }).then(this.getDoctors)
      this.editId = ''
      this.editDoctorData.name = ''
    },
    onCancel() {
      this.editId = ''
      this.editDoctorData.name = ''
    }
  }
}
</script>

<style>
  .icon {
    margin-right: 10px
  }
</style>