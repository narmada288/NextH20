d3.csv("././recycledSchemes.csv",
function(d){
    return { value : d.Provider }
},
function (data){
    var x= d3.select("#schemeId")
    .append("option")
    .attr("value", function(d){return d.value;})
    .text(function(d){
    return d.value;})
})
