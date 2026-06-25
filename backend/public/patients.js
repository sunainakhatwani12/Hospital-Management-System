let editPatientId = null;


// ======================
// LOAD PATIENTS
// ======================

async function loadPatients() {

    try {

        const response =
        await fetch('/patients');

        const patients =
        await response.json();

        let html = '';

        patients.forEach(patient => {

            html += `

            <tr>

                <td>${patient.patient_id}</td>

                <td>
                    ${patient.first_name}
                    ${patient.last_name}
                </td>

                <td>
                    ${patient.gender || ''}
                </td>

                <td>
                    ${patient.phone || ''}
                </td>

                <td>

                    <button
                    class="btn btn-warning btn-sm me-2"
                    onclick="editPatient(
                    ${patient.patient_id},
                    '${patient.first_name}',
                    '${patient.last_name}',
                    '${patient.gender || ''}',
                    '${patient.phone || ''}'
                    )">

                    Edit

                    </button>

                    <button
                    class="btn btn-danger btn-sm"
                    onclick="deletePatient(${patient.patient_id})">

                    Delete

                    </button>

                </td>

            </tr>

            `;

        });

        document.getElementById('patientsTable').innerHTML =
        html;

    }
    catch(error){

        console.error(error);

    }

}


// ======================
// ADD / UPDATE PATIENT
// ======================

document
.getElementById('patientForm')
.addEventListener('submit', async (e) => {

    e.preventDefault();

    const patientData = {

        first_name:
        document.getElementById('first_name').value,

        last_name:
        document.getElementById('last_name').value,

        gender:
        document.getElementById('gender').value,

        phone:
        document.getElementById('phone').value,

        email: '',
        address: '',
        dob: null

    };

    try {

        if(editPatientId){

            await fetch(`/patients/${editPatientId}`,{

                method:'PUT',

                headers:{
                    'Content-Type':'application/json'
                },

                body:JSON.stringify(patientData)

            });

            editPatientId = null;

        }
        else{

            await fetch('/patients',{

                method:'POST',

                headers:{
                    'Content-Type':'application/json'
                },

                body:JSON.stringify(patientData)

            });

        }

        document
        .getElementById('patientForm')
        .reset();

        loadPatients();

    }
    catch(error){

        console.error(error);

    }

});


// ======================
// EDIT PATIENT
// ======================

function editPatient(
    id,
    firstName,
    lastName,
    gender,
    phone
){

    editPatientId = id;

    document.getElementById('first_name').value =
    firstName;

    document.getElementById('last_name').value =
    lastName;

    document.getElementById('gender').value =
    gender;

    document.getElementById('phone').value =
    phone;

    window.scrollTo({
        top:0,
        behavior:'smooth'
    });

}


// ======================
// DELETE PATIENT
// ======================

async function deletePatient(id){

    const confirmDelete =
    confirm('Delete this patient?');

    if(!confirmDelete){
        return;
    }

    try{

        await fetch(`/patients/${id}`,{

            method:'DELETE'

        });

        loadPatients();

    }
    catch(error){

        console.error(error);

    }

}


// ======================
// INITIAL LOAD
// ======================

loadPatients();