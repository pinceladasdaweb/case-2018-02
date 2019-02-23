<template>
  <div class="drugs">
    <h3>{{ page }}</h3>
    <div class="card">
      <div class="card-header">Adicionar Princípio Ativo</div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Nome:</label>
            <input type="text" v-model="drugsData.name" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Medicamento:</label>
            <select v-model="drugsData.id" class="custom-select form-control form-control-sm d-inline-block">
              <option v-for="medicine in medicines" v-bind:value="medicine.id">{{ medicine.name }}</option>
            </select>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Adicionar</button>  
          </div>
        </form>
      </div>
    </div>  
    <div class="card mt-5">
      <div class="card-header">Lista de Princípio Ativos</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>ID Medicamento</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="drug in drugs" :key="drug.id">
              <template v-if="editId == drug.id">
                <td>
                  <input v-model="editDrugsData.name" class="form-control ml-sm-2 mr-sm-4 my-2" type="text">
                </td>
                <td>
                  <select v-model="editDrugsData.id" class="custom-select form-control form-control-sm d-inline-block">
                    <option v-for="medicine in medicines" v-bind:value="medicine.id">{{ medicine.name }}</option>
                  </select>
                </td>
                <td>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onEditSubmit(drug.id)"><i class="fa fa-check"></i></a>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onCancel"><i class="fa fa-ban"></i></a>
                </td>
              </template>
              <template v-else>
                <td>{{ drug.drug_name }}</td>
                <td>{{ drug.medicine_id }}</td>
                <td>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onEdit(drug)"><i class="fa fa-pencil"></i></a>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onDelete(drug.id)"><i class="fa fa-trash"></i></a>
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
  name: 'drugs',
  data () {
    return {
      page: 'Princípio Ativo',
      editId: '',
      drugsData: {
        'id': '',
        'name': ''
      },
      editDrugsData: {
        'id': '',
        'name': ''
      },
      medicines: [],
      drugs: []
    }
  },
  created() {
    this.getMedicines();
    this.getDrugs();
  },
  methods: {
    getMedicines() {
      axios.get(`${server.baseURL}/medicines`)
      .then(data => (this.medicines = data.data.data))
    },
    getDrugs() {
      axios.get(`${server.baseURL}/drugs`)
      .then(data => (this.drugs = data.data.data))
    },
    onSubmit(event) {
      let body = {
        drug: this.drugsData.name,
        medicine_id: this.drugsData.id
      }
      axios.post(`${server.baseURL}/drugs`, body)
      .then(this.getDrugs)
      this.drugsData.id = ''
      this.drugsData.name = ''
      event.target.reset()
    },
    onDelete(id) {
      axios.delete(`${server.baseURL}/drugs/${id}`)
      .then(this.getDrugs)
    },
    onEdit(drug) {
      this.editId = drug.id
      this.editDrugsData.name = drug.drug_name
    },
    onEditSubmit(id) {
      let body = {
        drug: this.editDrugsData.name,
        medicine_id: this.editDrugsData.id
      }
      axios.put(`${server.baseURL}/drugs/${id}`, body)
      .then(this.getDrugs)
      this.editId = ''
      this.editDrugsData.name = ''
      this.editDrugsData.id = ''
    },
    onCancel() {
      this.editId = ''
      this.editDrugsData.name = ''
      this.editDrugsData.id = ''
    }
  }
}
</script>

<style>
  .icon {
    margin-right: 10px
  }
</style>