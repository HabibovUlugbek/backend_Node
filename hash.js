const bcrypt = require("bcrypt")

async function getSalts() {
    const salt = await bcrypt.genSalt()
    console.log(salt)

    const hashpsw = await bcrypt.hash("sasss", salt)
    console.log(hashpsw)
}

getSalts()