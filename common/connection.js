import mysql from 'promise-mysql'
import { config } from './config'

const pool = mysql.createPool(config)

export default pool