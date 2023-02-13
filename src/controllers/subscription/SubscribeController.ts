import { Request, Response } from 'express';
import { SubscriptionService } from '../../services/User/subscriptions/SubscriptionService';

class SubscribeController{
    async handle(request: Request, response: Response){
        const user_id = request.user_id

        const subscriptionService = new SubscriptionService()

        const subscribe = await subscriptionService.execute({
            user_id
        })

        return response.json(subscribe);
    }
}

export { SubscribeController }