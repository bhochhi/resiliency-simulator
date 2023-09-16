

var network = [];

function createNetworkItem(name, color, cx, cy, radius) {
    var networkItem = {
        name: name,
        color: color,
        cx: cx,
        cy: cy,
        radius: radius
    };
    network.push(networkItem);
}

createNetworkItem("Akamai", "red", 500, 500, 500);
createNetworkItem("Eqiunax", "blue", 500, 500, 400);
createNetworkItem("Gloo Edge", "orange", 500, 500, 300);
createNetworkItem("Internal Gloo", "purple", 500, 500, 200);
createNetworkItem("Aaron Shop", "green", 400, 500, 50);
createNetworkItem("Sally's Store", "green", 550, 400, 20);
createNetworkItem("Sally's sister's Store", "green", 600, 600, 10);


const svg = d3.select("body")
    .append("svg")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);


svg.selectAll("circle")
    .data(network)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return d.cx; })
    .attr("cy", function (d) { return d.cy; })
    .attr("stroke", function (d) { return d.color; })
    .attr("stroke-width", 5)
    .attr("stroke-dasharray", "5,5")
    .attr("r", function (d) { return d.radius; })
    .attr("fill", "none")
    .on("mouseover", function (d) {
        d3.select(this)
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "0,0")
            .attr("fill", d.color)
            .append("title")
            .text(d.name);
    })
    .on("mouseout", function (d) {
        d3.select(this)
            .attr("stroke-width", 5)
            .attr("stroke-dasharray", "5,5")
            .attr("fill", "none");
    })
    .transition()
    .duration(10000) 

    .ease(d3.easeLinear)
    .attrTween("transform", function (d) {
        if(d.name=="Aaron Shop"){
            return d3.interpolateString("rotate(0, "+d.cx+","+d.cy+")", "rotate(360, "+d.cx+","+d.cy+")",);
        }
        return d3.interpolateString("rotate(0, 500, 500)", "rotate(0, 500, 500)");
    }
    );



    for (let i = 0; i < 20; i++) {

        svg.append("svg:image")
        .attr("xlink:href", "https://cdn.iconscout.com/icon/free/png-256/user-1648810-1401302.png")
        .attr("width", 20)
        .attr("height", 20)
        .attr("x", 900+Math.random()*100)
        .attr("y", 100+Math.random()*100+10)
        .attr("transform", "translate(-25, -25)")
        .on("mouseover", function (d) {
            d3.select(this)
                .attr("width", 100)
                .attr("height", 100)
                .attr("transform", "translate(-50, -50)")
                .append("title")
                .text("You");
        }
        )
        .on("mouseout", function (d) {
            d3.select(this)
                .attr("width", 50)
                .attr("height", 50)
                .attr("transform", "translate(-25, -25)");
        }
        );
    }


// on clicking user icon button, clone and add to outside network around user with some random location 


