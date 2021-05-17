  
// set the dimensions and margins of the graph

var margin = {top: 30, right: 30, bottom: 255, left: 60},
width = 1500 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform","translate(" + margin.left + "," + margin.top + ")");


// Initialize the X axis
var x = d3.scaleBand()
.range([ 0, width ])
.padding(.2);
var xAxis = svg.append("g")
.attr("transform", "translate(0," + height + ")");


// Initialize the Y axis
var y = d3.scaleLinear()
.range([ height, 0]);
var yAxis = svg.append("g")
.attr("class", "myYaxis")


// A function that create / update the plot for a given variable:
function update(selectedVar) {

// Parse the Data
d3.csv("../lax_atl_count.csv", function(data) {

// Add Chart title

svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")  
  .style("font-size", "16px")  
  .style("text-decoration", "underline")  
  .text("Flight Arrivals to Lax and ATL per Airport")  
  
  
  

// X axis
x.domain(data.map(function(d) { return d.departure_airport; }))
xAxis.transition().duration(1000).call(d3.axisBottom(x))
.selectAll("text")
.style("text-anchor", "end")
.attr("transform", "rotate(-65)")
.attr("dx", "-.8em")
.attr("dy", "-.15em")


// Add Y axis
y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
yAxis.transition().duration(1000).call(d3.axisLeft(y));

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x",0 - (height / 2))
.attr("dy", ".75em")
.style("text-anchor", "middle")
.text("Number of Flights"); 

// variable u: map data to existing bars
var u = svg.selectAll("rect")
  .data(data)

// update bars
u
  .enter()
  .append("rect")
  .merge(u)
  .transition()
  .duration(1000)
    .attr("x", function(d) { return x(d.departure_airport); })
    .attr("y", function(d) { return y(d[selectedVar]); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d[selectedVar]); })
    .attr("fill", "#69b3a2")
})

}

// Initialize plot
update('flight_count_atl')