// global variables
var animating = false;
var finished = false;
var SCORE = 14760;

// Reset everything to default animation state
function reset() {
    // reset container
    d3.select(".container")
        .style('opacity', 0);

    // reset badge
    //  - set original width
    d3.select("img")
        .style('opacity', 0)
        .style('width', '90px')
        .style('left', '0px')
        .style('top', '0px')
        .style('-webkit-filter', 'blur(3px) brightness(1)')
    ;

    // score
    d3.select(".score")
        .style('opacity', 0)
        .style('font-size', '0px')
        .style('-webkit-filter', 'blur(0px) brightness(0)')
<<<<<<< HEAD

    // accolades
    d3.selectAll(".accolades img")
        .style('opacity', 0)
        .attr('width', 0)
        .style('-webkit-filter', 'saturate(0)')
=======
>>>>>>> 62e9ed127354647d5a63bd7c057f346671c56ebe
}

// Animate - at the end of the animation, set finish to true
function animate() {
    animating = true;

    function animate_container() {
        return d3.select(".container")
            .transition().duration(300)
            .style('opacity', 1)
        ;
    }

    function animate_badge() {
        //  - enlarge then scale down back to original size
        //  - centered-resize animations require width, left and top
        return d3.select("img")
            .transition().duration(300)
                .style('opacity', 1)
            .transition().duration(100).delay(100)
                .style('width', '110px')
                .style('left', '-10px')
                .style('top', '-10px')
            .transition().duration(800).delay(200)
                .style('width', '90px')
                .style('left', '0px')
                .style('top', '0px')
                .style('-webkit-filter', 'blur(0px) brightness(0)')
        ;
    }

    function animate_score() {
        return d3.select(".score")
            // enter by upscaling and start couting towards the score
            .transition().duration(1400)
                .tween("text", function() {
                    // score interpolator
                    interpolate = d3.interpolateRound(0, SCORE);
                    return function(t) {
                        this.textContent = interpolate(t);
                    };
                })
            .transition().duration(800).ease('elastic')
                .style('font-size', '30px')
                .style('opacity', 1)
            // highlight and
            .transition().duration(100).delay(1300).ease('cubic-out')
                .style('-webkit-filter', 'blur(1px) brightness(1)')
<<<<<<< HEAD
                .style('font-size', '60px')
            .transition().duration(750).delay(1500).ease('cubic-in-out')
                .style('-webkit-filter', 'blur(0px) brightness(0)')
                .style('font-size', '40px')
        ;
    }

    function animate_accolades() {
        return d3.selectAll('.accolades img')
            .transition().duration(500).delay(function(d, i) { return i * 500; })
                .attr('width', 48)
                .style('opacity', 1)
            ;
    }

    animate_container().each('end', function() {
        animate_badge().each('end', function() {
            animate_score().each('end', function() {
                animate_accolades().each('end', function() {
                    // TODO: need to count all accolade elements before setting these
                    // but this isn't such a big deal.
                    finished = true;
                    animating =false;
                });
=======
                .style('font-size', '40px')
            .transition().duration(750).delay(1500).ease('cubic-in-out')
                .style('-webkit-filter', 'blur(0px) brightness(0)')
                .style('font-size', '30px')
        ;
    }

    animate_container().each('end', function() {
        animate_badge().each('end', function() {
            animate_score().each('end', function() {
                finished = true;
                animating =false;
>>>>>>> 62e9ed127354647d5a63bd7c057f346671c56ebe
            });
        });
    });
}


$(document).ready(function() {
    reset();

    $(document).click(function() {
        if (animating) return;

        if (finished) {
            reset();
            finished = false;
        } else {
            animate();
        }
    });
});