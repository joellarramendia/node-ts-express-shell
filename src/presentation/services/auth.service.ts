import { UserModel } from "../../data/index.js";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain/index.js";

export class AuthService {
    // DI
    constructor() { }

    public async registerUser(registerUserDto: RegisterUserDto) {
        const existUser = await UserModel.findOne({ email: registerUserDto.email })
        if (existUser) throw CustomError.badRequest('Email already exist')

        try {
            const user = new UserModel(registerUserDto)
            await user.save()

            // Encriptar la contraseña

            // JWT para mantener la autenticacion del usuario

            // Email de confirmacion

            const {password, ...userEntity} = UserEntity.fromObject(user)

            return {user: userEntity, token: 'ABC'}
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

        return 'todo ok!'
    }
}