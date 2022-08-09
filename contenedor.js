const options = require("./options/db")
const knex = require("knex")(options)

const data = [
    {name: "Les Griffons De Pichon Baron 15", price: 1999, category: "Red Wine", url: "shorturl.at/cXZ68" },
    {name: "Casillero del Diablo Red Blend", price: 217, category: "Red Wine", url: "shorturl.at/mst12" },
    {name: "Louis Latour Ardeche ", price: 339, category: "White Wine", url: "shorturl.at/bdeq0" },
    {name: "Flor De Muga Rosado", price: 703, category: "Pink Wine", url: "shorturl.at/afQX1" },
    {name: "Louis Latour Pouilly Fuisse ", price: 1089, category: "White Wine", url: "shorturl.at/fnQU5" },
]

const tableName = "products";

knex.schema.createTable("products", table => {
    table.increments("id")
    table.string("name")
    table.integer("price")
    table.string("category")
    table.string("url")
})
    .then(() => console.log("Table created"))

    .then(async() => {
        try {
            console.log("Insert products")
            await knex(tableName).insert(data)

            console.log("Read all products...")
            let products = await knex.from(tableName).select("*")
            for (const product of products) {
                console.log(`${product.id}: ${product.name} [${product.price}] ${product.category}[${product.url}]`);
            }

            console.log("Insert one product")
            await knex(tableName).insert({name: "San Vicente", price: 1090, category: "Red Wine", url: "shorturl.at/mOS45"})

            console.log("Read all products...")
            products = await knex.from(tableName).select("*")
            for (const product of products) {
                console.log(`${product.id}: ${product.name} [${product.price}] ${product.category}[${product.url}]`);
            }

            console.log("Delete product")
            products = await knex.from(tableName)
                .where({id:2})
                .del()

            console.log("Read all products...")
            products = await knex.from(tableName).select("*")
            for (const product of products) {
                console.log(`${product.id}: ${product.name} [${product.price}] ${product.category}[${product.url}]`);
            }

            console.log("Update product");
            products = await knex.from(tableName)
                .where("name", "=", "Flor De Muga Rosado")
                .update({price: 600})
            
            console.log("Read all products...")
            products = await knex.from(tableName).select("*")
            for (const product of products) {
                console.log(`${product.id}: ${product.name} [${product.price}] ${product.category}[${product.url}]`);
            }
            
        } catch(e) {
            console.log(e);
        } finally {
            knex.destroy()
        }
    })
    
