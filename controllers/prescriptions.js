import pool from'../common/connection'

class Prescriptions {
  constructor() {}

  async getAll(req, res, next) {
    try {
      const query = await pool.query('SELECT p.id, user.name, m.name as medicine FROM prescriptions as p INNER JOIN users as user ON p.id_user = user.id INNER JOIN medicines as m ON p.id_medicine = m.id;')

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
      const prescriptionId = req.params.prescriptionId
      const query = await pool.query('SELECT p.id, user.name, m.name as medicine FROM prescriptions as p INNER JOIN users as user ON p.id_user = user.id INNER JOIN medicines as m ON p.id_medicine = m.id WHERE p.id = ?;', [prescriptionId])

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
      const userId = req.body.user
      const medicineId = req.body.medicine
      const query = await pool.query('INSERT INTO prescriptions (id_user, id_medicine, created_at, updated_at) VALUES (?, ?, now(), now());', [userId, medicineId])

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
      const prescriptionId = req.params.prescriptionId
      const userId = req.body.user
      const medicineId = req.body.medicine
      const query = await pool.query('UPDATE prescriptions SET id_user = ?, id_medicine = ?, updated_at = now() WHERE id = ?;', [userId, medicineId, prescriptionId])

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
      const prescriptionId = req.params.prescriptionId
      const query = await pool.query('DELETE FROM prescriptions WHERE id = ?;', [prescriptionId])

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

export default new Prescriptions