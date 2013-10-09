define("Chartmaster", ['underscore'], function (_) {

  function Chartmaster() {

    var cm = this;

    this.clearElements = function(selector) {
      d3.select(selector).selectAll(".glyphicon").remove();
      d3.select(selector).selectAll("svg").remove();
      d3.select(selector).selectAll("text").remove();
    }

    this.appendTitle = function(selector, title) {
        var outer = d3.select(selector)
        .select(".thumb");
      outer
        .append("text")
        .text(title)
        .attr("class", "chart-title");
    }

    this.addScalingSVG = function(selection) {
      return   selection
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0,0,100,100")
    }

    this.barChart = function (values, selector) {

      cm.clearElements(selector);
    	
      var numValues = values.length;

      var scale = d3.scale.linear()
        .domain([_.min(values), _.max(values)])
        .range([0, 100]);

      var eachWidth = (50 / numValues) + 0;

      var frame = d3.select(selector)
        .select(".frame");

      cm.addScalingSVG(frame)
       // .attr("shape-rendering", "crispEdges")
        .selectAll("rect")
        .data(values)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
          var x = 100 / numValues;
          return(i * x);
        })
        .attr("y", function (d) {
          return(100 - scale(d));
        })
        .attr("width", eachWidth)
        .attr("height", function (d) {
          return scale(d);
        })
        .attr("fill", function (d) {

          return "rgb(0, 0, 255)";
        })

      cm.appendTitle(selector, "Value over Time")
    }

    this.stackedChart = function (stats, selector) {

      cm.clearElements(selector);

      var values = stats.values;
      var startingVal = stats.startingValue;

      console.log("Lineplot...",stats)
      
      var numValues = values.length;

      var scale = d3.scale.linear()
        .domain([0, _.max(values)])
        .range([0, 100]);

      var eachWidth = (50 / numValues) + 0;

      var frame = d3.select(selector)
        .select(".frame");

      var svg = cm.addScalingSVG(frame);
     /*
      svg.selectAll("rect")
        .data(values)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
          var x = 100 / numValues;
          return(i * x);
        })
        .attr("y", function (d) {
          return(100 - startingVal / d * 100);
        })
        .attr("width", eachWidth)
        .attr("height", function (d) {
          return startingVal / d * 100;
        })
        .attr("fill", function (d) {

          return "purple";
        })*/

     svg
      .selectAll("rect")
      .data(values)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
          var x = 100 / numValues;
          return(i * x);
        })
          .attr("y", function (d, i) {
          return(100 - scale(i * stats.recurringPayment));
        })
      .attr("width", eachWidth)
      .attr("height", function (d, i) {
          return scale(i * stats.recurringPayment);
       })
      .attr("fill", function (d) {

          return "green";
        })

      cm.appendTitle(selector, "Value over Time")
    }

    this.donut = function (values, selector) {

     cm.clearElements(selector);

     // console.log('Vlaues?',values)
      values [1] -= values[0];
      values [1] -= values[2];

      var scaleRads = d3.scale.linear()
        .domain([0, 100])
        .range([0, 2 * Math.PI]);

      var scale = d3.scale.linear()
        //.domain([0, values[1]])
        .domain([0, _.total(values)])
        .range([0, 100]);

      var colors = ['orange', 'green', 'teal', 'yellow'];
      var keys = ['init','interest','payment']
      var names = ['Initial','Interest','Increments'];

      var data = _.map(values, function (value, i) {

        var r = {};
        r.color = colors[i];
        if(i == 0) {
          r.startPercent = 0;
        } else {

          var allPreviousValues = _.chain(values)
            .first(i)
            .total()
            .value();

          r.startPercent = scale(allPreviousValues);
        }

        r.sizePercent = scale(value);
        r.start = scaleRads(r.startPercent);
        r.size = scaleRads(r.sizePercent);
        r.key = keys[i];
        r.name = names[i];

        return r;
      })

      var arc = d3.svg.arc()
        .innerRadius(20)
        .outerRadius(45)
        .startAngle(function (d, i) {
          return d.start;
        })
        .endAngle(function (d, i) {
          return d.start + d.size;
        });

      var frame = d3.select(selector)
        .select(".frame");

      var chart = cm.addScalingSVG(frame)
        .append("svg:g")
        .attr("transform", "translate(50,50)")

      chart.selectAll("path")
        .data(data)
        .enter()
        .append("svg:path")
        .style("fill", function (d, i) {
          return d.color;
        })
        .attr("d", arc)


      chart.selectAll("g.arc")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "show-on-hover")
        .attr("transform", function(d) { 
          return "translate(" + arc.centroid(d) + ")"; 
        })
        .style("font","5px Arial")
        .attr("text-anchor", "middle")
        .text(function(d) { if (d.size == 0) return ''; return d.name; });
    
        cm.appendTitle(selector, "Contributions vs. Interest")
      }

  }
  return new Chartmaster();

})