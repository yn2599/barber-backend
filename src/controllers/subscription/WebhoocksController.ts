import { Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '../../utils/stripe';

import { saveSubscription } from '../../utils/mansageSubcription'

class WebhoocksController {
    async handle(request: Request, response: Response){
      let event: Stripe.Event = request.body;

      const signature = request.headers['stripe-signature']
      let endpoinSecret ='whsec_7e6dab2a72670178cd61bc5d6d49c938797f98685580ec10c9f9314499071e48';

       
        try{

            event = stripe.webhooks.constructEvent(
                request.body,
                signature,
                endpoinSecret
            )

        }catch(err){
            return response.sendStatus(400).send(`webook: ${err.message}`)
        }
      

      switch(event.type){
        case 'customer.subscription.deleted':
            //Caso ele cansele sua assinatura vamos deletar a assinatura dele
            const payment = event.data.object as Stripe.Subscription;

            await saveSubscription(
                payment.id,
                payment.customer.toString(),
                false,
                true
            )

            break;
        case 'customer.subscription.updated':
            // Caso tenha alguma atualização na assinatura
            const paymentIntent = event.data.object as Stripe.Subscription;

            await saveSubscription(
                paymentIntent.id,
                paymentIntent.customer.toString(),
                false
            )

            break;
        case 'checkout.session.completed':
            // Criar a assinaturar pq foi paga com sucesso! 
            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            await saveSubscription(
                checkoutSession.subscription.toString(),
                checkoutSession.customer.toString(),
                true,
            )
            
            break;
        default:
            console.log(`Evento desconhecido ${event.type}`)           
      }

      response.send();

    }
}

export { WebhoocksController }