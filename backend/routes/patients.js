import express from 'express';
import pool from '../db.js';

const router = express.Router();


// GET ALL PATIENTS
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM Patients ORDER BY patient_id'
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// GET PATIENT BY ID
router.get('/:id', async (req, res) => {
    try {

        const result = await pool.query(
            'SELECT * FROM Patients WHERE patient_id=$1',
            [req.params.id]
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// CREATE PATIENT
router.post('/', async (req, res) => {

    try {

        const {
            first_name,
            last_name,
            gender,
            dob,
            phone,
            email,
            address
        } = req.body;

        const result = await pool.query(
            `INSERT INTO Patients
            (first_name,last_name,gender,dob,phone,email,address)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING *`,
            [
                first_name,
                last_name,
                gender,
                dob,
                phone,
                email,
                address
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// UPDATE PATIENT
router.put('/:id', async (req, res) => {

    try {

        const {
            first_name,
            last_name,
            gender,
            dob,
            phone,
            email,
            address
        } = req.body;

        const result = await pool.query(
            `UPDATE Patients
            SET
            first_name=$1,
            last_name=$2,
            gender=$3,
            dob=$4,
            phone=$5,
            email=$6,
            address=$7
            WHERE patient_id=$8
            RETURNING *`,
            [
                first_name,
                last_name,
                gender,
                dob,
                phone,
                email,
                address,
                req.params.id
            ]
        );

        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


// DELETE PATIENT

router.delete('/:id', async (req, res) => {

    try {

        const patientId = req.params.id;

        await pool.query(`
            DELETE FROM prescription_medicines
            WHERE prescription_id IN (
                SELECT prescription_id
                FROM prescriptions
                WHERE patient_id = $1
            )
        `,[patientId]);

        await pool.query(
            'DELETE FROM prescriptions WHERE patient_id = $1',
            [patientId]
        );

        await pool.query(
            'DELETE FROM medical_records WHERE patient_id = $1',
            [patientId]
        );

        await pool.query(
            'DELETE FROM nurse_assignments WHERE patient_id = $1',
            [patientId]
        );

        await pool.query(
            'DELETE FROM laboratory_tests WHERE patient_id = $1',
            [patientId]
        );

        await pool.query(
            'DELETE FROM admissions WHERE patient_id = $1',
            [patientId]
        );

        await pool.query(`
            DELETE FROM payments
            WHERE bill_id IN (
                SELECT bill_id
                FROM bills
                WHERE patient_id = $1
            )
        `,[patientId]);

        await pool.query(
            'DELETE FROM bills WHERE patient_id = $1',
            [patientId]
        );

        await pool.query(
            'DELETE FROM appointments WHERE patient_id = $1',
            [patientId]
        );

        await pool.query(
            'DELETE FROM patients WHERE patient_id = $1',
            [patientId]
        );

        res.json({
            success:true,
            message:'Patient Deleted Successfully'
        });

    } catch(error){

        console.error(error);

        res.status(500).json({
            error:error.message
        });

    }

});
export default router;