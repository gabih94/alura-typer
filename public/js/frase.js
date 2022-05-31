$("#botaoFrase").on("click", fraseAleatoria);
$("#botaoFraseId").on("click", buscaFrase);

function fraseAleatoria(){
    $("#spiner").toggle();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function (){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spiner").toggle();
    });
}

function trocaFraseAleatoria(data){
    let frase = $(".frase");
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase(){
    $("#spiner").toggle();
    let fraseBuscaId = $("#fraseId").val();
    let dados = {id: fraseBuscaId};

    $.get("http://localhost:3000/frases",dados, trocaFrase)
    .fail(function() {
        $("#erro").show();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spiner").toggle();
    });
}

function trocaFrase(data){
    let frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}