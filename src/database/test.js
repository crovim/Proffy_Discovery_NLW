
const database = require('./db')
// chamando o módulo de db.js
const createProffy = require('./createProffy')

// database vai esperar o THEN e aí vai rodar a função enviando db para THEN
database.then(async (db) => {
    // inserir dados

    proffyValue = {
        name: 'Clóvis Júnior',
        avatar: 'https://avatars3.githubusercontent.com/u/38091359?s=460&u=baf8da64515d13a291f058bd5a25483b40bd5ab2&v=4',
        whatsapp: '37991064196',
        bio: 'Desenvolvendo toda essa aplicação com a galera da Rockseat!'
    }

    classValue = {
        subject: 1,
        cost: '180'
        // o proffy id virá pelo banco de dados
    }

    classScheduleValues = [
        // class id virá pelo banco de dados após cadastramos a aula
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]
    // preparou as três listas

    //  vai aguardar criar o proffy enviando pra dentro do banco de dados as listas
    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    // teste -> console.log(selectedProffys)

    // consultar as classes de um determinado professor e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // Selecione(SELECT) todos as informações de classes e de proffys (CLASSES.*, PROFFYS.*), 
    // de proffys (FROM PROFFYS), 
    // junte as duas (JOIN CLASSES ON (CLASSES.PROFFY_ID = PROFFYS.ID)),
    // onde classes.proffy_id = 1 (número do primeiro ID)
    // teste-> console.log(selectClassesAndProffys)
    
    // o horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa ser maior
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.* 
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)
    // Selecione tudo de class_schedule de class_schedule
    // onde class_schedule.class_id é 1 e class_schedule.weekday = 0

    console.log(selectClassesSchedules)
} )

// rodar o test -> node src/database/test.js