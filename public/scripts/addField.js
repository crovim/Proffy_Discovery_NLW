// Procurar o botão -> procura pelo ID
document.querySelector("#add-time")

// Quando clicar no botão
.addEventListener('click', cloneField)

// Executar uma ação
function cloneField() {
    // console.log abre a página lá (print)
    // duplicas os campos, que campos?
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)
    // cloneNode -> clona a estrutura selecionada (Node)
    // boolean: true ou false

    // pegar os campos, que campos?
    const fields = newFieldContainer.querySelectorAll('input')
    // pega dentro de newFieldContainer todoos (All) os inputs

    // para cada campo, limpar
    fields.forEach(function(field) {
      // pegar o field do momento e limpar
      field.value =""
    })

    // colocar na página: onde?
    document.querySelector('#schedule-items').appendChild(newFieldContainer)

}
