import pool from'../common/connection'

class Medicines {
  constructor() {}

  async getAll(req, res, next) {
    try {
      const query = await pool.query('SELECT * FROM medicines;')

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
      const medicineId = req.params.medicineId
      const query = await pool.query('SELECT * FROM medicines WHERE id = ?;', [medicineId])

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
      const medicine = req.body.medicine
      const query = await pool.query('INSERT INTO medicines (name, created_at, updated_at) VALUES (?, now(), now());', [medicine])

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
      const medicineId = req.params.medicineId
      const medicine = req.body.medicine
      const query = await pool.query('UPDATE medicines SET name = ?, updated_at = now() WHERE id = ?;', [medicine, medicineId])

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
      const medicineId = req.params.medicineId
      const query = await pool.query('DELETE FROM medicines WHERE id = ?;', [medicineId])

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

export default new Medicines