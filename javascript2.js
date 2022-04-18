seePopular();

$(document).on('click', '.posters', function() {
    console.log("clicked");
});

$('#popular-btn').click(seePopular);
$('#top-rated-btn').click(seeTopRated);
$('#form').submit(search);

function seePopular () {
    $("#heading").html("Popular Movies:");
    $("#container").empty();
    $.get("https://api.themoviedb.org/3/movie/popular?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US&page=1", function(data) {
        for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].poster_path != null && data.results[i].overview != "") {
                var poster = $('<img />',{
                    id: data.results[i].id,
                    class: "posters",
                    src: "https://image.tmdb.org/t/p/original" + data.results[i].poster_path , 
                    alt: "posters"
                }
                );
                $("#container").append(poster);
            }
        }
        console.log(data);
    });
}

function seeTopRated () {
    $("#heading").html("Top Rated Movies:");
    $("#container").empty();
    $.get("https://api.themoviedb.org/3/movie/top_rated?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US&page=1", function(data) {
        for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].poster_path != null && data.results[i].overview != "") {
                var poster = $('<img />',{
                    id: data.results[i].id,
                    class: "posters",
                    src: "https://image.tmdb.org/t/p/original" + data.results[i].poster_path , 
                    alt: "posters"
                }
                );
                $("#container").append(poster);
            }
        }
    });
}

function search(event){
    event.preventDefault();
    $("#heading").html("Search Result:");
    $("#container").empty();
    $.get("https://api.themoviedb.org/3/search/movie?api_key=0c1cfc186512612b10c8d9f9fe03adb2&query=" + $("#input").val(), function(data) {
        for (var i = 0; i < data.results.length; i++) {
            if (data.results[i].poster_path != null && data.results[i].overview != "") {
                var poster = $('<img />',{
                    id: data.results[i].id,
                    class: "posters",
                    src: "https://image.tmdb.org/t/p/original" + data.results[i].poster_path , 
                    alt: "posters"
                }
                );
                $("#container").append(poster);
            }
        }
    });
}



