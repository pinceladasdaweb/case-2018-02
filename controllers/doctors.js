import pool from'../common/connection'

class Doctors {
  constructor() {}

  async getAll(req, res, next) {
    try {
      const query = await pool.query('SELECT * FROM doctors;')

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
      const doctorId = req.params.doctorId
      const query = await pool.query('SELECT * FROM doctors WHERE id = ?;', [doctorId])

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
      const doctor = req.body.doctor
      const query = await pool.query('INSERT INTO doctors (name, created_at, updated_at) VALUES (?, now(), now());', [doctor])

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
      const doctorId = req.params.doctorId
      const doctor = req.body.doctor
      const query = await pool.query('UPDATE doctors SET name = ?, updated_at = now() WHERE id = ?;', [doctor, doctorId])

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
      const doctorId = req.params.doctorId
      const query = await pool.query('DELETE FROM doctors WHERE id = ?;', [doctorId])

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

export default new Doctors