var carousel = (function() {

var slides = [],
    spacer = {
    width: 5,
    height: 10
};
var maxHeight = 0,maxWidth =0,nSlides=0;

var csl = {width:0,height:0,top:20,left:10};

createCarousel = function(id) {

    carousel = document.getElementById(id);
    var rect = carousel.getBoundingClientRect();
    csl.top = rect.top;
    csl.left = rect.left;
    carousel.setAttribute("class", "carousel");

};

toRadians = function (degrees) {
    return degrees * (Math.PI / 180);
};
translateX = function (maxWidth, angle) {
    return "translateX(" + Math.floor(maxWidth * Math.sin(toRadians(angle))) + "px)";
};
rotateY = function (angle) {
    return "rotateY(" + angle + "deg)";
};

updateCarouselElement = function (elm, angle, maxWidth) {

    var translation = translateX(maxWidth, angle),
        rotation = rotateY(angle),
        angleAbsolute = Math.abs(180 - angle);
    var opacity, zIndex;

    elm.style.transform = translation + " " + rotation;
    opacity = 0.1 + angleAbsolute / 180 * 0.9;
    zIndex = 120 + angleAbsolute;
    elm.style.opacity = opacity;
    elm.style.zIndex = zIndex;
    // logging
    elm.title = "angle :" + angle + " translation :" + translation + " rotation:" + rotation + " zIndex : " + zIndex + " opacity : " + opacity;


};

loadImages = function () {
    var i;

    slides = carousel.children;

    nSlides = slides.length;


    for (i = 0; i < nSlides; i++)
    {

        rect = slides[i].getBoundingClientRect();

	if (rect.height > maxHeight)
	{
	    maxHeight = rect.height;
	}
	if (rect.width > maxWidth)
	{
	    maxWidth = rect.width;
	}

    }

    initCarousel();
    
    addSliders();
    initEvents();

};


initCarousel = function() {
    csl.width = (window.innerWidth - 2*spacer.width);
   // csl.width = carousel.getBoundingClientRect().width;
    csl.height = (maxHeight + 2 * spacer.height);
   carousel.style.top = csl.top + "px";
    carousel.style.left = csl.left + "px";
    //carousel.style.width = csl.width + "px";
    carousel.style.height = csl.height + "px";

    unitDeg = 360 / nSlides;

    angle = 0;

    for (i = 0; i < nSlides; i++)
    {

	m = slides[i];
	m.style.position = "absolute";
	m.style.left = (csl.width - maxWidth) / 2 + "px";
	m.style.top = (csl.height - maxHeight) / 2 + "px";
	m.style.height = maxHeight + "px";
	m.style.width = maxWidth + "px";
	m.style.display = "inline";

	updateCarouselElement(m, angle, maxWidth);

	angle = (angle + unitDeg) % 360;

    }

};



initEvents = function() {
    angle = 0;

    stopAngle = 0;

    hndl = null;

};

slideAndFocus = function(slider) {
    stopAngle =  unitDeg; 
    hndl = window.setInterval(function() {
				  if (stopAngle > 0)
				  {
				      slider();stopAngle--;
				  }
				  else
				  {
				      window.clearInterval(hndl);
				  }
			      }, 10);
};

slideRight = function () {

    angle++;
    for (i = 0; i < nSlides; i++)
    {
	updateCarouselElement(slides[i], angle, maxWidth);
	angle = (angle + unitDeg) % 360;
    }
};

slideLeft = function () {

    angle = (angle - 1) < -1 ?359: angle - 1;
    for (i = 0; i < nSlides; i++)
    {
	updateCarouselElement(slides[i], angle, maxWidth);
	angle = (angle + unitDeg) % 360;
    }
};

addSliders = function() {
    
   var slider = document.createElement("li");
    slider.setAttribute("class","slider");
    slider.innerHTML ="&#8678;";
    slider.style.left="Opx";
    slider.style.lineHeight = csl.height+"px";
    carousel.appendChild(slider);
    slider.addEventListener("click",function(){slideAndFocus(slideLeft);},false);
    
    slider = document.createElement("li");
    slider.setAttribute("class","slider");
    slider.innerHTML ="&#8680;";
   slider.style.left=(csl.width-100)+"px";
   //slider.style.cssFloat ="right";
    slider.style.lineHeight = csl.height+"px";
    carousel.appendChild(slider);
    
    slider.addEventListener("click",function(){slideAndFocus(slideRight);},false);
};

//carouselify = function (id) {
   return function (id) {
    createCarousel(id);
    loadImages();

};

})();
