import express from 'express'
import Users from '../controllers/users'
import Doctors from '../controllers/doctors'
import Medicines from '../controllers/medicines'
import Drugs from '../controllers/drugs'
import Integrations from '../controllers/integrations'
import Prescriptions from '../controllers/prescriptions'

const router = express.Router()

router.get('/users', Users.getAll)
router.get('/users/:userId([0-9]+)', Users.getById)
router.post('/users', Users.create)
router.put('/users/:userId([0-9]+)', Users.update)
router.delete('/users/:userId([0-9]+)', Users.delete)

router.get('/doctors', Doctors.getAll)
router.get('/doctors/:doctorId([0-9]+)', Doctors.getById)
router.post('/doctors', Doctors.create)
router.put('/doctors/:doctorId([0-9]+)', Doctors.update)
router.delete('/doctors/:doctorId([0-9]+)', Doctors.delete)

router.get('/medicines', Medicines.getAll)
router.get('/medicines/:medicineId([0-9]+)', Medicines.getById)
router.post('/medicines', Medicines.create)
router.put('/medicines/:medicineId([0-9]+)', Medicines.update)
router.delete('/medicines/:medicineId([0-9]+)', Medicines.delete)

router.get('/drugs', Drugs.getAll)
router.get('/drugs/:drugId([0-9]+)', Drugs.getById)
router.post('/drugs', Drugs.create)
router.put('/drugs/:drugId([0-9]+)', Drugs.update)
router.delete('/drugs/:drugId([0-9]+)', Drugs.delete)

router.get('/integrations', Integrations.getAll)
router.get('/integrations/:integrationId([0-9]+)', Integrations.getById)
router.post('/integrations', Integrations.create)
router.put('/integrations/:integrationId([0-9]+)', Integrations.update)
router.delete('/integrations/:integrationId([0-9]+)', Integrations.delete)

router.get('/prescriptions', Prescriptions.getAll)
router.get('/prescriptions/:prescriptionId([0-9]+)', Prescriptions.getById)
router.post('/prescriptions', Prescriptions.create)
router.put('/prescriptions/:prescriptionId([0-9]+)', Prescriptions.update)
router.delete('/prescriptions/:prescriptionId([0-9]+)', Prescriptions.delete)

export default router