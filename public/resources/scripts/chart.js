
// ch

// *********************** Init function

var city_ff_grades_by_time_window;

function init(cityName) {

    window.city = cityName;
    d3.csv('resources/data/'+ city + '/d3-chart.csv', function(csv) {
      city_ff_grades_by_time_window = csv;

      visualize();

    })
};

// *********************** visualize function -- callback for the loaded rows

function visualize() {

    prepData();

    makeVis();

}

// *********************** prepData function to parse the times

function prepData() {

    // FOR PARSING TIMES
    var parseTime = d3.time.format('%H:%M:%S').parse;

    // Parse the times
    city_ff_grades_by_time_window.forEach(function(time_window) {
        time_window['time'] = parseTime(time_window['time']);
        time_window['startTime'] = eval(time_window['']);
    });

}

// *********************** makeVis function... to build the visualization

function makeVis() {

    $('#chartContainer').empty()

    // MARGINS
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        full_width = $('#chartContainer').width(),
        full_height = 200,
        width = full_width - margin.left - margin.right,
        height = full_height - margin.top - margin.bottom;

    // AXIS SCALES
    var x = d3.time.scale().range([0, width]),
        y = d3.scale.linear().range([height, 0]);

    // AXES
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom')
        .tickFormat(function(d) { return timeFormatting(d); })
        // .ticks(10);
        .ticks(d3.time.minutes, 30);

    var yAxis = d3.svg.axis()
        .scale(y)
        .tickValues([0, 1, 2, 4, 8, 16])
        .tickFormat(function(d) { return numberToLOSGrade(d); })
        .orient('left')
        .ticks(6);

    // LINES

    var cap_grade = d3.svg.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.cap_grade); });

    var delay_grade = d3.svg.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.delay_grade); });

    var speed_grade = d3.svg.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.speed_grade); });

    var overall_grade = d3.svg.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.overall_grade_avg_of_avgs); });

    // SETTING UP THE SVG ELEMENTS

    var svg = d3.select('#chartContainer')
        .append('svg')
            .attr('id', 'svg')
            .attr('height', full_height)
            .attr('width', full_width)
        .append('g')
            .attr('id', 'svgg')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Scale the range of the data
    x.domain(d3.extent(city_ff_grades_by_time_window, function(d) { return d.time; }));
    y.domain([0, 16]);

    var borderPath = svg.append('rect')
        .attr('height', height)
        .attr('width', width)
        .style('stroke', 'gray')
        .style('fill', 'none')
        .style('stroke-width', '2');

    if (window.city !== 'zurich') {
        // zurich has no capacity

        // Add the cap grade path
        svg.append('path')
            .attr('id', 'cap')
            .attr('class', 'cap_grade')
            .attr('d', cap_grade(city_ff_grades_by_time_window));  
        
    }

    // Add the delay grade path
    svg.append('path') 
        .attr('id', 'delay')
        .attr('class', 'speed_grade')
        .attr('d', speed_grade(city_ff_grades_by_time_window));    

    // Add the speed grade path
    svg.append('path')
        .attr('id', 'speed')
        .attr('class', 'delay_grade')
        .attr('d', delay_grade(city_ff_grades_by_time_window));    

    // Add the overall grade path
    svg.append('path')
        .attr('id', 'overall')
        .attr('class', 'overall_grade')
        .attr('d', overall_grade(city_ff_grades_by_time_window));

    // Add the x axis
    svg.append('g')
        .attr('id', 'xAxis')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    // Add x axis label
    // svg.append('text')
    //     .attr('y', height + margin.bottom)
    //     .attr('x', width / 2)
    //     .style('text-anchor', 'middle')
    //     .text('Time');

    // Add the y axis
    svg.append('g')
        .attr('id', 'yAxis')
        .attr('class', 'y axis')
        .call(yAxis);

    // Add y axis label
    /*
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Frustration Index');
    */

    makeAveragePointAtTime('06:00:00');

};

var debounce = function(fn, timeout) 
{
  var timeoutID = -1;
  return function() {
    if (timeoutID > -1) {
      window.clearTimeout(timeoutID);
    }
    timeoutID = window.setTimeout(fn, timeout);
  }
};

var debounced_draw = debounce(function() {
  makeVis();
}, 125);

$(window).resize(debounced_draw);


// *********************** numberToLOSGrade function

var numberToLOSGrade = function(number) {
    // Y AXIS LABELS MAP
    var yAxisLabels = {0:'A', 1:'B', 2:'C', 4:'D', 8:'E', 16:'F'};
    return yAxisLabels[number];
}

// *********************** timeFormatting function

var timeFormatting = function(time) {
    militaryTimeFormat = d3.time.format("%H:%M");
    militaryTimeMinute = d3.time.format("%M");
    date = new Date(time);

    if (militaryTimeMinute(date) === '30') {
        return(militaryTimeFormat(date));
    }
}

var makeAveragePointAtTime = function(time) {
    // make or move a point on the average

    city_ff_grades_by_time_window.forEach(function(herp) {
    });

}








