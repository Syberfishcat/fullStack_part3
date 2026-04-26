const mongoose = require('mongoose')

const argCount = process.argv.length

if(argCount < 3) {
    console.log('give password as argument')
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.zsbfrws.mongodb.net/PhoneBookApp_Part3_DB?retryWrites=true&w=majority&appName=PhoneBookApp_Part3`

mongoose.set('strictQuery', false)

mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if(argCount === 3){// show Phonebook list
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
            console.log(person.name, person.number)            
        })
        mongoose.connection.close()
    })
}else if(argCount === 5){//add new item
    const argName = process.argv[3]
    const argNumber = process.argv[4]
    const person = new Person({
        name: argName,
        number: argNumber
    })

    person.save().then(result => {
        console.log(`added ${argName} ${argNumber} to phonebook`)
        mongoose.connection.close()
    })
}



