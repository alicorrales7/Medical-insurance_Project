import express, { Application, Request, Response} from 'express'
import UserController from '../controllers/userController';
import Container from 'typedi'

export const userRoute = (app: Application):void => {
    app.use(express.json());

    const userController = Container.get(UserController);

    app.get('/user', (req,res) => {
        const find = userController.getAllUsers(res)
        console.log(find)
    })

    app.get('/user/:id', (req,res) => {
        const findOne = userController.getUser( req,res)
    })
    
    app.post('/user', (req,res) => {
       const insert = userController.insertUsers(req,res)
    })

    app.put('/user/:id', (req,res) => {
        const update = userController.updateUser(req,res);
        console.log("Edit Successful")
    })

    app.delete('/user/:id', (req,res) => {
        const deleteUser = userController.deleteUser(req,res)
          console.log("Delete Successful")
        })
    
}