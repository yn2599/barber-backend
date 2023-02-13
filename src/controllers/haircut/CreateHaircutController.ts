import { Request, Response } from 'express';
import { CreateHaircutService } from '../../services/User/haircut/CreateHaircutService';

class CreateHaircutController{
    async handle(request: Request, response: Response){
        const { name, price } = request.body
        const user_id = request.user_id

        const createHaircut = new CreateHaircutService();

        const haircut = await createHaircut.execute({
            user_id,
            name,
            price,
        })

        return response.json(haircut)
    }
}

export { CreateHaircutController }