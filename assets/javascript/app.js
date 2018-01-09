$(document).ready(function () {

    var key = "RXQMk6lCuY60A5fJc4755x3ZKsDhOFCc";
    var topics = ["Critical Role", "Harry Potter", "Star Wars", "Supernatural", "Doctor Who", "Phineas and Ferb", "Doctor Strange", "Iron Man", "Deadpool", "X-Men"];

    /*=======================================
        function to create and render buttons
    =========================================*/

    function renderBtns() {
        $("#buttons-view").empty();

        for (let i in topics) {
            var fandom = $("<button>");
            fandom.addClass("btn btn-default fandom");
            fandom.attr("data-name", topics[i]);
            fandom.text(topics[i]);
            $("#buttons-view").append(fandom);
        }
    }

    /*=======================================
        function to call the API and render the response
    =========================================*/

    function displayGifs() {
        $("#gifs-view").empty();
        var search = $(this).attr("data-name");
        console.log(search);
        var query = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + search + "&limit=10";
        console.log(query);
        $.ajax({
            url: query,
            method: "GET"
        }).done(function (response) {

            console.log(response);

            for (let i in response.data) {
                var gifsDiv = $("<div>");
                gifsDiv.addClass("col-md-4");
                var rating = response.data[i].rating;
                var pOne = $("<p>").text("Rating: " + rating);
                gifsDiv.append(pOne);
                var stillGif = response.data[i].images.fixed_width_still.url;
                var animateGif = response.data[i].images.fixed_width.url;
                var image = $("<img>");
                image.addClass("gif");
                image.attr("src", stillGif);
                image.attr("data-still", stillGif);
                image.attr("data-animate", animateGif);
                image.attr("data-state", "still");
                gifsDiv.prepend(image);
                $("#gifs-view").append(gifsDiv);
            }


        })
    }

    /*=======================================
       When add button is clicked it adds a new button
    =========================================*/

    $("#add-fandom").on("click", function(event) {
        event.preventDefault();

        var newFandom = $("#fandom-input").val().trim();

        topics.push(newFandom);

        renderBtns();
    })

    /*=======================================
        when gif is clicked it will animate
    =========================================*/

    $(document).on("click", ".gif", function () {

        var state = $(this).attr("data-state");
        var animate = $(this).attr("data-animate");
        var still = $(this).attr("data-still");

        if (state === "still") {
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
        }


    })

    $(document).on("click", ".fandom", displayGifs)
    
    renderBtns();

})