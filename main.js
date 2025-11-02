// ===== Parte 1: Cifra de Atbash =====
function cifrarAtbash(texto) {
    let maiusculo = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let minuscula = "abcdefghijklmnopqrstuvwxyz";
    let saida = "";
    for (let i = 0; i < texto.length; i++) {
        let letterIn = texto[i];
        let letterOut = " ";
        if (letterIn != " ") {
            let pos = maiusculo.search(letterIn);
            if (pos != -1) {
                letterOut = maiusculo[25 - pos];
            } else {
                pos = minuscula.search(letterIn);
                letterOut = minuscula[25 - pos];
            }
        }
        saida += letterOut;
    }
    return saida;
}

function executarAtbash() {
    let texto = document.getElementById("textoAtbash").value;
    document.getElementById("saidaAtbash").textContent = cifrarAtbash(texto);
}

// ===== Parte 2: Cifra de César =====
function cifrarCesar(mensagem, chave) {
    let saida = "";
    for (let i = 0; i < mensagem.length; i++) {
        let letra = mensagem[i];
        if (/[a-zA-Z]/.test(letra)) {
            let base = letra === letra.toUpperCase() ? 65 : 97;
            let codigo = ((letra.charCodeAt(0) - base + chave) % 26 + 26) % 26 + base;
            saida += String.fromCharCode(codigo);
        } else {
            saida += letra;
        }
    }
    return saida;
}

function executarCesar() {
    let texto = document.getElementById("textoCesar").value;
    let chave = parseInt(document.getElementById("chaveCesar").value);
    document.getElementById("saidaCesar").textContent = cifrarCesar(texto, chave);
}

// ===== Parte 3: Cifra de Vigenère =====
function cifrarVigenere(mensagem, palavraChave, modo = 'codificar') {
    let saida = "";
    let j = 0;
    for (let i = 0; i < mensagem.length; i++) {
        let letra = mensagem[i];
        if (/[a-zA-Z]/.test(letra)) {
            let base = letra === letra.toUpperCase() ? 65 : 97;
            let chaveLetra = palavraChave[j % palavraChave.length].toLowerCase().charCodeAt(0) - 97;
            let desloc = modo === 'codificar' ? chaveLetra : -chaveLetra;
            let codigo = ((letra.charCodeAt(0) - base + desloc + 26) % 26) + base;
            saida += String.fromCharCode(codigo);
            j++;
        } else {
            saida += letra;
        }
    }
    return saida;
}

function executarVigenere() {
    let texto = document.getElementById("textoVigenere").value;
    let chave = document.getElementById("chaveVigenere").value;
    document.getElementById("saidaVigenere").textContent = cifrarVigenere(texto, chave);
}

// ===== Parte 4: RSA Didático =====
function gerarChavesRSA_Didaticas(p, q) {
    if (p <= 1 || q <= 1) return null;
    const N = p * q;
    const phi_N = (p - 1) * (q - 1);
    let E = 3;
    while (E < phi_N) {
        if ((phi_N % E !== 0) && ((p - 1) % E !== 0) && ((q - 1) % E !== 0)) {
            break;
        }
        E++;
    }
    let D = 1;
    while (D < phi_N) {
        if ((D * E) % phi_N === 1) {
            break;
        }
        D++;
    }
    return { publica: { E, N }, privada: { D, N } };
}

function executarRSA() {
    let p = parseInt(document.getElementById("p").value);
    let q = parseInt(document.getElementById("q").value);
    let chaves = gerarChavesRSA_Didaticas(p, q);
    document.getElementById("saidaRSA").textContent = JSON.stringify(chaves, null, 2);
}
