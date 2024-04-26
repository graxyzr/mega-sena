// Função para gerar as labels
function labelGenerator(quantity, start, preFor, className, where) {
    // Seleciona o elemento pai onde as labels serão inseridas
    const dad = document.querySelector(where);
    // Loop para criar as labels com base na quantidade especificada
    for (i = start; i < quantity + start; i++) {
        let label = document.createElement('label'); // Cria uma nova label
        // Adiciona classes e atributos à label
        label.classList.add('label');
        label.classList.add(className);
        label.setAttribute('for', preFor + i);
        label.innerText = i < 10 ? '0' + i : i; // Adiciona o texto da label (com formatação para números menores que 10)
        dad.appendChild(label); // Insere a label no elemento pai
    }
}

// Função para gerar os inputs (radio buttons ou checkboxes)
function inputGenerator(type, quantity, start, preId, name, where, func) {
    // Seleciona o elemento pai onde os inputs serão inseridos
    const dad = document.querySelector(where);
    // Loop para criar os inputs com base na quantidade especificada
    for (i = start; i < quantity + start; i++) {
        let input = document.createElement('input'); // Cria um novo input
        // Configura os atributos do input
        input.setAttribute('type', type);
        input.setAttribute('name', name);
        input.setAttribute('id', preId + i);
        input.setAttribute('value', i);
        input.classList.add('hidden');
        input.addEventListener('change', func); // Adiciona um listener de evento de mudança
        dad.appendChild(input); // Insere o input no elemento pai
    }
}

// Função para lidar com a mudança nos radio buttons
function changeRadio(e) {
    // Obtém o ID e o valor do radio button selecionado
    let radioId = e.target.id;
    let radioValue = parseInt(e.target.value);

    // Loop para alterar as classes das labels com base no radio selecionado
    for (let i = 0; i < todasLabels.length; i++) {
        todasLabels[i].classList.remove('label-active');
        if (todasLabels[i].getAttribute('for') == radioId) {
            todasLabels[i].classList.add('label-active');
        }
    }

    // Altera o texto do span de acordo com o valor do radio selecionado
    let spanValor = document.querySelector('#valor');
    switch (radioValue) {
        case 6:
            spanValor.innerText = 'R$ 4,50';
            break;
        case 7:
            spanValor.innerText = 'R$ 31,50';
            break;
        case 8:
            spanValor.innerText = 'R$ 126,00';
            break;
        case 9:
            spanValor.innerText = 'R$ 378,00';
            break;
        case 10:
            spanValor.innerText = 'R$ 945,00';
            break;
        case 11:
            spanValor.innerText = 'R$ 2.079,00';
            break;
        case 12:
            spanValor.innerText = 'R$ 4.158,00';
            break;
        case 13:
            spanValor.innerText = 'R$ 7.722,00';
            break;
        case 14:
            spanValor.innerText = 'R$ 13.513,50';
            break;
        case 15:
            spanValor.innerText = 'R$ 22.522,50';
            break;
        default:
            break;
    }
}

// Variável global para armazenar todas as labels de radio buttons
let todasLabels;

// Gera as labels para os radios
labelGenerator(10, 6, 'radio-', 'radio-label', '.container-labels');
// Gera os inputs (radios) associados às labels
inputGenerator('radio', 10, 6, 'radio-', 'qnt-numbers', '.container-labels', changeRadio);
// Seleciona todas as labels dos radios
todasLabels = document.querySelectorAll('.radio-label');
// Simula um clique na primeira label para marcar o primeiro radio button por padrão
todasLabels[0].click();

// Variáveis para controlar a quantidade de checkboxes marcados
let marcados = 0;

// Função para lidar com a mudança nos checkboxes
function changeCheckbox(e) {
    // Obtém a quantidade selecionada de checkboxes
    let quantity = document.querySelector('input[name="qnt-numbers"]:checked').value;
    // Obtém a referência ao elemento que exibirá quantos restam para selecionar
    let restantes = document.querySelector('#restantes');
    let check = e.target;

    // Loop para verificar e atualizar as classes das labels dos checkboxes
    for (const label of checkLabels) {
        if (label.getAttribute('for') == check.id) {
            // Verifica se a label está marcada e atualiza a contagem
            if (label.classList.contains('label-active')) {
                label.classList.remove('label-active');
                marcados--;
                restantes.innerText = `${quantity - marcados} restantes`;

                // Habilita todos os checkboxes quando um for desmarcado e restar apenas um para marcar
                if (marcados == quantity - 1) {
                    for (const checkbox of allCheckbox) {
                        if (!checkbox.checked) {
                            checkbox.removeAttribute('disabled');
                        }
                    }
                }
            } else if (marcados < quantity) {
                // Marca a label e atualiza a contagem
                label.classList.add('label-active');
                marcados++;
                restantes.innerText = `${quantity - marcados} restantes`;
            }

            // Verifica se todos os checkboxes foram marcados
            if (marcados == quantity) {
                // Se todos foram marcados, habilita o botão de aposta
                enableButton(true);
                // Desabilita os checkboxes não marcados
                for (const checkbox of allCheckbox) {
                    if (!checkbox.checked) {
                        checkbox.setAttribute('disabled', '');
                    }
                }
            } else {
                // Se não todos foram marcados, desabilita o botão de aposta
                enableButton(false);
            }
        }
    }
}

// Função para habilitar ou desabilitar o botão de aposta
function enableButton(checker) {
    let button = document.querySelector('#btn-bet');
    if (checker) {
        button.removeAttribute('disabled');
        button.classList.remove('btn-disabled');
        button.classList.add('btn-enabled');
    } else {
        button.setAttribute('disabled', '');
        button.classList.remove('btn-enabled');
        button.classList.add('btn-disabled');
    }
}

// Função para verificar a quantidade de checkboxes selecionados
function verificaQuantidade() {
    let quantity = document.querySelector('input[name="qnt-numbers"]:checked').value;
    let button = document.querySelector('#btn-bet');
    // Verifica se a quantidade de checkboxes selecionados é menor que a quantidade total
    if ((quantity - marcados) < 0) {
        // Se for, desabilita o botão de aposta
        button.setAttribute('disabled', '');
        button.classList.remove('btn-enabled');
        button.classList.add('btn-disabled');
    } else if (quantity > marcados) {
        // Se não todos os checkboxes foram selecionados, desabilita o botão de aposta
        button.setAttribute('disabled', '');
        button.classList.remove('btn-enabled');
        button.classList.add('btn-disabled');
        // Habilita os checkboxes não marcados
        for (const checkbox of allCheckbox) {
            if (!checkbox.checked) {
                checkbox.removeAttribute('disabled');
            }
        }
    }
}

// Gera as labels para os checkboxes
labelGenerator(60, 1, 'check-', 'check-label', '.choose-numbers');
// Gera os inputs (checkboxes) associados às labels
inputGenerator('checkbox', 60, 1, 'check-', 'choose-numbers', '.choose-numbers', changeCheckbox);

// Seleciona todas as labels dos checkboxes e todos os checkboxes
let checkLabels = document.querySelectorAll('.check-label');
let allCheckbox = document.querySelectorAll('input[name="choose-numbers"]');

// Event listener para o botão "Próximo"
document.querySelector('#btn-next').addEventListener('click', function () {
    let quantity = document.querySelector('input[name="qnt-numbers"]:checked').value;
    document.querySelector('#container-home').classList.add('hidden');
    document.querySelector('#container-bet').classList.remove('hidden');
    document.querySelector('#restantes').innerText = `${quantity - marcados} restantes`;
    verificaQuantidade();
});

// Event listener para o botão de aposta
document.querySelector('#btn-bet').addEventListener('click', function () {
    let overlay = document.querySelector('.overlay');
    let confirmation = document.querySelector('.confirmation');
    let confirmLabels = document.querySelector('.confirm-labels');

    confirmLabels.innerHTML = '';

    overlay.classList.remove('hidden');
    confirmation.classList.remove('hidden');

    // Adiciona labels de confirmação para os checkboxes selecionados
    for (const checkbox of allCheckbox) {
        let label = document.createElement('label');
        label.classList.add('label');
        label.classList.add('label-active');
        if (checkbox.checked) {
            label.innerText = checkbox.value < 10 ? '0' + checkbox.value : checkbox.value;
            confirmLabels.appendChild(label);
        }
    }
});

// Event listener para o botão "Cancelar"
document.querySelector('#btn-cancelar').addEventListener('click', function () {
    document.querySelector('.overlay').classList.remove('show');
    document.querySelector('.overlay').classList.add('hidden');
    document.querySelector('.confirmation').classList.remove('show');
    document.querySelector('.confirmation').classList.add('hidden');
});

// Event listener para o botão "Voltar"
document.querySelector('#btn-voltar').addEventListener('click', function () {
    document.querySelector('#container-bet').classList.add('hidden');
    document.querySelector('#container-home').classList.remove('hidden');
});

// Função para gerar um sorteio
function sorteio() {
    let numerosSorteados = [];
    let cont = 0;
    while (cont < 6) {
        let n = Math.floor(Math.random() * 60 + 1);
        let i = 0;
        if (numerosSorteados.length > 0) {
            for (const numero of numerosSorteados) {
                if (n === numero) {
                    i++;
                }
            }
            if (i === 0) {
                numerosSorteados.push(n);
            } else {
                cont--;
            }
        } else {
            numerosSorteados.push(n);
        }
        cont++
    }
    return numerosSorteados;
}

// Função para exibir o resultado do sorteio
function resultado() {
    let numerosSorteados = sorteio();
    let seusNumeros = document.querySelector('#seus-numeros');
    let titleResultado = document.querySelector('.title-resultado');
    let descriptionResultado = document.querySelector('.description-resultado');
    let cont = 0;

    document.querySelector('#container-bet').classList.add('hidden');
    document.querySelector('.confirmation').classList.add('hidden');
    document.querySelector('.overlay').classList.add('hidden');
    document.querySelector('#resultado').classList.remove('hidden');

    // Adiciona os números sorteados ao resultado
    for (const na of numerosSorteados) {
        let label = document.createElement('label');
        label.classList.add('label');
        label.classList.add('label-active');
        label.innerText = na < 10 ? '0' + na : na;
        document.querySelector('#numeros-sorteados').appendChild(label);
    }

    // Verifica os números selecionados pelo usuário
    for (const checkbox of allCheckbox) {
        if (checkbox.checked) {
            let mylabel = document.createElement('label');
            mylabel.classList.add('label-static');
            mylabel.innerText = checkbox.value < 10 ? '0' + checkbox.value : checkbox.value;

            // Verifica se os números selecionados pelo usuário foram sorteados
            for (const numeroSorteado of numerosSorteados) {
                if (numeroSorteado == checkbox.value) {
                    mylabel.classList.add('label-active');
                    cont++;
                }
            }
            seusNumeros.appendChild(mylabel);
        }
    }

    // Exibe o resultado com base nos números sorteados
    if (cont > 3) {
        titleResultado.innerText = 'Parabéns! :D';
        if (cont === 4 || cont === 5) {
            descriptionResultado.innerHTML = `Você acertou ${cont} números e o seu prêmio é de <strong>R$ 9.500.000,00</strong>`;
        } else {
            descriptionResultado.innerHTML = `Você acertou ${cont} números e o seu prêmio é de <strong>R$ 50.000.000,00</strong>`;
        }
    } else {
        titleResultado.innerText = 'Não foi dessa vez! :(';
        if (cont === 0) {
            descriptionResultado.innerText = `Você não acertou nenhum número.`;
        } else if (cont === 1) {
            descriptionResultado.innerText = `Você acertou 1 número, mas ainda não foi o suficiente.`;
        } else {
            descriptionResultado.innerText = `Você acertou ${cont} números, mas ainda não foi o suficiente.`;
        }
    }
}

// Event listener para o botão "Jogar"
document.querySelector('#btn-play').addEventListener('click', resultado);

// Event listener para o botão "Reiniciar"
document.querySelector('#btn-reload').addEventListener('click', function () {
    document.location.reload(true);
});