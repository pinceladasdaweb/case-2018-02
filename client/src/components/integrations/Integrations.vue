<template>
  <div class="integrations">
    <h3>{{ page }}</h3>
    <div class="card">
      <div class="card-header">Adicionar Integração</div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Nome:</label>
            <input type="text" v-model="integrationData.name" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Descrição:</label>
            <input type="text" v-model="integrationData.description" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Princípio 1:</label>
            <select v-model="drugsData.id1" class="custom-select form-control form-control-sm d-inline-block">
              <option v-for="drug in drugs" v-bind:value="drug.id">{{ drug.drug_name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Princípio 2:</label>
            <select v-model="drugsData.id2" class="custom-select form-control form-control-sm d-inline-block">
              <option v-for="drug in drugs" v-bind:value="drug.id">{{ drug.drug_name }}</option>
            </select>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Adicionar</button>  
          </div>
        </form>
      </div>
    </div>
    <div class="card mt-5">
      <div class="card-header">Lista de Integrações</div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>ID Princ. 1</th>
              <th>ID Princ. 2</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="integration in integrations" :key="integration.id">
              <template v-if="editId == integration.id">
                <td>
                  <input v-model="editIntegrationData.name" class="form-control ml-sm-2 mr-sm-4 my-2" type="text">
                </td>
                <td>
                  <input v-model="editIntegrationData.description" class="form-control ml-sm-2 mr-sm-4 my-2" type="text">
                </td>
                <td>
                  <select v-model="editDrugsData.id1" class="custom-select form-control form-control-sm d-inline-block">
                    <option v-for="drug in drugs" v-bind:value="drug.id">{{ drug.drug_name }}</option>
                  </select>
                </td>
                <td>
                  <select v-model="editDrugsData.id2" class="custom-select form-control form-control-sm d-inline-block">
                    <option v-for="drug in drugs" v-bind:value="drug.id">{{ drug.drug_name }}</option>
                  </select>
                </td>
                <td>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onEditSubmit(integration.id)"><i class="fa fa-check"></i></a>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onCancel"><i class="fa fa-ban"></i></a>
                </td>
              </template>
              <template v-else>
                <td>{{ integration.name }}</td>
                <td>{{ integration.description }}</td>
                <td>{{ integration.drug1 }}</td>
                <td>{{ integration.drug2 }}</td>
                <td>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onEdit(integration)"><i class="fa fa-pencil"></i></a>
                  <a href="#" class="icon" v-on:click.stop.prevent v-on:click="onDelete(integration.id)"><i class="fa fa-trash"></i></a>
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
  name: 'integrations',
  data () {
    return {
      page: 'Integrações Medicamentosas',
      editId: '',
      integrationData: {
        'id': '',
        'name': '',
        'description': ''
      },
      drugsData: {
        'id1': '',
        'id2': ''
      },
      editIntegrationData: {
        'id': '',
        'name': '',
        'description': ''
      },
      editDrugsData: {
        'id1': '',
        'id2': ''
      },
      drugs: [],
      integrations: []
    }
  },
  created() {
    this.getDrugs();
    this.getIntegrations();
  },
  methods: {
    getDrugs() {
      axios.get(`${server.baseURL}/drugs`)
      .then(data => (this.drugs = data.data.data))
    },
    getIntegrations() {
      axios.get(`${server.baseURL}/integrations`)
      .then(data => (this.integrations = data.data.data))
    },
    onSubmit(event) {
      let body = {
        drug1: this.drugsData.id1,
        drug2: this.drugsData.id2,
        name: this.integrationData.name,
        description: this.integrationData.description
      }
      axios.post(`${server.baseURL}/integrations`, body)
      .then(this.getIntegrations)
      this.drugsData.id1 = ''
      this.drugsData.id2 = ''
      this.integrationData.name = ''
      this.integrationData.description = ''
      event.target.reset()
    },
    onDelete(id) {
      axios.delete(`${server.baseURL}/integrations/${id}`)
      .then(this.getIntegrations)
    },
    onEdit(integration) {
      this.editId = integration.id
      this.editIntegrationData.name = integration.name
      this.editIntegrationData.description = integration.description
    },
    onEditSubmit(id) {
      let body = {
        drug1: this.editDrugsData.id1,
        drug2: this.editDrugsData.id2,
        name: this.editIntegrationData.name,
        description: this.editIntegrationData.description
      }

      axios.put(`${server.baseURL}/integrations/${id}`, body)
      .then(this.getIntegrations)
      this.editId = ''
      this.editIntegrationData.id = ''
      this.editIntegrationData.name = ''
      this.editIntegrationData.description = ''
      this.editDrugsData.id1 = ''
      this.editDrugsData.id2 = ''
    },
    onCancel() {
      this.editId = ''
      this.editIntegrationData.name = ''
      this.editIntegrationData.description = ''
    }
  }
}
</script>

<style>
  .icon {
    margin-right: 10px
  }
</style>