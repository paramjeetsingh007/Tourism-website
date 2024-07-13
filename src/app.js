const express = require('express')
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require('./config')
const Activity = require('./activitydata')
const { log } = require('console')
const port = 5000

const app = express()

// convert data into json format
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// use ejs as the view engine
app.set('view engine', 'ejs')

// static file
app.use(express.static('public'))

app.use(express.static(path.join(__dirname, 'views')))
console.log(__dirname);
app.use('/photos', express.static(path.join(__dirname, 'photos')));


// routes
app.get('/', (req, res) => {
    res.render('login')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/activity', (req, res) => {
    res.render('activity')
})
app.get('/blog', (req, res) => {
    res.render('blog')
})
app.get('/camping', (req, res) => {
    res.render('camping')
})
app.get('/dehradun', (req, res) => {
    res.render('dehradun')
})
app.get('/gliding', (req, res) => {
    res.render('gliding')
})
app.get('/jumping', (req, res) => {
    res.render('jumping')
})
app.get('/mussoorie', (req, res) => {
    res.render('mussoorie')
})
app.get('/nainital', (req, res) => {
    res.render('nainital')
})
app.get('/rafting', (req, res) => {
    res.render('rafting')
})
app.get('/riding', (req, res) => {
    res.render('riding')
})
app.get('/rishikesh', (req, res) => {
    res.render('rishikesh')
})
app.get('/Safar', (req, res) => {
    res.render('Safar')
})
app.get('/tourist', (req, res) => {
    res.render('tourist')
})
app.get('/trekking', (req, res) => {
    res.render('blog')
})





// Register user
app.post('/signup', async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone
    }
    const existUser = await collection.findOne({ email: data.email })
    if (existUser) {
        res.send('user exist')
    } else {
        // // hash the password
        const saltRounds = 10; //number of salt round for bcrypt

        const hashPassword = await bcrypt.hash(data.password, saltRounds)
        data.password = hashPassword; //replace the password with hash password

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render('login')
    }



})

// check if user already exists in the data base

// login user
app.post('/login', async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password,

    }

    try {
        const check = await collection.findOne({
            email: req.body.email

        })


        if (!check) {
            console.log(check);
            return res.send('user name cannot found')
        }
        // compare the hash password the database 
        const isPasswordMatch = await bcrypt.compare(
            req.body.password, check.password)


        if (isPasswordMatch) {
            return res.render("Safar")
        } else {
            return res.send('wrong password')
        }
    } catch (error) {
        return res.send("wrong details")
        console.log(error);

    }

})

// activity data
app.post('/activityform', async (req, res) => {
    const activityData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    };
    console.log(activityData);
    try {
        const newActivity = new Activity(activityData);
        await newActivity.save();
        res.render('activity', { message: 'Activity created successfully' });
    } catch (error) {
        console.error('Error creating activity:', error);
        res.render('activity', { message: 'Failed to create activity' });
    }
});


app.listen(port, () => {
    console.log(`server running on port ${port} `);
})




