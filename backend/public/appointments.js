let editAppointmentId = null;


// ======================
// LOAD PATIENTS DROPDOWN
// ======================

async function loadPatientsDropdown() {

    const response =
    await fetch('/patients');

    const patients =
    await response.json();

    let html =
    '<option value="">Select Patient</option>';

    patients.forEach(patient => {

        html += `
        <option value="${patient.patient_id}">
            ${patient.first_name}
            ${patient.last_name}
        </option>
        `;

    });

    document.getElementById('patient_id').innerHTML =
    html;
}


// ======================
// LOAD DOCTORS DROPDOWN
// ======================

async function loadDoctorsDropdown() {

    const response =
    await fetch('/doctors');

    const doctors =
    await response.json();

    let html =
    '<option value="">Select Doctor</option>';

    doctors.forEach(doctor => {

        html += `
        <option value="${doctor.doctor_id}">
            Dr. ${doctor.first_name}
            ${doctor.last_name}
        </option>
        `;

    });

    document.getElementById('doctor_id').innerHTML =
    html;
}


// ======================
// LOAD APPOINTMENTS
// ======================

async function loadAppointments() {

    const response =
    await fetch('/appointments');

    const appointments =
    await response.json();

    let html = '';

    appointments.forEach(app => {

        html += `

        <tr>

            <td>${app.appointment_id}</td>

            <td>${app.patient_name}</td>

            <td>${app.doctor_name}</td>

            <td>${app.appointment_date}</td>

            <td>${app.status}</td>

            <td>

                <button
                class="btn btn-warning btn-sm me-2"
                onclick="editAppointment(
                ${app.appointment_id},
                ${app.patient_id},
                ${app.doctor_id},
                '${app.appointment_date}',
                '${app.status}'
                )">

                Edit

                </button>

                <button
                class="btn btn-danger btn-sm"
                onclick="deleteAppointment(${app.appointment_id})">

                Delete

                </button>

            </td>

        </tr>

        `;

    });

    document.getElementById('appointmentsTable').innerHTML =
    html;
}


// ======================
// ADD / UPDATE APPOINTMENT
// ======================

document
.getElementById('appointmentForm')
.addEventListener('submit', async (e) => {

    e.preventDefault();

    const appointmentData = {

        patient_id:
        document.getElementById('patient_id').value,

        doctor_id:
        document.getElementById('doctor_id').value,

        appointment_date:
        document.getElementById('appointment_date').value,

        status:
        document.getElementById('status').value

    };

    if(editAppointmentId){

        await fetch(`/appointments/${editAppointmentId}`, {

            method:'PUT',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify(appointmentData)

        });

        editAppointmentId = null;

    }
    else{

        await fetch('/appointments', {

            method:'POST',

            headers:{
                'Content-Type':'application/json'
            },

            body:JSON.stringify(appointmentData)

        });

    }

    document
    .getElementById('appointmentForm')
    .reset();

    loadAppointments();

});


// ======================
// EDIT APPOINTMENT
// ======================

function editAppointment(
    id,
    patientId,
    doctorId,
    date,
    status
){

    editAppointmentId = id;

    document.getElementById('patient_id').value =
    patientId;

    document.getElementById('doctor_id').value =
    doctorId;

    document.getElementById('appointment_date').value =
date.split('T')[0];

    document.getElementById('status').value =
    status;

    window.scrollTo({
        top:0,
        behavior:'smooth'
    });

}


// ======================
// DELETE APPOINTMENT
// ======================

async function deleteAppointment(id){

    const confirmDelete =
    confirm('Delete appointment?');

    if(!confirmDelete){
        return;
    }

    await fetch(`/appointments/${id}`,{

        method:'DELETE'

    });

    loadAppointments();

}


// ======================
// INITIAL LOAD
// ======================

loadPatientsDropdown();
loadDoctorsDropdown();
loadAppointments();