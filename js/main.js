/**
 * UnitCircle Visualization
 * (c) 2014 Derrick Cohodas
 */
function UnitCircle() {

    var main = d3.select('body')
    var width = 960
      , height = 500
      , radius = 180
      , angleAliases = {}
       
       angleAliases[parseFloat(0).toFixed(2)] = ["0 or 2&pi;", "0&deg; or 360&deg;"]

       angleAliases[parseFloat(Math.PI/6).toFixed(2)] = "&pi;/6"
       angleAliases[parseFloat(Math.PI/4).toFixed(2)] = "&pi;/4"
       angleAliases[parseFloat(Math.PI/3).toFixed(2)] = "&pi;/3"

       angleAliases[parseFloat(Math.PI/2).toFixed(2)] = "&pi;/2"

       angleAliases[parseFloat(5*(Math.PI/6)).toFixed(2)] = "5&pi;/6"
       angleAliases[parseFloat(2*(Math.PI/3)).toFixed(2)] = "2&pi;/3"
       angleAliases[parseFloat(3*(Math.PI/4)).toFixed(2)] = "3&pi;/4"

       angleAliases[parseFloat(Math.PI).toFixed(2)] = "&pi;"

       angleAliases[parseFloat(7*(Math.PI/6)).toFixed(2)] = "7&pi;/6"
       angleAliases[parseFloat(4*(Math.PI/3)).toFixed(2)] = "4&pi;/3"
       angleAliases[parseFloat(5*(Math.PI/4)).toFixed(2)] = "5&pi;/4"

       angleAliases[parseFloat(3*(Math.PI/2)).toFixed(2)] = "3&pi;/2"

       angleAliases[parseFloat(11*(Math.PI/6)).toFixed(2)] = "11&pi;/6"
       angleAliases[parseFloat(5*(Math.PI/3)).toFixed(2)] = "5&pi;/3"
       angleAliases[parseFloat(7*(Math.PI/4)).toFixed(2)] = "7&pi;/4"

       console.dir(angleAliases)

/*
drawAngleMark(0)

    drawAngleMark((Math.PI/6))
    drawAngleMark((Math.PI/3))
    drawAngleMark((Math.PI/4))

    drawAngleMark(Math.PI/2)

    drawAngleMark(5*(Math.PI/6))
    drawAngleMark(2*(Math.PI/3))
    drawAngleMark(3*(Math.PI/4))
    
    drawAngleMark(Math.PI)

    drawAngleMark(7*(Math.PI/6))
    drawAngleMark(4*(Math.PI/3))
    drawAngleMark(5*(Math.PI/4))

    drawAngleMark(3*Math.PI/2)

    drawAngleMark(11*(Math.PI/6))
    drawAngleMark(5*(Math.PI/3))
    drawAngleMark(7*(Math.PI/4))

 */


    //Main group
    var svg = main.append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") scale(1, -1)")
      .on("mousedown", function() {
         console.log(d3.mouse(this))
      })
      //.attr("transform", "rotate(180deg)")

    //Axes and arrows
    var axisColor = "rgba(100,100,100,1)"
    svg.append("line")
       .attr("class", "y")
       .attr("y1", -(radius+50))
       .attr("y2", (radius+50))
       .style("fill", "none")
       .style("stroke", axisColor)
       .style("stroke-width", "2px")
    svg.append("line")
       .attr("class", "x")
       .attr("x1", -(radius+50))
       .attr("x2", (radius+50))
       .style("fill", "none")
       .style("stroke", axisColor)
       .style("stroke-width", "2px")
    svg.append("polygon")
       .attr("class", "ynArrow")
       .attr("points", "0,"+(radius+60)+" 5,"+(radius+50)+" -5,"+(radius+50))
       .style("fill", axisColor)
    svg.append("polygon")
       .attr("class", "ypArrow")
       .attr("points", "0,"+ -(radius+60)+" 5,"+ -(radius+50)+" -5,"+ -(radius+50))
       .style("fill", axisColor)
    svg.append("polygon")
       .attr("class", "xnArrow")
       .attr("points", -(radius+60)+",0 "+-(radius+50)+",5 "+-(radius+50)+",-5")
       .style("fill", axisColor)
    svg.append("polygon")
       .attr("class", "xpArrow")
       .attr("points",  (radius+60)+",0 "+(radius+50)+",5 "+(radius+50)+",-5")
       .style("fill", axisColor)
    //Center
    svg.append("circle")
      .attr("class", "center")
      .attr("r", "5px")
      .style("fill", "rgba(40, 40, 40, 1.0)")


    //Circle
    svg.append("circle")
      .attr("class", "uc")
      .attr("r", radius)
      .style("fill", "rgba(0,0,0,0)")
      .style("stroke", "rgba(40, 40, 40, 1)")
      .style("stroke-width", "4px")


    function drawAngleMark(angle) {
        var length = 30
          , width = 2
          , color = "rgba(40,40,40,1)"
          , cos = Math.cos(angle)
          , sin = Math.sin(angle)
          , coords = { inner: { x: (radius-(length/2))*cos
                              , y: (radius-(length/2))*sin }
                     , outer: { x: (radius+(length/2))*cos
                              , y: (radius+(length/2))*sin } 
                     , center: { x: radius*cos
                               , y: radius*sin }
          }

        svg.append("line")
           .attr("class", "angleMarkLine")
           .attr("x1", coords.inner.x)
           .attr("y1", coords.inner.y)
           .attr("x2", coords.outer.x)
           .attr("y2", coords.outer.y)
           .style("fill", "none")
           .style("stroke", color)
           .style("stroke-width", "3.5px")

        svg.append("circle")
           .attr("class", "angleMarkCircle")
           .attr("cx", coords.center.x)
           .attr("cy", coords.center.y)
           .attr("r", 15)
           .style("fill", "rgba(0,0,0,0)")
           .style("stroke", "none")
    }

    function drawAngleSweep(angle) {
        var length = 30
          , width = 2
          , color = "rgba(40,40,40,1)"
          , cos = Math.cos(angle)
          , sin = Math.sin(angle)
          , coords = {  x: radius*cos
                     , y: radius*sin }


        //Center to circle
        svg.append("line")
           .attr("class", "angleSweep")
           .attr("x1", 0)
           .attr("y1", 0)
           .attr("x2", coords.x)
           .attr("y2", coords.y)
           .style("fill", "none")
           .style("stroke", color)
           .style("stroke-width", "2px")

        //Circle to x-axis
        svg.append("line")
           .attr("class", "angleSweep")
           .attr("x1", coords.x)
           .attr("y1", 0)
           .attr("x2", coords.x)
           .attr("y2", coords.y)
           .style("fill", "none")
           .style("stroke", color)
           .style("stroke-width", "2px")
           .attr("stroke-dasharray", "5, 5")

        //Right Angle Symbol
        if(coords.x !== 0 && coords.y !== 0){
            var xSize = (coords.x < 0 ? -Math.floor(radius/18) : Math.floor(radius/18))
              , ySize = (coords.y < 0 ? -Math.floor(radius/18) : Math.floor(radius/18))
            
            svg.append("polyline")
               .attr("class", "angleSweep")
               .attr("points", (coords.x-xSize)+",0 "+
                               (coords.x-xSize)+","+ySize+" "+
                               (coords.x)+","+(ySize))
               .style("fill", "none")
               .style("stroke", color)
               .style("stroke-width", "2px")

            
        }
        //Point on circle
        svg.append("circle")
           .attr("class", "angleSweep")
           .attr("cx", coords.x)
           .attr("cy", coords.y)
           .attr("r", 5)
           .style("fill", color)
           .style("stroke", "none")

        //Angle
        var anglePath = d3.svg.arc()
           .outerRadius(21)
           .innerRadius(19)
           .startAngle(Math.PI/2)
           .endAngle(angle+(Math.PI/2))
        svg.append("path")
           .attr("class", "angleSweep")
           .attr("d", anglePath)
           .attr("r", 20)
           .style("stroke", "rgba(255,0,0,1)")
           .style("fill", "rgba(255,0,0,1)")
        
    }

    var timedOut = 0
      , draw = function(that){

        var mousePos = d3.mouse(that)

        if(mousePos[0] === 0 || mousePos[1] === 0) return

        var referenceAngle = Math.atan(mousePos[1]/mousePos[0])
        referenceAngle += (referenceAngle < 0) ? Math.PI/2 : 0

        if(mousePos[0] >= 0 && mousePos[1] >= 0) angleToMouse = referenceAngle
        else if(mousePos[0] <= 0 && mousePos[1] >= 0) angleToMouse = referenceAngle + (Math.PI/2)
        else if(mousePos[0] <= 0 && mousePos[1] <= 0) angleToMouse = referenceAngle + Math.PI
        else if(mousePos[0] >= 0 && mousePos[1] <= 0) angleToMouse = referenceAngle + 3*(Math.PI/2)
        else return

        console.log(angleToMouse);
        $(".angleSweep").remove()
        drawAngleSweep(angleToMouse)

        timedOut = 1
        setTimeout(function(){
            timedOut = 0
        }, 10)

    }

    svg.on("mousemove", function(){
        if(!timedOut) draw(this)
    })

    drawAngleMark(0)

    drawAngleMark((Math.PI/6))
    drawAngleMark((Math.PI/3))
    drawAngleMark((Math.PI/4))

    drawAngleMark(Math.PI/2)

    drawAngleMark(5*(Math.PI/6))
    drawAngleMark(2*(Math.PI/3))
    drawAngleMark(3*(Math.PI/4))
    
    drawAngleMark(Math.PI)

    drawAngleMark(7*(Math.PI/6))
    drawAngleMark(4*(Math.PI/3))
    drawAngleMark(5*(Math.PI/4))

    drawAngleMark(3*Math.PI/2)

    drawAngleMark(11*(Math.PI/6))
    drawAngleMark(5*(Math.PI/3))
    drawAngleMark(7*(Math.PI/4))

}

(function($){
    uc = new UnitCircle()
})(jQuery)
