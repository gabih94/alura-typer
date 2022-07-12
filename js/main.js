let tempoInicial = $("#tempoDigitacao").text();
const campo = $(".campoDigitacao");

$(function(){
    atualizaTamanhoFrase();
    iniciarContador();
    iniciarCronometro();
    iniciarMarcador();
    $("#reiniciar").on("click", reiniciaJogo);
    atualizaPlacar();


    $("#usuarios").selectize({
        create: true,
        sortField: 'text'
    });

    $(document).ready(function() {
        $('.tooltip').tooltipster({
            trigger: "custom"
        });
    });
});

function atualizaTempoInicial(tempo){
    $("#tempoDigitacao").text(tempo);
    tempoInicial = tempo;
}

function atualizaTamanhoFrase(){
    let frase = $(".frase").text();
    const numDePalavras = frase.split(" ").length;
    const tamanhoDaFrase = $("#tamanhoFrase");
    tamanhoDaFrase.text(numDePalavras);
}

function iniciarContador(){
    campo.on("input",function(){
        const conteudo = campo.val();
    
        const qtdPalavras = conteudo.split(/\S+/).length -1;
        $("#contadorPalavras").text(qtdPalavras);
    
        var caracteres = conteudo.length;
        $("#contadorCaracteres").text(caracteres);
    });
}

function iniciarCronometro(){
    campo.one("focus", function(){
        let tempoRestante = $("#tempoDigitacao").text();
        const cronometroID = setInterval(function(){
            tempoRestante--;
            console.log(tempoRestante);
            $("#tempoDigitacao").text(tempoRestante);
    
            if(tempoRestante < 1){
                clearInterval(cronometroID);
                finalizaJogo();
            }
            
        },1000);
    });
}

function finalizaJogo(){
    campo.attr("disabled", true);
    campo.addClass("campoDesativado");
    inserePlacar();
}

function iniciarMarcador(){
    campo.on("input", function(){
        let frase = $(".frase").text();
        let digitado = campo.val();
        let digitouCorreto = frase.startsWith(digitado);
        //não funciona o ECM6: comparavel = frase.substring(0,digitado.length); //
        
        if(digitouCorreto){
            campo.addClass("campoCorreto");
        }else{
            campo.addClass("campoErrado");
        }
    });
}

function reiniciaJogo(){
    campo.attr("disabled", false);
    campo.val("");
    $("#contadorPalavras").text("0");
    $("#contadorCaracteres").text("0");
    $("#tempoDigitacao").text(tempoInicial);
    iniciarCronometro();
    campo.removeClass("campoDesativado");
    campo.removeClass("campoErrado");
    campo.removeClass("campoCorreto");
}
