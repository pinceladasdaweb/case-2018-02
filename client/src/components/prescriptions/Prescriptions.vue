<template>
  <div class="prescriptions">
    <h3>{{ page }}</h3>
    <div class="card">
      <div class="card-header">Adicionar Prescrição</div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Paciente:</label>
            <select v-model="prescriptionData.paciente" class="custom-select form-control form-control-sm d-inline-block">
              <option v-for="user in users" v-bind:value="{ id: user.id, text: user.name }">{{ user.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Médico:</label>
            <select v-model="prescriptionData.medico" class="custom-select form-control form-control-sm d-inline-block">
              <option v-for="doctor in doctors" v-bind:value="{ id: doctor.id, text: doctor.name }">{{ doctor.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Medicamentos:</label>
            <select v-model="prescriptionData.medicamento" class="custom-select form-control form-control-sm d-inline-block">
              <option v-for="medicine in medicines" v-bind:value="{ id: medicine.id, text: medicine.name }">{{ medicine.name }}</option>
            </select>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Adicionar</button>  
          </div>
        </form>
      </div>
    </div>  
    <div class="card mt-5">
      <div class="card-header">Lista de Prescrições</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Medicamento</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prescription in prescriptions" :key="prescription.id">
              <td>{{ prescription.name }}</td>
              <td>{{ prescription.medicine }}</td>
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
  name: 'prescriptions',
  data () {
    return {
      page: 'Prescrições',
      lastId: '',
      prescriptionData: {
        'paciente': '',
        'medico': '',
        'medicamento': ''
      },
      users: [],
      doctors: [],
      medicines: [],
      prescriptions: []
    }
  },
  created() {
    this.getUsers();
    this.getDoctors();
    this.getMedicines();
    this.getPrescriptions();
  },
  methods: {
    getUsers() {
      axios.get(`${server.baseURL}/users`)
      .then(data => (this.users = data.data.data))
    },
    getDoctors() {
      axios.get(`${server.baseURL}/doctors`)
      .then(data => (this.doctors = data.data.data))
    },
    getMedicines() {
      axios.get(`${server.baseURL}/medicines`)
      .then(data => (this.medicines = data.data.data))
    },
    getPrescriptions() {
      axios.get(`${server.baseURL}/prescriptions`)
      .then(data => (this.prescriptions = data.data.data))
    },
    onSubmit(event) {
      this.lastId = this.prescriptionData.paciente.id  
      let body = {
        user: this.prescriptionData.paciente.id,
        medicine: this.prescriptionData.medicamento.id
      }

      if (this.lastId !== this.prescriptionData.medicamento.id) {
        alert('Houston, we have a problem')
      } else {
        axios.post(`${server.baseURL}/prescriptions`, body)
        .then(this.getPrescriptions)
        this.prescriptionData.paciente = ''
        this.prescriptionData.medico = ''
        this.prescriptionData.medicamento = ''
        event.target.reset()
      }
    }
  }
}
</script>

<style>
  .icon {
    margin-right: 10px
  }
</style>