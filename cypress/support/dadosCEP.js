function dadosCEP (dadosCepMapeado,codigoPostal){
    return Object.values(dadosCepMapeado).find(cep => cep.number == codigoPostal)      
}

export {dadosCEP}

