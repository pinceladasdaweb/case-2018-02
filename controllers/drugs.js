import pool from'../common/connection'

class Drugs {
  constructor() {}

  async getAll(req, res, next) {
    try {
      const query = await pool.query('SELECT * FROM drugs;')

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
      const drugId = req.params.drugId
      const query = await pool.query('SELECT * FROM drugs WHERE id = ?;', [drugId])

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
      const drug = req.body.drug
      const medicine_id = req.body.medicine_id
      const query = await pool.query('INSERT INTO drugs (drug_name, medicine_id, created_at, updated_at) VALUES (?, ?, now(), now());', [drug, medicine_id])

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
      const drug = req.body.drug
      const drugId = req.params.drugId
      const medicine_id = req.body.medicine_id
      const query = await pool.query('UPDATE drugs SET drug_name = ?, medicine_id = ?, updated_at = now() WHERE id = ?;', [drug, medicine_id, drugId])

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
      const drugId = req.params.drugId;
      const query = await pool.query('DELETE FROM drugs WHERE id = ?;', [drugId])

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

export default new Drugs