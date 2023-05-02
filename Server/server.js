const express = require('express');
const cors = require('cors');
const router = express.Router();
const PocketBase = require('pocketbase/cjs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//----------------------
// SETUP
//----------------------

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

const JWT_SECRET = '';

//----------------------
// SESSION MANAGEMENT
//----------------------

// register new user
router.post('/register', async (req, res) => {
    const { email, hash } = req.body;
    
    try {
        const users = await pb.collection('users').getList(1, 50,{filter: `email="${email}"`,});
        
        if(users.totalItems<1){
            const new_user = await pb.collection('users').create({
                email: email,
                hash: hash
            });
            return res.status(201).json('New user registered successfully.');
        } else {
            return res.status(400).json('There is already a user associated with this email.')
        }
    } catch (error) {
       return res.status(500).json('Error : unable to register user.')
    }
});

// token validation: check if session token is still valid
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    if (!token){
        req.user = null;
        next();
    } else {
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch(e){
        if(e.name === 'JsonWebTokenError'){
            return res.status(401).json({is_session_valid : false});
        } else if (e.name = 'TokenExpiredError') {
            return res.status(401).json({message: 'Token expired.'});
        } else {
            return res.status(500).json({message: 'Something went wrong.'});
        }
    }
        }
    return;
};

// login existing user
router.post('/login', authMiddleware,  async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const record = await pb.collection('users').getFirstListItem( `email="${email}"`);

        if(!record){
            return res.status(401).json('No account associated with this email.');
        }
        
        hash = record.hash;
        ID = record.collectionId;
        const isPasswordValid = await bcrypt.compare(password, hash);

        if (isPasswordValid){
            const token = await jwt.sign({ userID: ID}, JWT_SECRET, {expiresIn : '1h'});
            return res.status(200).json(token);
        } else {
            return res.status(204).json('Incorrect password.');;
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Unable to log in.'})
    }
});

//----------------------
// CRUD
//----------------------

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