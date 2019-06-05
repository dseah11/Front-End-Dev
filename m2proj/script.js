//When document is read, load home page
$(document).ready(function () {

    checkURL();
    // This is redundant as the webpage already has onclick functions
    // $("a").click(function(e){
    //     checkURL(this.hash);
    // })
    loadHome();

    //constant check of url at a set interval. Not sure why it's 250 though. Responsible for 
    //going backward and forward in history.
    setInterval("checkURL()", 250);
})
//Save point for previous url
var lasturl = "";

//checks url using hash. Hash is possibly provided by browser.
function checkURL(hash) {
    //if no hash, then hash shall be the current location, minus #
    if (!hash) {
        hash = window.location.hash;
    }

    //IF there is a change in url....
    if (hash != lasturl) {
        lasturl = hash;
        // FIX - if we've used the history buttons to return to the homepage,
        // fill the pageContent with the default_content

        //switch to check individual courses
        console.log("Current hash: " + hash);
        switch (hash) {
            case "":
                loadHome();
                break;
            case "#course-listing":
                displayCourse();
                break;
            case "#HTML001":
            case "#HTML002":
            case "#JAVA001":
            case "#JAVA002":
                hash = hash.replace("#", "")
                showCourseDetail(hash);
                console.log("Course page loading...");
                break;
            default:
                hash = hash.replace("#", "");
                hash += ".html";
                changePage(hash);
                break;
        }
    }
}

//changes pages by calling ajax and replacing the contents of .content-box
function changePage(url) {

    if (url === "") {
        loadHome();
    } else {
        $.ajax({
            url: url,
            success: function (data) {
                $('#loading').css('visibility', 'visible');
                console.log("Loading button Visible");
                $(".content-box").html(data);
                $('#loading').css('visibility', 'hidden');
                console.log("Loading button not Visible");
            },
        });
    }

}

//Function that displays ALL courses available in the Course JSON file
function displayCourse() {
    $('#loading').css('visibility', 'visible');
    console.log("course is loading");
    var str = '<h1>Courses Available</h1>';
    var url = "courses.json";
    $.getJSON(url, function (data) {
        $.each(data.courses, function () {
            str += '<h2><a href="#' + this.course_id + '" onclick="showCourseDetail(\'' +
                this.course_id + '\')">' + this.course_name + '</a> </h2>' +
                '<ul><li>Cost: ' + this.course_price + '</li>' +
                '<li>Description: ' + this.course_description + '</li>' +
                '</ul><br>';
        });
        $('.content-box').html(str);
    });
    $('#loading').css('visibility', 'hidden');
    console.log("course has loaded");
}

// This function loads a shell html file. Upon loading,
// the course json file is loaded and its data is onto the relevant classes provided
// there might be a better way of doign this though
function showCourseDetail(url) {
    changePage(url + ".html");

    $(document).ready(function () {
        $.getJSON("courses.json", function (data) {
            $.each(data.courses, function () {
                if (this.course_id === url) {
                    //change page to course template

                    $(".c-title").append(this.course_name);
                    $(".c-desc").text(this.course_description);
                    $(".c-reccomend").text(this.course_recommend);
                    $(".c-price").append(this.course_price);

                    var str = '<a class="c-button" href="#' + this.course_id + '-schedule" onclick="changePage(\'' +
                        this.course_id + '-schedule.html\')">Check Course Schedule!</a>';
                    $(".c-schedule").html(str);

                    curPrice = this.course_price;
                }
            });

        });
    });
}
//Submit events done by js. Not what is required here. Validation must be done in js in this case
function showCurrency(cost) {

    var currCode = $("#price-option").val();
    console.log(currCode);
    var amount = parseInt(cost.replace('In SGD: $', ''));
    calcCurrency(currCode, amount);


}
//calc the currency and places the amount back into the page
function calcCurrency(currCode, amount) {
    var url = "currency.json";
    var details = "";
    $.getJSON(url, function (data) {

        $.each(data.currencies, function () {
            if (currCode == this.code) {
                amount *= this.conversion;
                details += this.name + ": " + this.code + " " + amount;
            }
        })
        $(".price-indicator").text(details);
    });

}

//Looks intimidating but this is merely placing the home page html in a string
//before loading up into the content-box
function loadHome() {
    $('#loading').css('visibility', 'visible');
    var home = `
    <h1>Welcome to ABC Learning Centre</h1>
    <article>
        <h2>Latest News</h2>
        <p>Placeholder</p>
    </article>
    <article>
        <h2>Popular Courses</h2>
        <p>Placeholder</p>
    </article>
    <p>914 translation by H. Rackham

        "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born
        and I will give you
        a complete account of the system, and expound the actual teachings of the great explorer of the truth,
        the master-builder of human happiness. No one rejects, dislikes,
        or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue
        pleasure rationally encounter consequences that are extremely painful.
        Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,
        but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.
        To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain
        some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure
        that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
    </p>`;
    $(".content-box").html(home);
    $('#loading').css('visibility', 'hidden');
}