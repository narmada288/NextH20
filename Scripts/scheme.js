d3.csv("././recycledSchemes.csv",
function(d){
    return { sName : d.SchemeName, pName : d.Provider }
},
d3.select("#schemeId")
.data(data)
.enter()
.append("option")
.attr("value", function(d){return d;})
.text(function(d){
    return d.pName;
                    }))
