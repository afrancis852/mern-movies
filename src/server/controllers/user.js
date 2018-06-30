'use strict';

const bcrypt = require('bcrypt');

const User = require('../models/user');

function signUp(req, res) {
    let user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password,
        role: 'user'
    });    

    user.save()
        .then(userStored => {
            res.status(200).send({ userStored });
        }, function(err){
            if(err) return res.status(500).send({ message: err });
        });
};

function signIn(req, res) {
    User.findOne({email: req.body.email})
        .select('password')
        .exec(function(err, user) {
            if(err)     return res.status(500).send({ message: err });
            if(!user)   return res.status(404).send({ message: 'No existe el usuario' });

            user.comparePassword(req.body.password, function(err, isMatch) {
                if(err) return res.status(500).send({ message: err });
                if(isMatch) {
                    res.status(200).send({ message: 'Te has logueado correctamente' });
                }
                else {
                    return res.status(500).send({ message: 'Error en la contraseña' });
                }
            });
        });
};

function removeUser(req, res) {
    let userID = req.params.userID;

    User.findById(userID)
        .populate('list')
        .then(user => {
            user.list.forEach((userList) => userList.remove());            
            user.remove();
            res.status(200).send({ message: `El usuario ha sido borrado` });
        }, function(err) {
            if(err) return res.status(500).send({ message: err });
        });
};

function updateUser(req, res, next) {
    let userID = req.params.userID;

    User.findById(userID)
        .then(user => {
            user.displayName = req.body.displayName;
            user.avatar = req.body.avatar;
            user.password = req.body.password;
            
            user.save()
            .then(userStored => {
                res.status(200).send({ userStored });
            }, function(err){
                if(err) return res.status(500).send({ message: err });
            });
        }, function(err){
            if(err) return res.status(500).send({ message: err });
        });
};

module.exports = {
    signUp,
    signIn,
    removeUser,
    updateUser
};