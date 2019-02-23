<template>
  <div class="medicines">
    <h3>{{ page }}</h3>
    <div class="card">
      <div class="card-header">Adicionar Medicamento</div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Nome:</label>
            <input type="text" v-model="medicineData.name" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Adicionar</button>  
          </div>
        </form>
      </div>
    </div>  
    <div class="card mt-5">
      <div class="card-header">Lista de Medicamentos</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="medicine in medicines" :key="medicine.id">
              <template v-if="editId == medicine.id">
                <td>
                  <input v-model="editMedicineData.name" class="form-control ml-sm-2 mr-sm-4 my-2" type="text">
                </td>
                <td>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onEditSubmit(medicine.id)"><i class="fa fa-check"></i></a>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onCancel"><i class="fa fa-ban"></i></a>
                </td>
              </template>
              <template v-else>
                <td>{{ medicine.name }}</td>
                <td>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onEdit(medicine)"><i class="fa fa-pencil"></i></a>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onDelete(medicine.id)"><i class="fa fa-trash"></i></a>
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
  name: 'medicines',
  data () {
    return {
      page: 'Medicamentos',
      editId: '',
      medicineData: {
        'name': ''
      },
      editMedicineData: {
        'name': ''
      },
      medicines: []
    }
  },
  created() {
    this.getMedicines();
  },
  methods: {
    getMedicines() {
      axios.get(`${server.baseURL}/medicines`)
      .then(data => (this.medicines = data.data.data))
    },
    onSubmit(event) {
      axios.post(`${server.baseURL}/medicines`, { medicine: this.medicineData.name })
      .then(this.getMedicines)
      this.medicineData.name = ''
      event.target.reset()
    },
    onEdit(medicine) {
      this.editId = medicine.id
      this.editMedicineData.name = medicine.name
    },
    onDelete(id) {
      axios.delete(`${server.baseURL}/medicines/${id}`)
      .then(this.getMedicines)
    },
    onEditSubmit(id) {
      axios.put(`${server.baseURL}/medicines/${id}`, { medicine: this.editMedicineData.name }).then(this.getMedicines)
      this.editId = ''
      this.editMedicineData.name = ''
    },
    onCancel() {
      this.editId = ''
      this.editMedicineData.name = ''
    }
  }
}
</script>

<style>
  .icon {
    margin-right: 10px
  }
</style>