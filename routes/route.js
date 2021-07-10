const express = require('express')
const route = express.Router()
const {signup,signup_post,login,login_post,dashboard,create,logout,delete_,show,update,create_posts,delete_posts,update_posts}=require('../controller/user')

route.get('/',signup)
route.post('/',signup_post)
route.get('/login',login)
route.post('/login',login_post)
route.get('/dashboard',dashboard)
route.get('/create_events',create)
route.post('/create_events',create_posts)
route.get('/update_events',update)
route.post('/update_events',update_posts)
route.get('/delete_events',delete_)
route.post('/delete_events',delete_posts)
route.get('/show_events',show)
route.get('/logout',logout)





module.exports = route