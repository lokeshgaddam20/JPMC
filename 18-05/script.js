async function fetchData() {
    try {
        const response = await axios.get('http://localhost:3000/api/students/');
        const students = response.data;
        const studentList = document.getElementById('studentList');
        studentList.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student._id}</td>
                <td>${student.name}</td>
                <td>${student.branch}</td>
                <td>${student.cgpa}</td>
                <td>
                    <button onclick="editStudent('${student._id}', '${student.name}', '${student.branch}', '${student.cgpa}')"  class="btn btn-sm btn-primary me-2"><span class="material-symbols-outlined">
                    edit
                    </span></button>
                    <button onclick="deleteStudent('${student._id}')"  class="btn btn-sm btn-primary me-2"><span class="material-symbols-outlined">
                    delete_forever
                    </span></button>
                </td>
            `;
            studentList.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function addStudent() {
    try {
        const id = document.getElementById('studentId').value;
        const name = document.getElementById('name').value;
        const branch = document.getElementById('branch').value;
        const cgpa = document.getElementById('cgpa').value;
        console.log(id, name, branch, cgpa);
        await axios.post(`http://localhost:3000/api/students/${id}`, {
            _id: id,
            name,
            branch,
            cgpa
        });
        fetchData();
    } catch (error) {
        console.error('Error adding student:', error);
    }
}

async function editStudent(id, name, branch, cgpa) {
    document.getElementById('studentId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('branch').value = branch;
    document.getElementById('cgpa').value = cgpa;
}

async function updateStudent() {
    try {
        const id = document.getElementById('studentId').value;
        const name = document.getElementById('name').value;
        const branch = document.getElementById('branch').value;
        const cgpa = document.getElementById('cgpa').value;
        await axios.put(`http://localhost:3000/api/students/${id}`, {
            _id: id,
            name,
            branch,
            cgpa
        });
        fetchData();
        document.getElementById('studentId').value = '';
        document.getElementById('name').value = '';
        document.getElementById('branch').value = '';
        document.getElementById('cgpa').value = '';
    } catch (error) {
        console.error('Error updating student:', error);
    }
}

async function deleteStudent(id) {
    try {
        await axios.delete(`http://localhost:3000/api/students/${id}`);
        fetchData();
    } catch (error) {
        console.error('Error deleting student:', error);
    }
}

document.getElementById('studentForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const studentId = document.getElementById('studentId').value;
    try {
        const response = await axios.get(`http://localhost:3000/api/students/${studentId}`);
        if (response.data) {
            updateStudent();
        } else {
            addStudent();
        }
    } catch (error) {
        addStudent();
    }
});

