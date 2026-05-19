export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string, //ID
        public readonly category: string, //ID
    ){}

    static create(object: { [key: string]: any }): [(string | undefined)?, (CreateProductDto | undefined)?] {
        const {name, available, price, description, user, category} = object

        if(!name) return ['Missin name']
        if(!user) return ['Missin user']
        if(!category) return ['Missin category']

        return[undefined, new CreateProductDto(name, !!available, price, description, user, category)]

    }
}