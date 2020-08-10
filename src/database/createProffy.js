// Aqui ele vai receber o db e cada um dos valores passados
module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {
    // inserir dados na tabela de teachers, await -> esperar a linha terminar para continuar (é necessário colocar o async antes de function)
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)
// VALUES representa as "variáveis" de cada objeto

    // assim que terminar de inserir, vai  colocar o id nessa variável
    const proffy_id = insertedProffy.lastID

    // inserir dados na tabela classes
    const insertedClass = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)

    // assim que terminar de inserir, vai  colocar o id nessa variável
    const class_id = insertedClass.lastID

    // inserir dados na tabelaclass_schedule, é feito diferente por conter diversos dias
    // for each -> iteração sem retorno, map retorna com um novo array
    
    // aqui os dados são organizados em um array
    const insertedAllClassScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    // aqui será executado todos os db.run() das class_schedules, Promise.all() -> vai pegar cada repetição do insertedAllClassScheduleValues
    
    // daí você executa para todos aguardando um por um
    await Promise.all(insertedAllClassScheduleValues) 
}