const {User}  = require("../../../models/user")
const jwt = require("jsonwebtoken")
const config = require("config")

describe('user.genereteAuthToken,' , () => {
    it("sholud return is a valid jwt" , () => {
        const user = new User ({isAdmin:true})

        const token = user.genereteAuthToken()
        const decodeObject = jwt.verify(token , config.get("jwtPrivateKey"))

        expect(decodeObject).toMatchObject({isAdmin:true})
    })
})