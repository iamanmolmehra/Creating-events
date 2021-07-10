const bcrypt = require('bcrypt')
const { signup, events } = require('../dbModels/dbSchema')
const jwt = require('jsonwebtoken')

exports.signup = (req, res) => {
    res.render('signup')
}

exports.signup_post = async (req, res) => {
    const pass = await bcrypt.hash(req.body.password, 10)
    const user = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        password: pass
    }
    const data = async () => {
        try {
            const d = await signup.insertMany(user)
            console.log(d)
            res.send('You SuceessFully Login')
        }
        catch (err) {
            res.send('Email Already Exist')

        }
    }
    data()
}

exports.login = (req, res) => {
    res.render('login')
}

exports.login_post = async (req, res) => {
    const user = await signup.findOne({ email: req.body.email })
    console.log(user)
    if (user) {
        const b = await bcrypt.compare(req.body.password, user.password)
        console.log(b);
        if (b) {
            const token = jwt.sign({ email: user.email, name: user.name, role: user.role }, 'siddik')
            console.log(token)
            res.cookie('token', token)
            res.redirect('/dashboard')
        } else {
            res.send('Password is wrong')
        }
    } else {
        res.send('User Not Found Please SignUp')
    }
}

exports.dashboard = (req, res) => {
    try {
        const token = req.headers.cookie.split('=')[1]
        console.log(token)
        if (token == null) { res.send('Unauthorized, token is invalid') }
        jwt.verify(token, 'siddik', (err, user) => {
            if (err) { res.send('Unauthorized please login again') };
            res.render('dashboard')
        });
    } catch (err) {
        res.send('Unauthorized please login again')
    }

}

exports.create = (req, res) => {
    try {
        const token = req.headers.cookie.split('=')[1]
        console.log(token)
        if (token == null) { res.send('Unauthorized, token is invalid') }
        jwt.verify(token, 'siddik', (err, user) => {
            if (err) { res.send('Unauthorized please login again') };
            res.render('create_events')
        });
    } catch (err) {
        res.send('Unauthorized please login again')
    }

}

exports.update = (req, res) => {
    try {
        const token = req.headers.cookie.split('=')[1]
        console.log(token)
        if (token == null) { res.send('Unauthorized, token is invalid') }
        jwt.verify(token, 'siddik', (err, user) => {
            if (err) { res.send('Unauthorized please login again') };
            res.render('update_events')
        });
    } catch (err) {
        res.send('Unauthorized please login again')

    }

}
exports.delete_ = (req, res) => {
    try {
        const token = req.headers.cookie.split('=')[1]
        console.log(token)
        if (token == null) { res.send('Unauthorized, token is invalid') }
        jwt.verify(token, 'siddik', (err, user) => {
            if (err) { res.send('Unauthorized please login again') };
            res.render('delete_events')
        });
    } catch (err) {
        res.send('Unauthorized please login again')

    }
}

exports.show = async (req, res) => {
    try {
        const token = req.headers.cookie.split('=')[1]
        console.log(token)
        if (token == null) { res.send('Unauthorized, token is invalid') }
        jwt.verify(token, 'siddik', (err, user) => {
            if (err) { res.send('Unauthorized please login again') };
            if (user.role == 'Admin' || user.role == 'admin') {
                console.log('if')
                const fun = async () => {
                    const sh = await events.find()
                    console.log(sh)
                    res.render('show_events_all', { sh: sh })
                }
                fun()
            } else {
                console.log('else')
                const fun = async () => {
                    const sh = await events.findOne({unique:user.unique_})
                    console.log(sh)
                    res.render('show_user', { item: sh })
                }
                fun()
            }

        });
    } catch (err) {
        res.send('Unauthorized please login again')

    }

}


exports.create_posts = async (req, res) => {
    try {
        const ev = {
            event_name: req.body.event_name,
            description: req.body.description,
            email:req.body.email,
            start_date: req.body.start,
            end_date: req.body.end,
            city: req.body.city
        }
        const data = await events.insertMany(ev)
        console.log(data)
        res.send('Added SuccessFully')
    }
    catch (err) {
        res.send('Unauthorized please login again')

    }
}
exports.update_posts = async (req, res) => {
    const data2 = await events.updateMany({ event_name: req.body.event_name }, { $set: { description: req.body.description, start_date: req.body.start, end_date: req.body.end, city: req.body.city } })
    console.log(data2)
    res.send('Updated SuccessFully')
}
exports.delete_posts = async (req, res) => {
    const del = await events.deleteOne({ event_name: req.body.event_name })
    console.log(del)
    res.send('deleted SuccessFully')
}
exports.logout = (req, res) => {
    res.clearCookie('token').redirect('/login')
}