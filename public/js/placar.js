$("#botaoPlacar").on("click",mostraPlacar); //chama o id botão ao clicar para a fun~]ao mostra placar//
$("#botaoSync").on("click",sincronizaPlacar);


function inserePlacar(){
    //procura dentro de placar o tbody dsa tabela p/ realizar inserção //
    let corpoTabela = $(".placar").find("tbody");
    let usuario = $("#usuarios").val();
    let numPalavras = $("#contadorPalavras").text();

    //cria linha no html//
    let linha = novaLinha(usuario, numPalavras);
    linha.find(".botaoDelete").on("click", removeLinha); //remove linha//
                
    //insere os dados que foram passdos para a linha no corpo da tabela//
    //append insere no fim da tabela e prepend no incio dela//
    corpoTabela.prepend(linha);
    
    $(".placar").slideDown(500);
    scrollPlacar();
    
    //corpoTabela.append(linha); => adiciona depois
}

function scrollPlacar(){
    let posicaoPlacar = $(".placar").offset().top;
    $(".body").animate({
        scrollTop: posicaoPlacar+"px"
    },1000);
}

function novaLinha(usuario, palavras){
    let linha = $("<tr>");
    let colunaUsuario = $("<td>").text(usuario);
    let colunaPalavras = $("<td>").text(palavras);
    let colunaRemover = $("<td>");

    let link = $("<a>").addClass("botaoDelete").attr("href", "#");
    let icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event){
    //para não rolar ao topo da tela//
    event.preventDefault();
    const placarRemover = $(this).parent().parent();
    placarRemover.fadeOut(1000);
    setTimeout(function(){
        placarRemover.remove();
    },1000);
    
}

//clicar no botão mostra a tabela//
function mostraPlacar(){
    $(".placar").stop().slideToggle(600);
}

//criar array//
function sincronizaPlacar(){
    let placar = [];
    let linhas = $("tbody>tr"); //passa as tr's filhas do tbody//
    //passa linha por linha p/ objeto//
    linhas.each(function(){
        /* envolve o elemento 'this' que é html com o '$' para poder usar jquery
        find busca o primeiro td do tebody que é nomes, e o text captura o nome */
        let usuario = $(this).find("td:nth-child(1)").text();
        let palavras = $(this).find("td:nth-child(2)").text();

        /* para salvar, criamos o objeto conforme as caracteristicas do banco em http://localhost:3000/placar
        transforma em objeto 
        o id o banco quem cria */
        let score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score); //puxda para dentro do array//
    });

    //vira objeto para subir pro banco//
    let dados = {
        placar: placar
    };

    //usa metodo post para subir//
    $.post("http://localhost:3000/placar",dados, function(){
        console.log("Salvou o placar");
        $(".tooltip").tooltipster("open").tooltipster("content", "Sucesso ao Sincronizar!");
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao Sincronizar!");
    }).always(function(){
        setTimeout(function(){
            $(".tooltip").tooltipster("close");
        },1200);
    });
}

//função que carrega a página com os
function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        //cria uma linha p/ cada objeto//
        $(data).each(function(){
            let linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botaoDelete").on("click", removeLinha);
            $("tbody").append(linha);
        });
    });
}