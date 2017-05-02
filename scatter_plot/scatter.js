
// http://bl.ocks.org/peterssonjonas/4a0e7cb8d23231243e0e

var margin = { top: 50, right: 150, bottom: 50, left: 50 },
    outerWidth = 900 //1050
    outerHeight = 500,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var currentSearchTerm = "";
// var currentSearchTerm = "";

var x = d3.scale.linear()
    .range([0, width]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();

var color = d3.scale.linear().range(["#b9e3ea", "#07a5c1"])

var xCat = "critic_score",
    yCat = "imdb_score",
    rCat = "Winner",
    colorCat = "budget",
    award = "Award",
    dir = "Diretor_name"
    mov = "Movie_name"


  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-height);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(-width);

    

  // var color = d3.scale.category10();
  d3.csv("awardmovies.csv", function(data) {
  data.forEach(function(d) {
    d.critic_score = +d.critic_score;
    d.imdb_score = +d.imdb_score;
    d.Winner = +d.Winner;
    d.Award = +d.Award;
    d.Movie_name = d.Movie_name;
    d.Movie_url = d.Movie_url;
    d.Plot_summary = d.Plot_summary;
    d.Diretor_name = d.Diretor_name;
    d.actor1_name = d.actor1_name;
    d.actor2_name = d.actor2_name;
    d.actor3_name = d.actor3_name;
    d.actor4_name = d.actor4_name;
    d.Year = d.Year;
    d.budget = +d.budget;
    d.gross = +d.gross;


  });
var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.05,
      xMin = d3.min(data, function(d) { return d[xCat]; }),
      xMin = xMin > 0 ? 0 : xMin,
      yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.05,
      yMin = d3.min(data, function(d) { return d[yCat]; }),
      yMin = yMin > 0 ? 0 : yMin,
      colMax = d3.max(data, function(d) { return d[colorCat]; }),
      colMin = d3.min(data, function(d) { return d[colorCat]; })
      // colMin = colMin > 0 ? 0 : colMin;

  x.domain([xMin, xMax]);
  y.domain([yMin, yMax]);
  // color.domain(d3.extent(data, function(d) { return d.budget; })).nice();
  color.domain([colMin, colMax]);

  
  

  var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        return "Movie: "+ d[mov]+ "<br>" + "<img src="+ "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_UY317_CR18,0,214,317_AL_.jpg" 
        + "height=" + "\"42\"" + "  width="+ "\"42\""+">"

        +"<br>"+"Critic Score: " + d[xCat] + "<br>" + "IMDB Score : " 
        + d[yCat] +  "<br>" + "Director: " + d[dir]+  "<br>" + "Budget: " + d[colorCat] + "<br>" + "Wins: " + d.Winner ;
      });

  var zoomBeh = d3.behavior.zoom()
      .x(x)
      .y(y)
      .scaleExtent([0, 500])
      .on("zoom", zoom);

  var svg = d3.select("#scatter")
    .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoomBeh);

  svg.call(tip);

  svg.append("rect")
      .attr("width", width)
      .attr("height", height);

  // var svg = d3.select("#image")
  // .on("mouseover", tip.show)
    

  // rollover = svg.html(function(d) {
  //       return "Movie: "+ d[mov]+ "<br>" + "<img src="+ "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_UY317_CR18,0,214,317_AL_.jpg" 
  //       + "height=" + "\"42\"" + "  width="+ "\"42\""+">"

  //       +"<br>"+"Critic Score: " + d[xCat] + "<br>" + "IMDB Score : " 
  //       + d[yCat] +  "<br>" + "Director: " + d[dir]+  "<br>" + "Budget: " + d[colorCat] + "<br>" + "Wins: " + d.Winner ;
  //     });

   // append("img")
    // .attr("src", )
      // .attr("height", outerHeight)
      


 // var svg1 = d3.select("#scatter")
 //    .append("svg")
 //      .attr("width", outerWidth)
 //      .attr("height", outerHeight)


// svg1.append("div")
//       .attr("width", 200)
//       .attr("height", 300)
//       .style("float", "right")
//       .append("img")
//       .attr("src", "https://images-na.ssl-images-amazon.com/images/M/MV5BMTcxOTUwMDI0OF5BMl5BanBnXkFtZTcwNjIyNzkzNw@@._V1_UX214_CR0,0,214,317_AL_.jpg")
//       .attr("height", 42)

//       .attr("width", 42)



  svg.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .classed("label", true)
      .attr("x", width)
      .attr("y", margin.bottom - 10)
      .style("text-anchor", "end")
      .text(xCat);

  svg.append("g")
      .classed("y axis", true)
      .call(yAxis)
    .append("text")
      .classed("label", true)
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(yCat);

  var objects = svg.append("svg")
      .classed("objects", true)
      .attr("width", width)
      .attr("height", height);

  objects.append("svg:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0)
      .attr("transform", "translate(0," + height + ")");

  objects.append("svg:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);

  objects.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .classed("dot", true)
      // .attr("r", function (d) { return 6 * Math.sqrt(d[rCat] / Math.PI); })
      .attr("r", function(d) { if (d.Winner == 0) { return 3; }  else { return (6 * Math.sqrt(d[rCat] / Math.PI)) + 2; } })
      // .attr("cx", function(d) { return x(d.critic_score); })
      // .attr("cy", function(d) { return y(d.imdb_score); })
      // else if ((d.Winner == 1)){ return 4; }
      .attr("transform", transform)
      .style("fill", function(d) { return color(d[colorCat]); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

  // svg.selectAll(".dot")
  //     .data(data)
  //   .enter().append("circle")
  //     .attr("class", "dot")
  //     .attr("r", function(d) { if (d.Winner == 0) { return 3; } else if ((d.Winner == 1)){ return 4; } else { return d.Winner*2;} })
  //      // .attr("r", function (d) { return 6 * Math.sqrt(d[rCat] / Math.PI); })
  //     .attr("cx", function(d) { return x(d.critic_score); })
  //     .attr("cy", function(d) { return y(d.imdb_score); })
  //     .style("fill", function(d) { return color(d.budget); })
  //     .on("mouseover", tip.show)
  //     .on("mouseout", tip.hide);


var legendMargin = { top: 20, bottom: 20, left: 5, right: 20 };

var legendFullWidth = 50;

var legendWidth = legendFullWidth - legendMargin.left - legendMargin.right;


  var legend = svg.selectAll(".legend")
  // .attr('width', width)
  //       .attr('height', height)
      .data(color.domain())
    .enter()
    .append("g")
      .classed("legend", true)
      // .attr('transform', 'translate(' + legendMargin.left + ',' +
      //   legendMargin.top + ')')
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // legend.append("circle")
  //     .attr("r", 3.5)
  //     .attr("cx", width + 20)
  //     .attr("fill", color);

  legend.append("text")
      .attr("x", width + 56)
      .attr("y",  5)
      .attr("dy", ".35em")
      .text(function(d) { return d; });

      legend.append("rect")
      .attr("x", width + 26)
      .attr("width", 20)
      .attr("height", height - 350)
      .style("fill", "url(#linear-gradient)");


       // create a scale and axis for the legend
        // var legendScale = d3.scale.linear()
        //     .domain([-3, 3])
        //     .range([height - 23, 0]);

        // var legendAxis = d3.svg.axis()
        //     .scale(legendScale)
        //     .orient("right")
        //     .tickValues(d3.range(-3, 4))
        //     .tickFormat(d3.format("d"));

        // legend.append("g")
        //     .attr("class", "legend axis")
        //     .attr("transform", "translate(" + legendWidth + ", 0)")
        //     .call(legendAxis);
    // }


  // d3.select("input").on("click", change);

  // function change() {
  //   xCat = "Carbs";
  //   xMax = d3.max(data, function(d) { return d[xCat]; });
  //   xMin = d3.min(data, function(d) { return d[xCat]; });

  //   zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

  //   var svg = d3.select("#scatter").transition();

  //   svg.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat);

  //   objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
  // }

  function zoom() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    svg.selectAll(".dot")
        .attr("transform", transform);
  }

  function transform(d) {
    return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
  }
  var defs = svg.append("defs");

  //Append a linearGradient element to the defs and give it a unique id
  var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");

    linearGradient
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");


// range(["#e5e5ff", "#0000ff"])  "#b9e3ea", "#07a5c1"

//Set the color for the start (0%)
   linearGradient.append("stop") 
    .attr("offset", "0%")   
    .attr("stop-color", "#b9e3ea"); //light blue

//Set the color for the end (100%)  
    linearGradient.append("stop") 
    .attr("offset", "100%")   
    .attr("stop-color", "#07a5c1"); //dark blue

    //Draw the rectangle and fill with gradient
// svg.append("rect")
//   .attr("width", 300)
//   .attr("height", 20)
//   .style("fill", "url(#linear-gradient)");

});

// http://stackoverflow.com/questions/28922246/dynamic-filtering-in-d3-with-html-input
function handleClick(event){
  currentSearchTerm = document.getElementById("myVal").value;
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}

function actorClick(event){
  currentSearchTerm = document.getElementById("myVal2").value;
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}

function DirectorClick(event){
  currentSearchTerm = document.getElementById("myVal3").value;
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}

function GenreClick(event){
  currentSearchTerm = document.getElementById("myVal4").value;
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}


function Adventure(event){
  currentSearchTerm = 'Adventure'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return 'Adventure';
}

function Comedy(event){
  currentSearchTerm = 'Comedy'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}

function Bio( event){
  currentSearchTerm = 'Biography'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}

function Action( event){
  currentSearchTerm = 'Action'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}

function Crime( event){
  currentSearchTerm = 'Crime'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}
function Drama( event){
  currentSearchTerm = 'Drama'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}
function History( event){
  currentSearchTerm = 'History'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}
function Music( event){
  currentSearchTerm = 'Music'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}
function Mystery( event){
  currentSearchTerm = 'Mystery'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}
function Rom( event){
  currentSearchTerm = 'Romance'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}

function Sport( event){
  currentSearchTerm = 'Sport'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}

function Thrill( event){
  currentSearchTerm = 'Thriller'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}

function West( event){
  currentSearchTerm = 'Western'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}

function War( event){
  currentSearchTerm = 'War'
    console.log(currentSearchTerm);
    draw(currentSearchTerm);
return false;
}

function Reset( event){
  
    reset();
return false;
}

var valOpacity = function(d) { 
      if ((d.Movie_name.search(currentSearchTerm) != -1) || (d.actor1_name.search(currentSearchTerm) != -1) 
       || (d.actor2_name.search(currentSearchTerm) != -1) || (d.actor3_name.search(currentSearchTerm) != -1)
         || (d.actor4_name.search(currentSearchTerm) != -1) || (d.Diretor_name.search(currentSearchTerm) != -1) 
        || (d.genres.search(currentSearchTerm) != -1) 



         )  {
        console.log(1);
        return 1;
      }
      else {
        return 0;
      }
    };

var valfill = function(d) { 
      if ((d.Movie_name.search(currentSearchTerm) != -1) || (d.actor1_name.search(currentSearchTerm) != -1) 
       || (d.actor2_name.search(currentSearchTerm) != -1) || (d.actor3_name.search(currentSearchTerm) != -1)
         || (d.actor4_name.search(currentSearchTerm) != -1) || (d.Diretor_name.search(currentSearchTerm) != -1) 
        || (d.genres.search(currentSearchTerm) != -1) 



         )  {
        console.log(1);
        return 1;
      }
      else {
        return 0;
      }
    };

var valborder = function(d) { 
      if ((d.Movie_name.search(currentSearchTerm) != -1) || (d.actor1_name.search(currentSearchTerm) != -1) 
        || (d.actor2_name.search(currentSearchTerm) != -1) || (d.actor3_name.search(currentSearchTerm) != -1)  
        || (d.actor4_name.search(currentSearchTerm) != -1) ||  (d.Diretor_name.search(currentSearchTerm) != -1) 
        || (d.genres.search(currentSearchTerm) != -1) 

        ){
        console.log(2);
        return 'black';
      }
      // else {
      //   return 'red';
      // }
    };
function draw(){
    d3.select("body").selectAll("circle.dot").style("opacity", valOpacity).style("stroke", valborder);
};


function reset(){
    d3.select("body").selectAll("circle.dot").style("fill", function(d) { return color(d[colorCat]); }).style("opacity", 0.9).style("stroke", 'None')
};


