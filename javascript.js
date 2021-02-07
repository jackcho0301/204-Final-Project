//Credit:
//This project uses API from TMDB (The Movie Database)
//https://www.themoviedb.org/


//my api key:
//0c1cfc186512612b10c8d9f9fe03adb2

//search example:
//https://api.themoviedb.org/3/search/movie?api_key=0c1cfc186512612b10c8d9f9fe03adb2&query=Cloverfield

//cloverfield video:
// https://www.youtube.com/watch?v=
// 8brYvhEg5Aw

//for video:
//use this request:
//https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US
//movie id 384521
//api key: 0c1cfc186512612b10c8d9f9fe03adb2
//ex: 
// https://api.themoviedb.org/3/movie/384521/videos?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US
//and then get the key
//and append key to:
//https://www.youtube.com/watch?v=


//finding movie by id:
//https://api.themoviedb.org/3/movie/7191?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US

//get cast by movie id:
//https://api.themoviedb.org/3/movie/7191/credits?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US
//limit to 5?
//xxxxxx.cast[i].name

//overview may be too long, use overflow


const form = document.getElementById("form");
form.addEventListener("submit", search, false);

const popularButton = document.getElementById("popular-btn");
popularButton.addEventListener("click", seePopular, false);

const topRatedButton = document.getElementById("top-rated-btn");
topRatedButton.addEventListener("click", seeTopRated, false);

//category (See Popular, See Top-Rated)
var heading = document.getElementById("heading");

//iframe for trailer
var trailer = document.getElementById("trailer");

//title of clicked movie
var detailTitle = document.getElementById("detail-title");

var detailReleaseDate = document.getElementById("detail-release-date");

//overview of clicked movie
var detailOverview = document.getElementById("detail-overview");

var detailPoster = document.createElement("img");
detailPoster.setAttribute("id", "detail-poster");

var detailPosterContainer = document.getElementById("detail-poster-container");
detailPosterContainer.appendChild(detailPoster);


var detailRuntime = document.getElementById("detail-runtime");



var hiddenDiv = document.getElementById("hidden-div");

var closeButton = document.getElementById("close_button");

//array of all posters on page
var allPosters = document.getElementsByClassName("posters");
closeButton.addEventListener("click", closeHiddenDiv);

//container that displays all posters on page
var posterContainer = document.getElementById("container");

var trailerExists = new Boolean(false);




function closeHiddenDiv() {
    // detailTitle.innerHTML = " ";
    detailOverview.innerHTML = "Overview: Not Found";
    hiddenDiv.style.zIndex = -1;
    hiddenDiv.style.display = "none";
    trailer.setAttribute("src", "");
    detailPoster.setAttribute("src", "");
    for (var i = 0; i < allPosters.length; i++) {
        allPosters[i].style.opacity = 1;
    }
}



//see popular upon load:
seePopular();

function clicked(event) {
    hiddenDiv.style.zIndex = 1;
    hiddenDiv.style.display = "block";

    event.target.style.border = "5px solid blue";
    console.log(event.target.id);

    for (var i = 0; i < allPosters.length; i++) {
        allPosters[i].style.opacity = 0.5;
    }

    //get trailer for clicked movie:
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var videoRequest = JSON.parse(this.responseText);
            // console.log(videoRequest.results[0].key);
            if (videoRequest.results.length > 0) {
                trailerExists = true;
                trailer.style.display = "block";
                trailer.setAttribute("src", "https://www.youtube.com/embed/" + videoRequest.results[0].key);
                detailPoster.style.display = "none";
            }
            else {
                //trailer not found; do something here
                trailerExists = false;
                        trailer.style.display = "none";
            }
        }
        else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }

    }
    xhttp.open("GET", "https://api.themoviedb.org/3/movie/" + event.target.id + "/videos?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US", true);
    xhttp.send();

    //get information on clicked movie based on movie ID
    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var movieById = JSON.parse(this.responseText);
            console.log("overview: " + movieById.overview);
            console.log("release date: " + movieById.release_date);
            console.log("runtime: " + movieById.runtime);
   
            detailTitle.innerHTML = movieById.title;
            detailReleaseDate.innerHTML = "Release Date: " + movieById.release_date;
            detailRuntime.innerHTML = "Runtime: " + movieById.runtime + " minutes";
    

            if(movieById.overview != null){
                detailOverview.innerHTML = movieById.overview;
            }
            else{
                detailOverview.innerHTML = "Overview: Not Found"
            }

            if (!trailerExists){
            detailPoster.setAttribute("src", "https://image.tmdb.org/t/p/original" + movieById.poster_path);
            detailPoster.style.float = "left";
            detailPoster.style.display = "block";
            detailPoster.style.marginRight = "10px";

            }

        }
        else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }

    }
    xhttp2.open("GET", "https://api.themoviedb.org/3/movie/" + event.target.id + "?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US", true);
    xhttp2.send();

    // https://api.themoviedb.org/3/movie/7191?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US

}

//change css when hover on
function borderAppear(event) {
    event.target.style.border = "5px solid red";
}

//change css when hover off
function borderDisappear(event) {
    event.target.style.border = "5px solid black";
}



//search for movies:
function search(event) {
    event.preventDefault();
    var input = document.getElementById("input");
    var inputValue = input.value;

    heading.innerHTML = "Search Result:";

    //clear poster container
    posterContainer.innerHTML = "";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            for (var i = 0; i < results.results.length; i++) {

                if (results.results[i].poster_path != null && results.results[i].overview != "") {
                    var poster = document.createElement("img");
                    poster.setAttribute("src", "https://image.tmdb.org/t/p/original" + results.results[i].poster_path);
                    poster.setAttribute("class", "posters");
                    poster.setAttribute("id", results.results[i].id);
                    posterContainer.appendChild(poster);
                }
            }
            for (var i = 0; i < allPosters.length; i++) {
                allPosters[i].style.border = "5px solid black";
                allPosters[i].addEventListener("click", clicked);
                allPosters[i].addEventListener("mouseover", borderAppear);
                allPosters[i].addEventListener("mouseout", borderDisappear);
            }


        }
        else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    }
    xhttp.open("GET", "https://api.themoviedb.org/3/search/movie?api_key=0c1cfc186512612b10c8d9f9fe03adb2&query=" + inputValue, true);
    xhttp.send();
}


//see popular movies:
function seePopular() {
    heading.innerHTML = "Popular Movies:";

    posterContainer.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);

            for (var i = 0; i < results.results.length; i++) {
                if (results.results[i].poster_path != null && results.results[i].overview != "") {
                    var poster = document.createElement("img");
                    poster.setAttribute("src", "https://image.tmdb.org/t/p/original" + results.results[i].poster_path);
                    poster.setAttribute("class", "posters");
                    poster.setAttribute("id", results.results[i].id);
                    posterContainer.appendChild(poster);
                }

            }

            for (var i = 0; i < allPosters.length; i++) {
                allPosters[i].style.border = "5px solid black";
                allPosters[i].addEventListener("click", clicked);
                allPosters[i].addEventListener("mouseover", borderAppear);
                allPosters[i].addEventListener("mouseout", borderDisappear);
            }
        }
        else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    }
    xhttp.open("GET", "https://api.themoviedb.org/3/movie/popular?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US&page=1", true);
    xhttp.send();
}

//see top rated movies:
function seeTopRated() {
    heading.innerHTML = "Top-Rated Movies:";

    posterContainer.innerHTML = "";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);

            for (var i = 0; i < results.results.length; i++) {
                if (results.results[i].poster_path != null && results.results[i].overview != "") {
                    var poster = document.createElement("img");
                    poster.setAttribute("src", "https://image.tmdb.org/t/p/original" + results.results[i].poster_path);
                    poster.setAttribute("class", "posters");
                    poster.setAttribute("id", results.results[i].id);

                    posterContainer.appendChild(poster);
                }

            }
            for (var i = 0; i < allPosters.length; i++) {
                allPosters[i].style.border = "5px solid black";
                allPosters[i].addEventListener("click", clicked);
                allPosters[i].addEventListener("mouseover", borderAppear);
                allPosters[i].addEventListener("mouseout", borderDisappear);
            }
        }
        else if (this.readyState == 4) {
            // this.status !== 200, error from server
            console.log(this.responseText);
        }
    }
    xhttp.open("GET", "https://api.themoviedb.org/3/movie/top_rated?api_key=0c1cfc186512612b10c8d9f9fe03adb2&language=en-US&page=1", true);
    xhttp.send();
}
