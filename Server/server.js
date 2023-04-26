const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors');
const router = express.Router();

// server setup
const app = express();
app.use(cors({ origin: '*' })); // enables cors for all routes
app.use(express.json());
app.use('/', router);

// start the server at port 3000
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});

var accounts = [
  {
    email: "admin@root.com",
    hash: "$2a$10$0HFBc9UvwquBN7jMRs6gGuD5dVFv7e3T3itG4pZ./I0l2vf7qIIYe"
  },
]

router.post('/register', async (req, res) => {
  res.json(false)
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const account = accounts.find(obj => obj.email === email);
    if(account){
      res.json("true");
    } else {
      res.json("false");
    }
});

// data
var patients = [
  {
    id: '0.4923673746651953',
    firstname: 'test',
    lastname: 'subject',
    email: 'test@subject.com',
    password: 'strongpassw',
  },
];

// get all patients
app.get('/patients', (req, res) => {
  res.json(patients);
});

// get patient by index
router.get('/patients/:id', (req, res) => {
  var patient = patients.find((p) => p.id == req.params.id);
  res.json(patient);
});

// add new patient
router.post('/patients', (req, res) => {
  var newPatient = req.body;
  patients.push(newPatient);
  res.send(patients);

});

// delete by id
router.delete('/patients/:id', (req, res) => {
  var id = req.params.id;
  //console.log(id);
  patients = patients.filter(function (patient) {
    return patient.id !== id;
  });
  res.send(patients);
});

// update by id
router.put('/patients/:id', (req, res) => {
  const id = req.params.id;
  const patient = req.body;
  const index = patients.findIndex(p => p.id === id);

  if (index !== -1) {
    // Replace the patient object at the found index with the updated patient data
    patients[index] = patient;
    res.send(patients);
  } else {
    res.status(404).send(`Patient with ID ${id} not found.`);
  }
});