function changePage(url) {
    $.ajax({
        url: url,
        success: function (data) {
            $(".content-box").html(data);
        },
    });
}

function showCourseDetail(id){
    $.getJSON("courses.json", function(data){
        $.each(data.courses, function(){
            if(this.course_id === id){
                var courseDetails = '<section id="course_details"';
                courseDetails +="<h2>Title: " + this.course_name + "</h2>" +
                                "<h3>About the course</h3>" + 
                                "<p>" + this.course_description + "</p>" + 
                                "<h3>Who this course is for</h3>" + 
                                "<p>" + this.course_recommend + 
                                "<h3>Course Price: SGD$ " + this.course_price + "</h3>" + 
                                "</section>";
                console.log(courseDetails);
                $(".content-box").html(courseDetails);
            }
        });
    });
}
function showThankYou(){
    $(".content-box").html("<h1>Thank you</h1>");
}

//Submit events done by js. Not what is required here. Validation must be done in js in this case

// function tryMeNow(){
//     const form = document.getElementById('form');
//     form.onsubmit = submit(event);
// }

// function submit(event){
//     console.log("Submit event fired");
//     $(".content-box").html("<h1>Thank you for contacting us</h1>" +
//                             "<p>We will get back to you as soon as we can</p>"); 
// }