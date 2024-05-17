const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const filePath = 'std.json';

app.get('/api/std', function (req, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(500).send(err);
            return;
        }
        res.status(200).json(JSON.parse(data));
    });
});

app.get("/api/std/:id", function (req, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(500).send(err);
            return;
        }
        let students = JSON.parse(data);
        let found = students.find((item) => {
            return item.id === (req.params.id);
        });
        if (found) {
            res.status(200).json(found);
        } else {
            res.sendStatus(404).send("No student found");
        }
    });
});

app.post('/api/std/:id', function (req, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(500).send(err);
            return;
        }
        let students = JSON.parse(data);
        let newItem = {
            id: req.params.id,
            name: req.body.name,
            branch: req.body.branch,
            cgpa: req.body.cgpa
        };
        students.push(newItem);
        fs.writeFile(filePath, JSON.stringify(students, null, 4), (err) => {
            if (err) {

                res.sendStatus(500);
                return;
            }
            res.status(201).json({ students });
        });
    });
});

app.put('/api/std/:id', function (req, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        let students = JSON.parse(data);
        let foundIndex = students.findIndex((item) => {
            return item.id === (req.params.id);
        });
        console.log(foundIndex)
        if (foundIndex !== -1) {
            students[foundIndex] = {
                id: (req.params.id),
                name: req.body.name,
                branch: req.body.branch,
                cgpa: req.body.cgpa
            };
            fs.writeFile(filePath, JSON.stringify(students, null, 4), (err) => {
                if (err) {
                    res.sendStatus(500).send(err);
                    return;
                }
                res.status(201).json({ students });
            });
        } else {
            res.status(404).json({
                'message': 'No student found with that ID'
            });
        }
    });
});

app.delete('/api/std/:id', function (req, res) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        let students = JSON.parse(data);
        let targetIndex = students.findIndex((item) => {
            return item.id === (req.params.id);
        });
        if (targetIndex !== -1) {
            students.splice(targetIndex, 1);
            fs.writeFile(filePath, JSON.stringify(students, null, 4), (err) => {
                if (err) {
                    res.sendStatus(500).send(err);
                    return;
                }
                res.status(200).json({ students });
            });
        } else {
            res.sendStatus(404);
        }
    });
});

app.listen(3003, () => {
    console.log(`Server is running at 3003`);
});
