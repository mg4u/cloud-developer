import { Router, Request, Response } from 'express';
import { UserRouter } from './users/routes/user.router';
import {Sequelize} from 'sequelize-typescript';
import { config } from '../../config/config';
import { User } from './users/models/User';


const c = config.dev;

const router: Router = Router();

router.use('/users', UserRouter);

router.get('/', async (req: Request, res: Response) => {    
    const sequelize = new Sequelize({
        "username": c.username,
        "password": c.password,
        "database": c.database,
        "host":     c.host,
      
        dialect: c.dialect,
        storage: ':memory:',
        
    });
    console.log(sequelize);
    console.clear();
    sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    res.send('v0 users');
});


router.get('/:id', async (req: Request, res: Response) => {
    let { id } = req.params;
    const item = await User.findAll();
    res.send(item);
});

export const IndexRouter: Router = router;