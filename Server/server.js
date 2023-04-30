const express = require('express');
const cors = require('cors');
const router = express.Router();
const PocketBase = require('pocketbase/cjs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// init server with express and cors
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/', router);

// start the server at port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server listening on port '+PORT);
});

// pocketebase init
const pb = new PocketBase('http://127.0.0.1:8090');

// register new user
router.post('/register', async (req, res) => {
    const { email, hash } = req.body;
    try {
        const user = await pb.collection('users').getList(1, 50,{filter: `email="${email}"`,});
        if(user.totalItems<1){
            const new_user = await pb.collection('users').create({
                email: email,
                hash: hash
            });
            res.status(201).json(new_user);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Unable to register user' });
    }
});

// token validation: check if session token is still valid
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    try{
    if (!token) {
        req.has_token = false;
        req.token_status = false;
        next();
    }else{
        req.has_token = true;
        req.token_res = jwt.verify(token, 'shh');
        req.token_status = true;
        next();
    }
    }catch(e){
        req.has_token = true;
        req.token_status = false;
        next();
    }
};

// login existing user
router.post('/login', authMiddleware,  async (req, res) => {
    console.log(req.has_token)
    console.log(req.token_status)
    const { email, password } = req.body;
    if(req.has_token && req.token_status){
        res.status(200).json("Session already active");
    }else{
    try{
        const record = await pb.collection('users').getFirstListItem( `email="${email}"`);
        hash = record.hash;
        ID = record.collectionId;
        if(bcrypt.compare(password, hash)){
            const token = jwt.sign({ userID: ID }, 'shh', {expiresIn: '1h'});
            console.log(token);
            res.status(200).json(token);
        }else{
            res.status("204").json("Incorrect password");
        }
    }catch(error){
        console.log(error);
        res.status(500).json("No account associated with this email");
    }
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
app.get('/patients', authMiddleware, (req, res) => {
    res.json(patients);
});

// get patient by index
router.get('/patients/:id', authMiddleware, (req, res) => {
    var patient = patients.find((p) => p.id == req.params.id);
    res.json(patient);
});

// add new patient
router.post('/patients', authMiddleware, (req, res) => {
    var newPatient = req.body;
    patients.push(newPatient);
    res.send(patients);

});

// delete by id
router.delete('/patients/:id', authMiddleware, (req, res) => {
    var id = req.params.id;
    //console.log(id);
    patients = patients.filter(function(patient) {
        return patient.id !== id;
    });
    res.send(patients);
});

// update by id
router.put('/patients/:id', authMiddleware, (req, res) => {
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