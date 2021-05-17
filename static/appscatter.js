// ===============Responsive Function 
d3.select(window).on("resize", handleResize);

// When the browser loads, loadChart() is called
loadChart();

function handleResize() {
  var svgArea = d3.select("svg");

  // If there is already an svg container on the page, remove it and reload the chart
  if (!svgArea.empty()) {
    svgArea.remove();
    loadChart();
  }
}

function loadChart() {
    // ===========Set Height, Width and Margins
    var svgHeight = 550;
    var svgWidth = 600;
    var margin = {
        top: 20,
        right: 40,
        bottom: 65,
        left: 90
    };
    
    // ===========Create chart area
    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    // ******Test that the settings are working******
    console.log("Height: ", height);
    console.log("Width: ", width);

    //============Create SVG container
    var svg = d3.select("#scatter").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // ===========Append SVG group
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    ///////////////chart area set-up//////////////////////////////////////////////////////////
    var chosenXAxis = "atl_rank";
    var chosenYAxis = "departure_count_atl";
    var chosenairport = "departure_to_atl";

    // ==========xScale and yScale//
    function xScale(aviationData, chosenXAxis) {
        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(aviationData, d => d[chosenXAxis]),
                d3.max(aviationData, d => d[chosenXAxis]) 
        ])
        .range([0, width]);

        return xLinearScale;
    }
    function yScale(aviationData, chosenYAxis) {
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(aviationData, d => d[chosenYAxis])
            ])
            .range([height, 0]);

        return yLinearScale;
    }

    // updating xAxis  and yAxis variable upon click on axis label
    function renderXAxes(newXScale, xAxis) {
        var bottomAxis = d3.axisBottom(newXScale);

        xAxis.transition()
            .duration(1000)
            .call(bottomAxis);

        return xAxis;
    }

    function renderYAxes(newYScale, yAxis) {
        var leftAxis = d3.axisLeft(newYScale);
  
        yAxis.transition()
            .duration(1000)
            .call(leftAxis);
  
        return yAxis;
    }

    // function used for updating circles group with a transition to
    // new circles on X and Y axis
    function renderXCircles(circleGroup, newXScale, chosenXAxis) {
        circleGroup.transition()
            .duration(1000)
            .attr("cx", d => newXScale(d[chosenXAxis]));

        return circleGroup;
    }

    function renderYCircles(circleGroup, newYScale, chosenYAxis) {
        circleGroup.transition()
            .duration(1000)
            .attr("cy", d => newYScale(d[chosenYAxis]));
  
        return circleGroup;
    }

    // =================Update Tooltips - labels and tip
    function updateToolTip(circleGroup, chosenXAxis, chosenYAxis, chosenairport) {
        var xlabel;
        var chosenairportlabel;
        var ylabel;
        if (chosenYAxis === "departure_count_atl") {
            ylabel = ("Departure Count ATL: ");
            xlabel = ("Rank ATL: ");
            // chosenairportlabel = ("Departure to ATL: ");
        }
        else {
            ylabel = ("Departure Count LAX: ");
            xlabel = ("Rank LAX ");
            // chosenairportlabel = ("Depart to LAX: ")
        }
        
        // ==============Update tool function
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(d) {
                return(`${xlabel}${d[chosenXAxis]}<hr>${ylabel}${d[chosenYAxis]}`)
            });

        circleGroup.call(toolTip);

        circleGroup.on("mouseover", function(d) {
            toolTip.show(d, this);
        })
            .on("mouseout", function(d) {
                toolTip.hide(d);
            });

        return circleGroup;
    }
  

   // ===============Retrieving data & Parse data======================================
   d3.csv("../static/arrivals.csv").then(function(aviationData, err) {
    //d3.csv("../static/arrivals.csv", function(aviationData, err) {
    if (err) throw err;

    aviationData.forEach(function(data) {
        data.departure_count_atl = +data.departure_count_atl;
        data.departure_count_lax = +data.departure_count_lax;
        data.atl_rank = +data.atl_rank;
        data.lax_rank = +data.lax_rank;
    });

    // ******Testing Aviation Data loaded******
    console.log("aviationData: ", aviationData);

    //////////////////////Have data ///////////////////////////////////////////////////////////
     // Repeat Linear functions from above retrieval
     var xLinearScale = xScale(aviationData, chosenXAxis);
     var yLinearScale = yScale(aviationData, chosenYAxis);
     var chosenairport = xScale(aviationData, chosenairport);

     // ==========Create Axis
     var bottomAxis = d3.axisBottom(xLinearScale);
     var leftAxis = d3.axisLeft(yLinearScale);

     // =============Append x and y plus the circles (scatterplot)
     var xAxis = chartGroup.append("g")
         .attr("transform", `translate(0, ${height})`)
         .call(bottomAxis);

    var yAxis = chartGroup.append("g")
         .call(leftAxis);

     // ===========Circles created on chart
     var circleGroup = chartGroup.selectAll("g circle")
         .data(aviationData)
         .enter()
         .append("g");
 
     var placeCircle = circleGroup.append("circle")
         .attr("cx", d => xLinearScale(d[chosenXAxis]))
         .attr("cy", d => yLinearScale(d[chosenYAxis]))
         .attr("r", 10)
         .attr("fill", "orange")
         .attr("opacity", ".5");
        
     // Creat group for two x-axis labels and one y-axis
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var airportlabel1 = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "atl_rank")
        .classed("active", true)
        .text("");

    var airportlabel2 = labelsGroup.append("text")
        .attr("x",0)
        .attr("y", 40)
        .attr("value", "lax_rank")
        .classed("inactive", true)
        .text("");

    var ylabelsGroup = chartGroup.append("g");

    var depart1 = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", 0 - (height / 2))
        .attr("value", "departure_count_atl")
        .classed("active", true)
        .text("Departure Airport Count ATL");
    
    var depart2 = ylabelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -60)
        .attr("x", 0 - (height / 2))
        .attr("value", "departure_count_lax")
        .classed("inactive", true)
        .text("Departure Airport Count LAX");
    //////////////////////////////////////////////////////////////////////////////////////////////
        
    var circleGroup = updateToolTip(circleGroup, chosenXAxis, chosenYAxis);

     labelsGroup.selectAll("text").on("click", function() {
         var value = d3.select(this).attr("value");

         if (value !== chosenXAxis) {
         chosenXAxis = value;
         }

     xLinearScale = xScale(aviationData, chosenXAxis);
     xAxis = renderXAxes(xLinearScale, xAxis);
     placeCircle = renderXCircles(placeCircle, xLinearScale, chosenXAxis);
     circleGroup = updateToolTip(circleGroup, chosenXAxis, chosenYAxis);

        //Changes classes to change bold text
        if (chosenXAxis === "atl_rank") {
            airportlabel1
                .classed("active", true)
                .classed("inactive", false);
            airportlabel2
                .classed("active", false)
                .classed("inactive", true);
        }
        else  {
            airportlabel1
                .classed("active", false)
                .classed("inactive", true);
            airportlabel2
                .classed("active", true)
                .classed("inactive", false);
        }
        
    })
            
    // y axis labels event listener
    ylabelsGroup.selectAll("text").on("click", function() {
        var value = d3.select(this).attr("value");

        if (value !== chosenYAxis) {
            chosenYAxis = value;
        }

    yLinearScale = yScale(aviationData, chosenYAxis);
    yAxis = renderYAxes(yLinearScale, yAxis);
    placeCircle = renderYCircles(placeCircle, yLinearScale, chosenYAxis);
    circleGroup = updateToolTip(circleGroup, chosenXAxis, chosenYAxis);

        //Changes classes to change bold text
        if (chosenYAxis === "departure_count_atl") {
            depart1
                .classed("active", true)
                .classed("inactive", false);
            depart2
                .classed("active", false)
                .classed("inactive", true);
        }
        else {
            depart1
                .classed("active", false)
                .classed("inactive", true);
            depart2
                .classed("active", true)
                .classed("inactive", false)
        } 

    })    
    })
    .catch(function(error) {
            console.log(error);
    }); 
};   
