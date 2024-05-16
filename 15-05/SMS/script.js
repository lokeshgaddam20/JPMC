async function fetchData() {
    const res = await axios.get(`http://localhost:3000/users`);
    const data = await res.data;
    data.forEach(student => {
        const r = document.createElement('tr');
        r.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.branch}</td>
        <td>${student.cgpa}</td>
        <td align="center">
        <button data-id="${student.id}" id="edit" onclick="editData(this.dataset.id)"><span class="material-symbols-outlined">
        edit
        </span></button>
        <button data-id="${student.id}" id="del" onclick="del(this.dataset.id)"><span class="material-symbols-outlined">
        delete_forever
        </span></button>
        </td>
        `
        const ab = document.getElementById('tablebody');
        ab.appendChild(r);
    })
}


async function addData() {
    const r = document.getElementById('rno').value;
    const n = document.getElementById('name').value;
    const b = document.getElementById('branch').value;
    const c = document.getElementById('cgpa').value;

    await axios.post(`http://localhost:3000/users`, {
        "id": r,
        "name": n,
        "branch": b,
        "cgpa": c
    });
}

async function editData(id) {
    const fetch = await axios.get(`http://localhost:3000/users/${id}`);
    const student = fetch.data;

    document.getElementById('rno').value = student.id;
    document.getElementById('name').value = student.name;
    document.getElementById('branch').value = student.branch;
    document.getElementById('cgpa').value = student.cgpa;

    document.getElementById('stuform').onsubmit = async function(event) {
        event.preventDefault();

        await axios.patch(`http://localhost:3000/users/${id}`, {
            "id": document.getElementById('rno').value,
            "name": document.getElementById('name').value,
            "branch": document.getElementById('branch').value,
            "cgpa": document.getElementById('cgpa').value
        });
        fetchData();
    };
}


async function del(id) {
    await axios.delete(`http://localhost:3000/users/${id}`);
    fetchData();
}
