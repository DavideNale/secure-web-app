const express = require('express');
const cors = require('cors');
const router = express.Router();
const PocketBase = require('pocketbase/cjs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const authenticator = require('authenticator');
const QRCode = require('qrcode');

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
    console.log('Server listening on port ' + PORT);
});

// pocketebase init
const pb = new PocketBase('http://127.0.0.1:8090');
const JWT_SECRET = 'shh non la diciamo a nessuno';

// multer setup
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        cb(null, Date.now() + ext)
    }
});
const upload = multer({
    storage: storage
});


//----------------------
// SESSION MANAGEMENT
//----------------------

// register new user
router.post('/register', async (req, res) => {
    try {
        var patient = req.body;
        console.log(patient);
        try {
            const doctors = await pb.collection('doctors').getList(1, 50, { filter: `email="${patient.email}"` })
            const users = await pb.collection('patients').getList(1, 50, { filter: `email="${patient.email}"` });

            if (users.totalItems < 1 && doctors.totalItems < 1) {
                // generate OTP
                var secret = authenticator.generateKey();
                patient.secret = secret;
                var qr = authenticator.generateTotpUri(secret, patient.email, "SDH", 'SHA1', 6, 30);
                QRCode.toDataURL(qr, function (err, url) {
                    qr = url;
                })
                // save patient
                await pb.collection('patients').create(patient);
                return res.status(201).json(qr)
            } else {
                return res.status(400).json('email accosicated with an existing account')
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json("unable to register user")
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json("internal server error")
    }
});

// token validation: check if session token is still valid
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    //console.log(token);
    if (!token) {
        req.user = null;
        next();
    } else {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = decoded;
            next();
        } catch (e) {
            if (e.name === 'JsonWebTokenError') {
                return res.status(401).json({ is_session_valid: false });
            } else if (e.name = 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired.' });
            } else {
                return res.status(500).json({ message: 'Something went wrong.' });
            }
        }
    }
    return;
};

// login existing user
router.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        try { // doctor
            var record = await pb.collection('doctors').getFirstListItem(`email="${email}"`)
            if (record) {
                const hash = record.hash
                ID = record.id
                const isPasswordValid = await bcrypt.compare(password, hash)
                if (isPasswordValid) {
                    const token = await jwt.sign({ id: ID, role: 'doctor' }, JWT_SECRET, { expiresIn: '1h' })
                    return res.status(200).json({
                        token: token,
                        role: 'doctor'
                    });
                }
            }
        } catch (e) { }

        try { // patient
            var record = await pb.collection('patients').getFirstListItem(`email="${email}"`)
            if (record) {
                const hash = record.hash
                ID = record.id
                const isPasswordValid = await bcrypt.compare(password, hash)
                if (isPasswordValid) {
                    return res.status(200);
                }
            }
        } catch (e) { }

        return res.status(204).json('no account assocaited with this email')

    } catch (ext) {
        console.log("Server Error")
        return res.status(500).json('Server Error')
    }
});

router.post('/otp', async (req, res) => {
    try {
        const {
            email,
            password,
            otp
        } = req.body;

        try { // patient
            var record = await pb.collection('patients').getFirstListItem(`email="${email}"`)
            if (record) {
                const hash = record.hash
                ID = record.id
                const isPasswordValid = await bcrypt.compare(password, hash)
                if (isPasswordValid) {
                    console.log(record.secret)
                    console.log(otp)
                    var delta = authenticator.verifyToken(record.secret, otp);
                    console.log('delta ' + delta)
                    if (delta === null) {
                        console.log('fallito')
                        return res.status(303);
                    }
                    console.log('arrivo')
                    const token = await jwt.sign({ id: ID, role: 'patient' }, JWT_SECRET, { expiresIn: '1h' })
                    return res.status(200).json({
                        token: token,
                        role: 'patient'
                    });
                }
            }
        } catch (e) {
            console.log(e)
        }

        return res.status(204).json('no account assocaited with this ema')

    } catch (ext) {
        console.log("Server Error")
        return res.status(500).json('Server Error')
    }
});

//----------------------
// CRUD
//----------------------

// get all patients
app.get('/patients', authMiddleware, async (req, res) => {
    const records = await pb.collection('patients').getFullList({ sort: '-created', });
    res.json(records);
});

// get personal information, based on auth token
router.get('/personal', authMiddleware, async (req, res) => {
    try {
        const id = req.user.id
        const role = req.user.role

        let record;
        try {
            record = await pb.collection('patients').getOne(req.user.id);
        } finally {
            if (record) {
                console.log(record)
                const { email, first_name, last_name } = record;
                const image = record.collectionId + '/' + record.id + '/' + record.image;
                const newRecord = { email, first_name, last_name, image };
                return res.status(200).json(newRecord)
            } else {
                return res.status(403)
            }
        }
    } catch (e) {
        console.log('Error in /patients(get) :')
        console.log(e)
        return res.status(500)
    }
})

router.put('/personal', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const id = req.user.id
        const role = req.user.role

        const file = req.file

        // Read the file as a buffer
        const fileBuffer = await fs.readFileSync(file.path);

        // Create a Blob from the buffer
        const fileBlob = new Blob([fileBuffer]);
        const formData = new FormData()
        formData.append('image', fileBlob)

        await pb.collection('patients').update(id, formData)
        return res.status(201).json('image uploaded correctly')

    } catch (e) {
        console.log('Error in /patient(put) :')
        console.log(e)
        return res.status(500)
    }
})

// get patient by index
router.get('/patients/:id', authMiddleware, (req, res) => {
    var patient = patients.find((p) => p.id == req.params.id);
    res.json(patient);
});

// add new patient
router.post('/patients', authMiddleware, async (req, res) => {
    data = {

        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email.toLowerCase(),
    }
    try {
        const pats = await pb.collection('patients').getList(1, 50, { filter: `email="${data.email}"`, });
        if (pats.totalItems < 1) {
            const record = await pb.collection('patients').create(data);
            patients = await pb.collection('patients').getFullList({ sort: '-created' })
            return res.status(201).json(patients)
        } else {
            return res.status(500).json("Error : patient with this email already present")
        }
    } catch (error) {
        return res.status(500).json('Error : unable to register patient')
    }
});

// delete by id
router.delete('/patients/:id', authMiddleware, async (req, res) => {
    var id = req.params.id;
    try {
        await pb.collection('patients').delete(id);
    } catch (e) {
        console.log(e)
    }
    patients = await pb.collection('patients').getFullList({ sort: '-created' });
    res.send(patients);
});

// update by id
router.put('/patients/:id', authMiddleware, async (req, res) => {
    data = {
        id: req.body.id,
        first_name: req.body.firstname,
        last_name: req.body.lastname,
        email: req.body.email.toLowerCase(),
    }
    try {
        await pb.collection('patients').update(data.id, data);
        patients = await pb.collection('patients').getFullList({ sort: '-created' })
        return res.status(201).json(patients)
    } catch (e) {
        return res.status(404).json("unable to update patient");
    }
});