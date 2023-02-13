import { Request, Response } from 'express'
import { AuthUserService } from '../../services/User/AuthUserService'

class AuthUserController{
    async handle(request: Request, response: Response){
        const { email, password } = request.body

        const authUserService = new AuthUserService();

        const session = await authUserService.excute({
            email,
            password
        })

        return response.json(session);
    }
}

export { AuthUserController }