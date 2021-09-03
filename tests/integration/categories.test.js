const  request = require("supertest");
let server;
const mongoose = require("mongoose")
const { Category } = require("../../models/category")
const {User} = require("../../models/user")

describe('/api/categories' ,()=> {
    beforeEach(() => {
        server = require("../../index")
    });
    afterEach(async () => {
        server.close()
        await Category.remove({}) 
    })
    describe("Get /" , ()=> {
       
        it("should return all categories" ,async () => {
            await Category.collection.insertMany([
                {name : 'dasturlash' }, {name: 'coding'}, {name:"rework"}
            ])
          const response = await request(server).get("/api/categories/")
          expect(response.status).toBe(200)
          expect(response.body.length).toBe(3)
          expect(response.body.some(cat => cat.name === 'dasturlash')).toBeTruthy()
        })
    })

    describe("GET /:id" , () => {
        it("should return category if id is valid " ,async () => {
            const category = new Category({name: "aurdino"})
            await category.save()
            const response = await request(server).get("/api/categories/" + category._id)
            expect(response.status).toBe(200)
            expect(response.body).toHaveProperty('name', 'aurdino')
        })

        it("should return 404 if id is not category this valid id" ,async () => {            
            const response = await request(server).get("/api/categories/aDAd")
            expect(response.status).toBe(404)
        })

        it("should return 404 if id is not valid " ,async () => {   
            const categoryId = mongoose.Types.ObjectId();          
            const response = await request(server).get("/api/categories/"+ categoryId)
            expect(response.status).toBe(404)
        })

       
    })

    describe("POST  /" , () => {
        let token;
        let name;

        const execute = async () => {
            return await request(server)
                .post("/api/categories")
                .set("x-auth-token", token)
                .send({name})
        }

        beforeEach(() => {
            token = new User().genereteAuthToken()
            name = 'Rework'
        })

        it("should return if not logged", async () => {
            token = ""
            const res = await execute()
            expect(res.status).toBe(401)
        })

        it("should return 400 if category name lesser than 3" , async () => {
            name ="12"
            const res = await execute()
            expect(res.status).toBe(400)
        })

        it("should return 400 if category name is more than 52" ,async () => {
            name =new Array(52).join("c")
            const res = await execute()
            expect(res.status).toBe(400)
        })

        it("should return 400 if category name lesser than 3" , async() => {
            name ="12"
            const res = await execute()
            expect(res.status).toBe(400)
        })

        it("should return the category if is valid" , async() => {
             await execute()
             const category = await Category.find({name :"Rework"})
            expect(category).not.toBeNull()
        })

        it("should return the category if is valid" , async() => {
           const res= await execute()
            expect(res.body).toHaveProperty("_id")
            expect(res.body).toHaveProperty("name", "Rework")
       })
    })

    // describe("Put /:id" , () => {
    //     it("should return category if id is valid " ,async () => {
    //         const category = new Category({name: "aurdino"})
    //         await category.save()
    //         const token = new User().genereteAuthToken()
    //        const response  = await request(server)
    //         .put("/api/categories"  + category._id)
    //         .set("x-auth-token", token)
    //         .send({name:"Data science"})
            
    //         expect(response.status).toBe(200)
    //         expect(response.body).toHaveProperty('name', 'Data science')
    //     })

    //     it("should return 404 if id is not valid " ,async () => {            
    //         const response = await request(server).get("/api/categories/aDAd")
            
    //         expect(response.status).toBe(404)
    //     })

       
    //})
} )