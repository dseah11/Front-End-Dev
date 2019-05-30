function changePage(url) {
    $.ajax({
        url: url,
        success: function (data) {
            $(".content-box").html(data);
        },
    });
}

function showCourseDetail(id) {
    $.getJSON("courses.json", function (data) {
        $.each(data.courses, function () {
            if (this.course_id === id) {
                var courseDetails = '<section id="course_details"';
                courseDetails += "<h2>Title: " + this.course_name + "</h2>" +
                    "<h3>About the course</h3>" +
                    "<p>" + this.course_description + "</p>" +
                    "<h3>Who this course is for</h3>" +
                    "<p>" + this.course_recommend +
                    "<h3>Course Price in SGD$: SGD$ " + this.course_price + "</h3>" +
                    '<h3>Choose your currency</h3>' +
                    '<select onchange="showCurrency(' + this.course_price + ')" id="currency-selector">' +
                    `<option disabled>--Choose your currency--</option>
                                    <option>SGD</option>
                                    <option value="inr">INR</option>
                                    <option value="php">PHP</option>
                                    <option value="myr">MYR</option>
                                    <option value="idr">IDR</option>
                                </select>
                                <h3 id="price-indicator"></h3>
                                </section>`;
                // console.log(courseDetails);
                $(".content-box").html(courseDetails);
            }
        });
    });
}
//Submit events done by js. Not what is required here. Validation must be done in js in this case
function showCurrency(cost) {
    var sample = $("#currency-selector option:selected").text();
    calcCurrency(cost, sample);

    
}
function calcCurrency(cost, sample){
    var url = "currency.json";
    $.getJSON(url, function (data) {
        var details = "Hi";
        
        console.log(sample);
        console.log("Currency js started");
        $.each(url.currencies, function (result) {

            console.log(sample);
            if (sample == this.code) {
                changeCost = cost * this.conversion;
            }
            details = "Course price in " + this.name + " (" + this.code + "): " + changeCost;
            console.log(details);
        });
    });
    $("#price-indicator").text(details);
}


function showResponse() {
    console.log("Response triggered.");
    $(".form").submit(function (event) {
        console.log("Submit event fired");
        $(".content-box").html("<h1>Thank you for contacting us</h1>" +
            "<p>We will get back to you as soon as we can</p>");
    });
}