//Objetivo: Arquivo responsavel por guardar as funções

//import do arquivo "contatos.js" para receber todos os dados guardados no mesmo
//todos o endpoints o numero do clr deve ser usado com criterio de busca
//o numero do clr vai como via parametro e as outras variaveis via querry
const listaTodasInfo = require("./contatos")

//função responsavel por listar todos os dados do usúario independente do numero(lista todos os dados) <- não tem filtro
function listarDados() {

    //percorre o array para encontrar o atributo contatos
    const listaTudo = listaTodasInfo.contatos

    if (listaTudo == "" || listaTudo == undefined || listaTudo == null) {

        return false
    }

    return listaTudo

}

//função responsavel por listar dados da conta do perfil do usuário
//dados a serem exibidos: mome/nick, foto, numero, imagem, cor de
//fundo e dados da conta como criação e encerramento
function exibirDadosPerfil(numero) {

    //estrutura a ser exibida
    let resultado = {

        nome_conta: "",
        nick: "",
        data_criada:
        {
            inicio: "",
            fim: ""
        }
        ,
        foto_perfil: "",
        numero: "",
        papel_de_parede: "",

    }

    const numeroDono = numero //numero que será criterio do filtro
    const numeroPerfil = listaTodasInfo.contatos["whats-users"]
    let status = false

    numeroPerfil.forEach(function (numeroTodo) {

        //condicional que compara a igualdade entre o numeroDono e o numeroPerfil
        if (Number(numeroTodo.number) == Number(numeroDono)) {

            // Diferença entre as duas atribuições:
            //
            // 1) resultado.nick = numeroTodo.nickname
            // - Acessa uma propriedade simples (nível direto) do objeto.
            // - Usa notação com ponto (.) porque "nickname" não tem caracteres especiais.
            // - Retorna diretamente um valor como "Ricky".
            //
            // 2) resultado.data_criada.inicio = numeroTodo["created-since"].start
            // - Acessa uma propriedade com hífen ("created-since"), por isso usa colchetes [""].
            // - Essa propriedade é um objeto, então é necessário acessar o campo interno "start".
            // - Ou seja, envolve um acesso em dois níveis (objeto dentro de objeto).
            resultado.nome_conta = numeroTodo.account
            resultado.nick = numeroTodo.nickname
            resultado.data_criada.inicio = numeroTodo["created-since"].start
            resultado.data_criada.fim = numeroTodo["created-since"].end
            resultado.foto_perfil = numeroTodo["profile-image"]
            resultado.numero = numeroTodo.number
            resultado.papel_de_parede = numeroTodo.background

            status = true
        }
    })

    //condiconal que determina se o status for falso o verdadeiro
    //pois só poderá imprimir o resultado, se o status for true
    if (status) {
        return resultado
    } else {
        return false
    }

}


//função responsavel por listar dados de contato para cada usuário
//Retornar apenas os dados pessoais de cada contato do usuário, como nome, foto e descrição
function listarCadaContato(numero) {

    //array vazio que irá receber os dados requisitados
    let resultado = []

    const numeroDono = numero //Número "digitado" que será o critério de comparação para encontrar um igual dentro do JSON
    const numeroPerfil = listaTodasInfo.contatos["whats-users"] //"whats-users" -> propriedade do objeto que contém a lista de todos os contatos
    let status = false //Inicia como false e pode se tornar true dentro do bloco if, caso encontre um número correspondente

    // Usa o forEach para percorrer todos os contatos da lista "numeroPerfil".
    // A cada repetição, a variável "numeroContatos" representa um contato da lista.
    // Ou seja, o código vai analisar um por um para comparar com o numeroDono.
    numeroPerfil.forEach(function (numeroContatos) {

        // numeroContatos -> representa cada objeto de contato dentro da lista durante a iteração
        if (Number(numeroContatos.number) == Number(numeroDono)) {

            //sempre que precisar percorrer um array que está dento de outro array, serão necessario mais de 1 for each
            numeroContatos.contacts.forEach(function (adquirindoDados) {

                //variavel criada para guardar a lista das requisições dos dados dentro do json que está dentro do array
                let guardaDados = {

                    nome: adquirindoDados.name,
                    foto: adquirindoDados.image,
                    descricao: adquirindoDados.description

                }

                resultado.push(guardaDados) //faz um push do "guardaDados" para dentro do "resultado" que é um array vazio
                status = true   //só se torna true dentro do bloco do for each 
            })
        }
    })

    //condicional que só exibe o resultado caso o status seja true
    if (status) {
        return resultado
    } else {
        return false
    }

}

//função responsavel por listar todas as mensagens trocadas de uma conta de usuário
function listarTodasConversas(numero) {

    //json que guarda a estrutura para receber os dados
    let resultado = {

        remetente: "",
        conteudo: "",
        hora: "",
    }

    const numeroDono = numero //numero "digitado"
    const numeroPerfilDono = listaTodasInfo.contatos["whats-users"] //guarda todas as informações do json
    let status = false //atribui false para o status desde de o principío

    //for each que percorre numeroPerfilDono e compara a igualdade de cada elemento com o numero "digitado"
    numeroPerfilDono.forEach(function (numeroContatos) {

        //coondicional que compara a igualdade entre o elemento numeroContatos e numeroDono
        if (Number(numeroContatos.number) == Number(numeroDono)) {

            //for each pra percorrer os elementos dentro do array contacts
            numeroContatos.contacts.forEach(function (adquirindoMenssagens) {

                //for each para percorrer o aarray messages 
                adquirindoMenssagens.messages.forEach(function (filtrandoMenssagem) {

                    resultado.remetente = filtrandoMenssagem.sender
                    resultado.conteudo = filtrandoMenssagem.content
                    resultado.hora = filtrandoMenssagem.time

                    status = true

                })
            })
        }
    })

    if (status) {
        return resultado
    } else {
        return false
    }

}

//função responsavel por Listar uma conversa de um usuário e um contato
//Retornar dados como: nome, número de celular e as mensagens de conversas). 
//Deve obrigatoriamente encaminhar a referência para encontrar a conversa via Query e não via parâmetro
function listarConversaContato(numero, nome) {

    let resultado = {

        nome : "",
        numero : "",
        menssagens: [

            //array que irá guardar todas as mensagens com um contato especifico
        ]
    } 

    const numeroDono = numero
    const nomeDoContato = nome
    const numeroPerfilDono = listaTodasInfo.contatos["whats-users"]
    let status = false

    //percorre o numeroPerfilDono para encontrar um numero igual ao "numeroDono"
    numeroPerfilDono.forEach(function (numeroContatos) {

        if (Number(numeroContatos.number) == Number(numeroDono)) {

            //criar um for each para entrar no array de contacts
            numeroContatos.contacts.forEach(function (filtrandoContatos) {

                if (String(filtrandoContatos) == String(nomeDoContato)) {

                    
                    status = true

                }

            })
        }
    })

    if (status) {
        return resultado
    } else {
        return false
    }

}

//função responsavel por Realizar um filtro como “pesquisa de palavra chave” com
//base em uma palavra nas conversas do usuário e do respectivo contato
function buscaPorPalavraChave() {

}

console.log(listarConversaContato(11987876567, "Ana Maria")) //chama a função e exibe o conteudo dela