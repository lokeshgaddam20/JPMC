const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let students = [
    {
        "name": "Sohan",
        "course": "CSE",
        "id": 1
    },
    {
        "name": "Lokesh",
        "course": "IT",
        "id": 2
    },
    {
        "name": "Rohith",
        "course": "CSIT",
        "id": 3
    }
];


app.get('/api/std', function (req, res) {
    res.status(200).json(students);
});

app.get("/api/std/:id", function (req, res) {
    let found = students.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

app.post('/api/std/:id', function (req, res) {
    let newItem = {
        id: req.params.id,
        name: req.body.name,
        course: req.body.course,
        roll_no: req.body.roll_no
    }
    students.push(newItem);
    res.status(201).json({
        students
    });
});

app.put('/api/std/:id', function (req, res) {
    let found = students.find((item) => {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        let updateData = {
            id: found.id,
            name: req.body.name,
            course: req.body.course,
            roll_no: req.body.roll_no
        };
        let targetIndex = students.indexOf(found);
        students.splice(targetIndex, 1, updateData);
        res.status(201).json({ students });
    } else {
        res.status(404).json({
            'message': 'no student'
        });
    }
});

app.delete('/api/std/:id', function (req, res) {
    let found = students.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        let targetIndex = students.indexOf(found);
        students.splice(targetIndex, 1);
        res.status(200).json({ students });
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

app.listen(3000, () => {
    console.log(`Server is running at 3000`);
});