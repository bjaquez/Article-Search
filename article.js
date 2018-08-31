$(document).ready(function(){

    var search;
    var startDate;
    var endDate;
    var amount;
    
    function clear(){
        $("#articles").empty().hide();
    }
    
    $("#articles").hide();

    $(".clear").on("click", clear);

    $(".search").on("click", function(){

        search = $("#search-term").val();
        amount = $("#amount").val();
        startDate = $("#start-year").val() || "20180731";
        endDate = $("#end-year").val() || "20180831";

        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
          'api-key': "f3b96d607e424346864eeb1366bde40e",
          'q': search,
          'begin_date': startDate,
          'end_date': endDate 
        });
        $.ajax({
          url: url,
          method: 'GET',
        }).then(function(result) {
            clear();
            $("#articles").show();
            $("#articles").append(`
                <h4 class = "my-4"> <i class="fas fa-newspaper"></i> Top Articles </h4>
            `)
            var documents = result.response.docs;
            
            for (var i = 0; i<amount; i++){
                var title = documents[i].headline.main;
                var author = documents[i].byline.original;
                var url = documents[i].web_url;
                var pub = documents[i].pub_date;
                var article = $("<div>").append(`
                    <div class="card">
                    <div class="card-body">
                        <p>${title}</p>
                        <p>${author}</p>
                        <p>${pub}</p>
                        <p><a href="${url}">${url}</a></p>
                    </div>
                    </div>
                    
                `);
                
                $("#articles").append(article)
                console.log(title, author, url, pub);    
            }
            
            console.log(result);
    
        })
    })
    



})






