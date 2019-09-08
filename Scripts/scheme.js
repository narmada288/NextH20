d3.csv("././recycledSchemes.csv",
function(d){
    return { sName : d.SchemeName, pName : d.Provider }
},
function (data){
    var x= d3.select("#schemeId")
    .append("option")
    .attr("value", function(data){return data.sName;})
    .text(function(d){
    return data.pName;})
})
