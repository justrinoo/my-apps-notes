const express = require('express');
const route = express.Router()
const Article = require('../models/articlepost')

// Find data atau  untuk menampilkan data
route.get('/', function (req, res) {
    Article.findAll(function (err, result) {
        console.log(result);
        if (err) console.log('error when fetching post', err);
        res.render('article', { posts: result });
    })
})

// Create data atau menambahkan data ke database 
route.get('/notepost', function (req, res) {
    res.render('create', { title: "this is create article post" })
})
route.post('/', function (req, res, next) {
    Article.store(req.body, function (err) {
        if (err) {
            console.log('Creating post', err);
        }
        res.redirect('/');
    });
});

// Edit data
route.get('/edit/:id', function (req, res) {
    Article.findOne(req.params.id, function (err, result) {
        res.render('edit', { title: 'this is edit page', post: result });
    })
});

route.post('/:id', function (req, res) {
    Article.update(req.params.id, req.body, function (err, result) {
        if (err) console.log('error ketika edit ', err);
        res.redirect('/');
    })
})

route.post('/destroy/:id', function (req, res) {
    Article.destroy(req.params.id, function (err, result) {
        console.log(result)
        if (err) console.log('error when deleting post', err);
        res.redirect('/')
    })
})


module.exports = route;
