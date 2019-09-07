var margin = {top: 10, right: 50, bottom: 20, left: 50};

var widther = window.outerWidth;

var width = widther - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

//Appends the svg to the chart-container div
var svg = d3.select(".g-chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Creates the xScale 
var xScale = d3.scale.linear()
  .range([0,width]);

//Creates the yScale
var y0 = d3.scale.ordinal()
  .rangeBands([height, 0], 0.2)
  .domain(["NW Plains W","NW Plains E","NW Slopes N","NW Slopes S","N Tablelands N","CW Plains S","CW Plains N","CW Slopes N","CW Slopes S","C Tablelands N","C Tablelands S","Riverina W","Riverina E","SW Slopes N","SW Slopes S"]);

//Defines the y axis styles
var yAxis = d3.svg.axis()
  .scale(y0)
  .orient("left");

//Defines the y axis styles
var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .tickFormat(function(d) {return d; })
  .tickSize(height)
  .ticks(numTicks(width)); 

//Loads the data
d3.csv("././NSWCropRainfall.csv", ready);

function ready(err, data) {

  if (err) throw "error loading data";
  console.log("Sorry, Failed to load data. Try again!");

  //FORMAT data
  data.forEach(function(d) {
    d.num = +d.num;
  });

  console.log(data);

  //Appends chart headline
  d3.select(".g-hed").text("NSW Crop Areas Rainfall");

  //Appends chart intro text
  d3.select(".g-intro").text("For many regions, the graph confirms the reduction in rainfall.");

  //Sets the max for the xScale
  var maxX = d3.max(data, function(d) { return d.num; });

  //Defines the xScale max
  xScale.domain([0, maxX ]);

  //Appends the y axis
  var yAxisGroup = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  //Appends the x axis    
  var xAxisGroup = svg.append("g")
    .attr("class", "x axis")
    .call(xAxis); 

  //Binds the data to the bars      
  var categoryGroup = svg.selectAll(".g-category-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "g-category-group")
    .attr("transform", function(d) {
      return "translate(0," + y0(d.category) + ")";
    });

  //Appends first bar   
  var bars = categoryGroup.append("rect")
    .attr("width", function(d) { return xScale(d.year2015); })
    .attr("height", y0.rangeBand()/2.5 )
    .attr("class", "g-num")
    .attr("transform", "translate(0,4)");

  //Appends second bar   
  var bars2 = categoryGroup.append("rect")
    .attr("width", function(d) { return xScale(d.year2018); })
    .attr("height", y0.rangeBand()/2.5 )
    .attr("class", "g-num2")
    .attr("transform", "translate(0,29)");  
  
  //Binds data to labels
  var labelGroup = svg.selectAll("g-num")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "g-label-group")
    .attr("transform", function(d) {
      return "translate(0," + y0(d.category) + ")";
    });

  //Appends first bar labels   
  var barLabels = labelGroup.append("text") 
    .text(function(d) {return  d.year2015;})
    .attr("x", function(d) { return xScale(d.year2015) - 20; })
    .attr("y", y0.rangeBand()/2.65 )
    .attr("class", "g-labels");    

  //Appends second bar labels   
  var barLabels2 = labelGroup.append("text") 
    .text(function(d) {return  d.year2018;})
    .attr("x", function(d) { return xScale(d.year2018) - 20; })
    .attr("y", y0.rangeBand()/1.25 )
    .attr("class", "g-labels");      

  //Appends chart source
  d3.select(".g-source-bold")
    .text("SOURCE: ")
    .attr("class", "g-source-bold");

  d3.select(".g-source-reg")
    .text("Chart source info goes here")
    .attr("class", "g-source-reg");  

      
  //RESPONSIVENESS
  d3.select(window).on("resize", resized);

  function resized() {

    //new margin
    var newMargin = {top: 10, right: 80, bottom: 20, left: 50};

    //Get the width of the window
    var w = d3.select(".g-chart").node().clientWidth;
    console.log("resized", w);

    //Change the width of the svg
    d3.select("svg")
      .attr("width", w);

    //Change the xScale
    xScale
      .range([0, w - newMargin.right]);

    //Update the bars
    bars
      .attr("width", function(d) { return xScale(d.year2015); });

    //Update the second bars
    bars2
      .attr("width", function(d) { return xScale(d.year2018); });  

    //Updates bar labels
    barLabels
      .attr("x", function(d) { return xScale(d.year2015) - 20; })
      .attr("y", y0.rangeBand()/2.65 )

    //Updates second bar labels
    barLabels2
      .attr("x", function(d) { return xScale(d.year2018) - 20; })
      .attr("y", y0.rangeBand()/1.25 )  

    //Updates xAxis
    xAxisGroup
      .call(xAxis);   

    //Updates ticks
    xAxis
      .scale(xScale)
      .ticks(numTicks(w));

  };

}

//Determines number of ticks base on width
function numTicks(widther) {
  if (widther <= 400) {
    return 4
    console.log("return 4")
  }
  else {
    return 15
    console.log("return 15")
  }
}