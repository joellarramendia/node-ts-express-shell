import { envs } from "../../config/envs.js"
import { CategoryModel } from "../mongo/models/category.model.js"
import { ProductModel } from "../mongo/models/product.model.js"
import { UserModel } from "../mongo/models/user.model.js"
import { MongoDatabase } from "../mongo/mongo-database.js"
import { seedData } from "./data.js"

(async () => {
    MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })
    await main()

    await MongoDatabase.disconnect()
})()

const randomBetween0AndX = (x: number) => {
    return Math.floor(Math.random() * x)
}

async function main() {
    // 1. Borrar todo
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany()
    ])

    // 2. Crear usuarios
    const users = await UserModel.insertMany(seedData.users)

    // 3. Crear categorias
    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category => {
            return {
                ...category,
                user: users[0]._id
            }
        })
    )

    // 4. Crear productos
    const products = await ProductModel.insertMany(
        seedData.products.map(product => {
            return {
                ...product,
                user: users[randomBetween0AndX(seedData.users.length - 1)]._id,
                category: categories[randomBetween0AndX(seedData.categories.length -1 )]._id
            }
        })
    )

    console.log('seeded')
}