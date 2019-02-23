import pool from'../common/connection'

class Integrations {
  constructor() {}

  async getAll(req, res, next) {
    try {
      const query = await pool.query('SELECT * FROM medicine_integrations;')

      res.json({
        success: true,
        data: query
      })
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      const integrationId = req.params.integrationId
      const query = await pool.query('SELECT * FROM medicine_integrations WHERE id = ?;', [integrationId])

      res.json({
        success: true,
        data: query
      })
    } catch (err) {
      next(err)
    }
  }

  async create(req, res, next) {
    try {
      const drug1 = req.body.drug1
      const drug2 = req.body.drug2
      const name = req.body.name
      const description = req.body.description
      const query = await pool.query('INSERT INTO medicine_integrations (drug1, drug2, name, description, created_at, updated_at) VALUES (?, ?, ?, ?, now(), now());', [drug1, drug2, name, description])

      res.json({
        success: true,
        data: [{
          affectedRows: query.affectedRows
        }]
      })
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    try {
      const integrationId = req.params.integrationId
      const drug1 = req.body.drug1
      const drug2 = req.body.drug2
      const name = req.body.name
      const description = req.body.description
      const query = await pool.query('UPDATE medicine_integrations SET drug1 = ?, drug2 = ?, name = ?, description = ?, updated_at = now() WHERE id = ?;', [drug1, drug2, name, description, integrationId])

      res.json({
        success: true,
        data: [{
          affectedRows: query.affectedRows
        }]
      })
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    try {
      const integrationId = req.params.integrationId
      const query = await pool.query('DELETE FROM medicine_integrations WHERE id = ?;', [integrationId])

      res.json({
        success: true,
        data: [{
          affectedRows: query.affectedRows
        }]
      })
    } catch (err) {
      next(err)
    }
  }
}

export default new Integrations