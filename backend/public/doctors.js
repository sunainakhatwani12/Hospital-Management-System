let editDoctorId = null;


// ======================
// LOAD DOCTORS
// ======================

async function loadDoctors() {

    try {

        const response =
        await fetch('/doctors');

        const doctors =
        await response.json();

        let html = '';

        doctors.forEach(doctor => {

            html += `

            <tr>

                <td>${doctor.doctor_id}</td>

                <td>
                    ${doctor.first_name}
                    ${doctor.last_name}
                </td>

                <td>
                    ${doctor.specialization || ''}
                </td>

                <td>

                    <button
                    class="btn btn-warning btn-sm me-2"
                    onclick="editDoctor(
                    ${doctor.doctor_id},
                    '${doctor.first_name}',
                    '${doctor.last_name}',
                    '${doctor.specialization || ''}'
                    )">

                    Edit

                    </button>

                    <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteDoctor(${doctor.doctor_id})">

                    Delete

                    </button>

                </td>

            </tr>

            `;

        });

        document.getElementById('doctorsTable').innerHTML =
        html;

    }
    catch(error){

        console.error(error);

    }

}


// ======================
// ADD / UPDATE DOCTOR
// ======================

document
.getElementById('doctorForm')
.addEventListener('submit', async (e) => {

    e.preventDefault();

    const doctorData = {

        first_name:
        document.getElementById('first_name').value,

        last_name:
        document.getElementById('last_name').value,

        specialization:
        document.getElementById('specialization').value,

        phone:'',
        email:'',
        salary:0

    };

    try {

        if(editDoctorId){

            await fetch(`/doctors/${editDoctorId}`,{

                method:'PUT',

                headers:{
                    'Content-Type':'application/json'
                },

                body:JSON.stringify(doctorData)

            });

            editDoctorId = null;

        }
        else{

            await fetch('/doctors',{

                method:'POST',

                headers:{
                    'Content-Type':'application/json'
                },

                body:JSON.stringify(doctorData)

            });

        }

        document
        .getElementById('doctorForm')
        .reset();

        loadDoctors();

    }
    catch(error){

        console.error(error);

    }

});


// ======================
// EDIT DOCTOR
// ======================

function editDoctor(
    id,
    firstName,
    lastName,
    specialization
){

    editDoctorId = id;

    document.getElementById('first_name').value =
    firstName;

    document.getElementById('last_name').value =
    lastName;

    document.getElementById('specialization').value =
    specialization;

    window.scrollTo({
        top:0,
        behavior:'smooth'
    });

}


// ======================
// DELETE DOCTOR
// ======================

async function deleteDoctor(id){

    const confirmDelete =
    confirm('Delete this doctor?');

    if(!confirmDelete){
        return;
    }

    try{

        await fetch(`/doctors/${id}`,{

            method:'DELETE'

        });

        loadDoctors();

    }
    catch(error){

        console.error(error);

    }

}


// ======================
// INITIAL LOAD
// ======================

loadDoctors();