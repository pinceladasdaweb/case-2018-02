import pool from'../common/connection';

class Users {
  constructor() {}

  async getAll(req, res, next) {
    try {
      const query = await pool.query('SELECT * FROM users;')

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
      const userId = req.params.userId
      const query = await pool.query('SELECT * FROM users WHERE id = ?;', [userId])

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
      const user = req.body.user
      const query = await pool.query('INSERT INTO users (name, created_at, updated_at) VALUES (?, now(), now());', [user])

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
      const userId = req.params.userId
      const user = req.body.user
      const query = await pool.query('UPDATE users SET name = ?, updated_at = now() WHERE id = ?;', [user, userId])

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
      const userId = req.params.userId
      const query = await pool.query('DELETE FROM users WHERE id = ?;', [userId])

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

export default new Users