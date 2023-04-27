/// <reference types = "cypress"/>
import 'cypress-plugin-api'
//import apis from '../fixtures/CepRJ.json'
import apis from '../fixtures/urlAPI.json'
import * as cepValido from '../support/escolherCEP'
import * as getDadosCEP from '../support/dadosCEP'
import * as rioJaneiro from '../fixtures/CepRJ.json'
import * as saoPaulo from '../fixtures/CepSP.json'



//const API_URL = Cypress.env('API_BASE_URL')

describe('Realizar teste de consulta por CEP', () =>{

    it('Deve realizar consulta de CEPs do Rio de Janeiro e comparar valor', () =>{


        let cep = cepValido.arrayCEPRioJaneiro() // vai escolher o CEP que vai usar
        let dadosCEP = getDadosCEP.dadosCEP(rioJaneiro, cep) //deve pegar a massa de dados
        cy.log(JSON.stringify(dadosCEP))
        cy.log(cep)
        cy.GETApi('', apis.apiBuscarCEP+'cep',cep).then((response) =>{
            expect(response.status).eq(200)
            expect(response.body.address).eq(dadosCEP.address)
            expect(response.body.number).eq(dadosCEP.number)
            expect(response.body.city).eq(dadosCEP.city)
            expect(response.body.longitude).eq(dadosCEP.longitude)
            expect(response.body.state).eq(dadosCEP.state)
            expect(response.body.id).eq(dadosCEP.id)
            expect(response.body.latitude).eq(dadosCEP.latitude)
            expect(response.body.neighborhood).eq(dadosCEP.neighborhood)
            expect(response.body.blockDelivery).eq(dadosCEP.blockDelivery)

        })

    })

    it('Deve realizar consulta de CEPs do São Paulo e comparar valor', () =>{


        let cep = cepValido.arrayCEPSaoPaulo() // vai escolher o CEP que vai usar
        let dadosCEP = getDadosCEP.dadosCEP(saoPaulo, cep) //deve pegar a massa de dados
        cy.log(JSON.stringify(dadosCEP))
        cy.log(cep)
        cy.log(JSON.stringify(dadosCEP))
        cy.GETApi('', apis.apiBuscarCEP+'cep',cep).then((response) =>{
            expect(response.status).eq(200)
            expect(response.body.address).eq(dadosCEP.address)
            expect(response.body.number).eq(dadosCEP.number)
            expect(response.body.city).eq(dadosCEP.city)
            expect(response.body.longitude).eq(dadosCEP.longitude)
            expect(response.body.state).eq(dadosCEP.state)
            expect(response.body.id).eq(dadosCEP.id)
            expect(response.body.latitude).eq(dadosCEP.latitude)
            expect(response.body.neighborhood).eq(dadosCEP.neighborhood)
            expect(response.body.blockDelivery).eq(dadosCEP.blockDelivery)

        })

    })

    it('Não deve realizar consulta de CEP com formato inválido', () => {
        cy.GETApi('', apis.apiBuscarCEP+'cep','20261-241').then((response) =>{
            expect(response.status).eq(400)

            let valorInvalido = response.body.additionalInfo[0]
            
            expect(response.body.httpStatusCode).eq(400)
            expect(response.body.errorCode).eq('400')
            expect(response.body.message).eq('Requisição mal formatada')
            expect(response.body.info).eq('http://api.b2winc.com/doc/error/400')
            expect(valorInvalido.key).eq('cause')
            expect(valorInvalido.value).eq('CEP inválido: 20261-241')
        })
    })

    it('Não deve realizar consulta de CEP de CEP Inválido', () => {
        cy.GETApi('', apis.apiBuscarCEP+'cep','00000000').then((response) =>{
            expect(response.status).eq(404)

            let cepNaoEncontrado = response.body.additionalInfo[0]
            
            expect(response.body.httpStatusCode).eq(404)
            expect(response.body.errorCode).eq('404')
            expect(response.body.message).eq('Recurso não encontrado')
            expect(response.body.info).eq('http://api.b2winc.com/doc/error/404')
            expect(cepNaoEncontrado.key).eq('cause')
            expect(cepNaoEncontrado.value).eq('CEP não encontrado')
        })
    })
    it('Não deve realizar consulta se CEP válido não for informado', () => {
        cy.GETApi('', apis.apiBuscarCEP+'cep','').then((response) =>{
            expect(response.status).eq(400)

            let cepNaoInformado = response.body.additionalInfo[0]
            
            expect(response.body.httpStatusCode).eq(400)
            expect(response.body.errorCode).eq('400')
            expect(response.body.message).eq('Parâmetro CEP obrigatório')
            expect(response.body.info).eq('http://api.b2winc.com/doc/error/400')
            expect(cepNaoInformado.key).eq('cause')
            expect(cepNaoInformado.value).eq('')
        })
    })

})