
let participantes = [
  {
    nome: "Mayk Brito",
    email: "maykbrito@gmail.com",
    dataInscricao: new Date(2024, 1, 02, 19, 23),
    dataCheckin: null
  },
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2024, 2, 01, 19, 23),
    dataCheckin: new Date(2024, 2, 01, 20, 20),
  },
  // Adicione mais participantes aqui
  {
    nome: "João da Silva",
    email: "joao.silva@example.com",
    dataInscricao: new Date(2024, 3, 10, 15, 30),
    dataCheckin: new Date(2024, 3, 12, 10, 45),
  },
  {
    nome: "Maria Souza",
    email: "maria.souza@example.com",
    dataInscricao: new Date(2024, 3, 15, 11, 20),
    dataCheckin: null
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos.oliveira@example.com",
    dataInscricao: new Date(2024, 3, 20, 17, 10),
    dataCheckin: new Date(2024, 3, 22, 18, 30),
  },
  {
    nome: "Ana Santos",
    email: "ana.santos@example.com",
    dataInscricao: new Date(2024, 4, 5, 9, 45),
    dataCheckin: new Date(2024, 4, 8, 12, 15),
  },
  {
    nome: "Pedro Lima",
    email: "pedro.lima@example.com",
    dataInscricao: new Date(2024, 4, 10, 14, 20),
    dataCheckin: null
  },
  {
    nome: "Mariana Costa",
    email: "mariana.costa@example.com",
    dataInscricao: new Date(2024, 4, 15, 18, 30),
    dataCheckin: null
  },
  {
    nome: "Rafaela Almeida",
    email: "rafaela.almeida@example.com",
    dataInscricao: new Date(2024, 4, 20, 10, 15),
    dataCheckin: new Date(2024, 4, 22, 11, 40),
  },
  {
    nome: "Lucas Silva",
    email: "lucas.silva@example.com",
    dataInscricao: new Date(2024, 4, 25, 13, 40),
    dataCheckin: new Date(2024, 4, 28, 16, 20),
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckin = dayjs(Date.now())
  .to(participante.dataCheckin)

  //condicional
  if(participante.dataCheckin == null) {
    dataCheckin = `
    <button
        data-email="${participante.email}"
        onclick="fazerCheckin(event)"
      >
        Confirmar check-in
        </button>
      `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckin}</td>
  </tr>
  `
}
  
const atualizarLista = (participantes) => {
  let output = " "
  // estrutura de repetição - loop
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  //substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output 
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckin: null
  }

  //verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
    
  )

  if(participanteExiste) {
    alert('Email já cadastrado')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckin = (event) => {
  // confirmar se realmente quer fazer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // Encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email
  )
  
  // Atualizar o check-in do participante
  participante.dataCheckin = new Date()
  // Atualizar a lista de participantes
  atualizarLista(participantes)
}