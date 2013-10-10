define(['underscore'], function (_) {

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

    this.barChart = function (stats, selector) {

      cm.clearElements(selector);

      var values = stats.values;

      var numValues = values.length;

      var scale = d3.scale.linear()
        .domain([0, stats.finalValue])
        .range([0, 100]);

      var eachWidth = (50 / numValues) + 0;

      var frame = d3.select(selector)
        .select(".frame");

      cm.addScalingSVG(frame)
      
        .selectAll("rect")
        .data(values)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
          var x = 100 / numValues;
          return(i * x);
        })
        .attr("y", function (d) {
          return(100 - scale(d.total));
        })
        .attr("width", eachWidth)
        .attr("height", function (d) {
          return scale(d.total);
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

    //  console.log("Lineplot...",stats)
      
      var numValues = values.length;

      var scale = d3.scale.linear()
        .domain([0, stats.finalValue])
        .range([0, 100]);

      var eachWidth = (50 / numValues) + 0;

      var frame = d3.select(selector)
        .select(".frame");

      var svg = cm.addScalingSVG(frame);

     
      svg.selectAll("rect.y")
        .data(values)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
          var x = 100 / numValues;
          return(i * x);
        })
        .attr("y", function (d) {
          return(100 -scale(startingVal));
        })
        .attr("width", eachWidth)
        .attr("height", function (d) {
          return scale(startingVal);
        })
        .attr("fill", function (d) {
          return "blue";
        })

     svg.selectAll("rect.r")
      .data(values)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
          var x = 100 / numValues;
          return(i * x);
        })
          .attr("y", function (d, i) {
          return(100 - scale(i * stats.recurringPayment) - scale(startingVal));
        })
      .attr("width", eachWidth)
      .attr("height", function (d, i) {
          return scale(i * stats.recurringPayment);
       })
      .attr("fill", function (d) {

          return "orange";
        })

      function getTotalInterest (values, i) {
        return _.chain(values)
                 .first(i)
                 .pluck('interestPaid')
                 .total()
                 .value();
      }


     svg.selectAll("rect.m")
      .data(values)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
          var x = 100 / numValues;
          return(i * x);
        })
          .attr("y", function (d, i) {
            var totalInterestPaid = getTotalInterest(values, i);
          return(100 - scale(i * stats.recurringPayment) - scale(startingVal) - scale(totalInterestPaid));
          return 0;
        })
      .attr("width", eachWidth)
      .attr("height", function (d, i) {

        var totalInterestPaid = getTotalInterest(values, i);

         //   console.log('Total interested Paid?', totalInterestPaid);
            return scale(totalInterestPaid);
       })
      .attr("fill", function (d) {

          return "teal";
        })


    

      cm.appendTitle(selector, "Stacked Values")
    }

    this.donut = function (stats, selector) {

      var startingVal = stats.startingValue;
      var finalVal = stats.finalValue;
      var totalRecurring = stats.recurringPayment * stats.numMonths;
      
      cm.clearElements(selector);

      finalVal -= startingVal;
      finalVal -= totalRecurring;

      var values = [startingVal,finalVal,totalRecurring]

      var scaleRads = d3.scale.linear()
        .domain([0, 100])
        .range([0, 2 * Math.PI]);

      var scale = d3.scale.linear()
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

/*
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
  */  
        cm.appendTitle(selector, "Contributions vs. Interest")
      }

  }
  return new Chartmaster();

})