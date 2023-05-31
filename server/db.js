const mongoose = require(`mongoose`)


mongoose.set(`strictQuery` , true)
const DB_URL = `mongodb+srv://NourSoliman:tiamoodio1@cluster0.dttjt9f.mongodb.net/test`
mongoose.connect(DB_URL , {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log(`db connected`)).catch((error)=>console.log(error))