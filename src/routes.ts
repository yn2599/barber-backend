import express, { Router, Request, Response } from 'express';
import { CreateUserController } from './controllers/User/CreateUserController';
import { AuthUserController } from './controllers/User/AuthUserController';
import { DetailUserController } from './controllers/User/DetailUserController';
import { UpdateUserController } from './controllers/User/UpdateUserController';

import { CreateHaircutController } from './controllers/haircut/CreateHaircutController';
import { ListHaircutController } from './controllers/haircut/ListHaircutController';
import { UpdateHaircutController } from './controllers/haircut/UpdateHaircutController';
import { CheckSubscriptionController } from './controllers/haircut/CheckSubscriptionController';
import { CountHaircutController } from './controllers/haircut/CountHaircutController';
import { DetailHaircutController } from './controllers/haircut/DetailHaircutController';
import { NewScheduleController } from './controllers/schedule/NewScheduleController';
import { ListScheduleController } from './controllers/schedule/ListScheduleController';
import { FinishScheduleController } from './controllers/schedule/FinishScheduleController';

import { SubscribeController } from './controllers/subscription/SubscribeController';
import { WebhoocksController } from './controllers/subscription/WebhoocksController';
import { CreatePortalController } from './controllers/subscription/CreatePortalController';


import { isAuthenticated } from './middlewares/isAuthenticated';

const router = Router();

//router.get('/teste', (req: Request, res: Response) => {
 //   return res.json({ ok: true })
//})

// -- Rotas User--
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me',isAuthenticated, new DetailUserController().handle)
router.put('/users', isAuthenticated, new UpdateUserController().handle)

// -- ROTA HAIRCUTS --
router.post('/haircut', isAuthenticated, new CreateHaircutController().handle)
router.get('/haircuts', isAuthenticated, new ListHaircutController().handle)
router.put('/haircut', isAuthenticated, new UpdateHaircutController().handle)
router.get('/haircut/check', isAuthenticated, new CheckSubscriptionController().handle)
router.get('/haircut/count', isAuthenticated, new CountHaircutController().handle)
router.get('/haircut/detail', isAuthenticated, new DetailHaircutController().handle)

//-- ROTA SCHEDULE -- service
router.post('/schedule', isAuthenticated, new NewScheduleController().handle)
router.get('/schedule', isAuthenticated, new ListScheduleController().handle)
router.delete('/schedule', isAuthenticated, new FinishScheduleController().handle)

//-- ROTA PAGAMENTO
router.post('/subscribe', isAuthenticated, new SubscribeController().handle)
router.post('/webhooks', express.raw({type: 'application/json'}),new WebhoocksController().handle)
router.post('/create-portal', isAuthenticated, new CreatePortalController().handle)
// https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local   para abrir 24/01


export { router };