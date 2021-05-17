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
    var svgHeight = 600;
    var svgWidth = 960;
    var margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100
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
        .attr("height", svgHeight + 30);

    // ===========Append SVG group
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

 
    var chosenXAxis = 'selection1';
    var chosenYAxis = "dep_airport";

    // ==========xScale and yScale

    function xScale(aviationData, chosenXAxis) { 
        var xLinearScale = d3.scaleBand()
            .rangeRound([0, width]).padding(1)
            .domain(0, aviationData.map[chosenXAxis]);

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

    
     // ==========Text  for circles   
     function renderXText(circleGroup, newXScale, chosenXAxis) {
        circleGroup.transition()
        .duration(1000)
        .attr("dx", d => newXScale(d[chosenXAxis]));
    
        return circleGroup;
    }
    
    function renderYText(circleGroup, newYScale, chosenYAxis) {
        circleGroup.transition()
        .duration(1000)
        .attr("dy", d => newYScale(d[chosenYAxis]));
    
        return circleGroup;
    }

   // =================Update Tooltips - labels and tip
   function updateToolTip(circleGroup, chosenXAxis, chosenYAxis) {
    var xlabel = "";
    if (chosenXAxis === "arr_airport") {
        xlabel = "Arrival Airport: ";
    }
    else if (chosenXAxis === "dep_airport") {
        xlabel = "Departure Airport: ";
    }

    var ylabel = "";
    if(chosenYAxis === "count") {
        ylabel = "Depart Airport Count: ";
    }
    else if (chosenYAxis === "count") {
        ylabel = "Arrive Airport Count: ";
    }    

        // ==============Update tool function
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([80, -60])
            .html(function(d) {
                return(`${d.airport}<br>${xlabel}${d[chosenXAxis]}<br>${ylabel}${d[chosenYAxis]}`)
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

    // =================================================================================
    // ===============Retrieving data & Parse data======================================
    d3.csv("./assets/data/depart_count.csv").then(function(aviationData, err) {
        if (err) throw err;

        aviationData.forEach(function(data) {
            data.count = +data.count;
        });

        // ******Testing Aviation Data loaded******
        console.log("aviationData: ", aviationData);

        // Repeat Linear functions from above retrieval
        var xLinearScale = xScale(aviationData, chosenXAxis);
        var yLinearScale = yScale(aviationData, chosenYAxis);
       

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
            .attr("r", 20)
            .attr("fill", "orange")
            .attr("opacity", ".5")
                
        // =============Add labels circles (scatterplot)
        var circleText = circleGroup.append("text")
            .text(d => d.dep_airport_iata)
            .attr("dx", d => xLinearScale(d[chosenXAxis]))
            .attr("dy", d=> yLinearScale(d[chosenYAxis]))
            .attr("font-size", "11px")
            .attr("fill", "black")
            .attr("text-anchor", "middle");

        // Creat group for two x-axis labels
        var labelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 20})`);

        var airportlabel1 = labelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "ATL")
            .classed("active", true)
            .text("Atlanta International Airport");
        
        var airportlabel2 = labelsGroup.append("text")
            .attr("x",0)
            .attr("y", 40)
            .attr("value", "LAX")
            .classed("inactive", true)
            .text(" Los Angeles International Airport");

        // Create group for two y-axis labels
        var ylabelsGroup = chartGroup.append("g");

        var arrivallabel = ylabelsGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -40)
            .attr("x", 0 - (height / 2))
            .attr("value", "arr_airport")
            .classed("active", true)
            .text("Arrival Airport");
        
        var departurelabel = ylabelsGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -60)
            .attr("x", 0 - (height / 2))
            .attr("value", "dep_airport")
            .classed("inactive", true)
            .text("Departure Airport");     

        var circleGroup = updateToolTip(circleGroup, chosenXAxis, chosenYAxis);

        //x axis labels event listener
        labelsGroup.selectAll("text").on("click", function() {
            var value = d3.select(this).attr("value");

            if (value !== chosenXAxis) {
            chosenXAxis = value;
            }

            xLinearScale = xScale(aviationData, chosenXAxis);
            xAxis = renderXAxes(xLinearScale, xAxis);
            placeCircle = renderXCircles(placeCircle, xLinearScale, chosenXAxis);
            circleText = renderXText(circleText, xLinearScale, chosenXAxis);
            circleGroup = updateToolTip(circleGroup, chosenXAxis, chosenYAxis);

            //Changes classes to change bold text
            if (chosenXAxis === "ATL") {
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
                    .classed("active", false)
                    .classed("inactive", true);
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
            circleText = renderYText(circleText, yLinearScale, chosenYAxis);
            circleGroup = updateToolTip(circleGroup, chosenXAxis, chosenYAxis);

             //Changes classes to change bold text
             if (chosenYAxis === "Dep_airport") {
                departurelabel
                    .classed("active", true)
                    .classed("inactive", false);
                arrivallabel
                    .classed("active", false)
                    .classed("inactive", true);
                 }
            else  {
                departurelabel
                    .classed("active", false)
                    .classed("inactive", true);
                arrivallabel
                    .classed("active", true)
                    .classed("inactive", false);
                }
            })    
        }).catch(function(error) {
            console.log(error);
    }); 
};   
