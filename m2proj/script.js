
//When document is read, load home page
$(document).ready(function(){
    
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
var lasturl="";

//checks url using hash. Hash is possibly provided by browser.
function checkURL(hash)
{
    //if no hash, then hash shall be the current location, minus #
	if(!hash){
        hash=window.location.hash;
    } 

    //IF there is a change in url....
	if(hash != lasturl)
	{
		lasturl=hash;
		// FIX - if we've used the history buttons to return to the homepage,
		// fill the pageContent with the default_content
		if(hash=="")
        loadHome();

        //if it's course-details, do nothing. The site should only be accessible from course-list.html
        else if(hash==="#course-detail"){
            return;
        }
		else{
        hash=hash.replace("#", "");
        hash += ".html";
        changePage(hash);
		}
	}
}

//changes pages by calling ajax and replacing the contents of .content-box
function changePage(url) {
    $('#loading').css('visibility','visible');
    if(url === ""){
        loadHome();
    }
    else{
        $.ajax({
            url: url,
            success: function (data) {
                $(".content-box").html(data);
                $('#loading').css('visibility','hidden');
            },
        });
    }
    
}

// This function loads a course template. Upon loading,
// the course json file is loaded and its data is extracted based on the id provided
// there might be a better way of doign this though

var curPrice = 0;
function showCourseDetail(id) {
    changePage('course-template.html');
    $(document).ready(function(){
        $.getJSON("courses.json", function (data) {
            $.each(data.courses, function () {
                if (this.course_id === id) {
                    //change page to course template
                    
                    $("#c-title").append(this.course_name);
                    $("#c-desc").text(this.course_description);
                    $("#c-reccomend").text(this.course_recommend);
                    $("#c-price").append(this.course_price);
                    curPrice = this.course_price;
                }
            });
            
        });
    });
}
//Submit events done by js. Not what is required here. Validation must be done in js in this case
function showCurrency(cost) {
    var currCode = $("#price-option").val();
    var amount= parseInt(cost.replace('In SGD: $',''));
    calcCurrency(currCode, amount);

    
}
//calc the currency and places the amount back into the page
function calcCurrency(currCode, amount){
    var url = "currency.json";
    var details = "";
    $.getJSON(url, function (data) {
        // console.log("Currency Json started");
        $.each(data.currencies, function(){
            if (currCode == this.code) {
                // console.log(this.code);
                // console.log(currCode);
                // console.log("Before change: " + amount);
                amount *= this.conversion;
                details += this.name + ": "+ this.code + " " + amount;
            // console.log(details);
            // console.log("after change: " + amount)
            }
        })
        $("#price-indicator").text(details);
    });
    
}

//Looks intimidating but this is merely placing the home page html in a string
//before loading up into the content-box
function loadHome(){
    $('#loading').css('visibility','visible');
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
    $('#loading').css('visibility','hidden');
}


