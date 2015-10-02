angle = 0;
function rotate() {
    i++;
    angle = 20 * i;

    if (angle >= 360)
    {
	i = 0;
    }
    opacity = (angle > 180 ?(angle - 180): (180 - angle)) / 180;

    document.getElementById("i").style.transform = "rotateY(" + angle + "deg)";
    document.getElementById("i").style.opacity = opacity;
    window.requestAnimationFrame(rotate);
    //window.setInterval(rotate,1000);
}


function checkerBoard() {
    var rect =  document.getElementById("i").getBoundingClientRect();
    k = [];
    nX = 16; nY = 10;
    unitX = rect.width / nX;
    unitY = rect.height / nY;
    beginX = rect.left;
    beginY = rect.top;

    maxX = rect.left + rect.width;
    maxY = rect.top + rect.height;

    for (x = beginX;x < maxX;x += unitX)
    {

	for (y = beginY;y < maxY;y += unitY)
	{
	    div = document.createElement("div");

	    //div.innerText=" ";
	    div.style.position = "absolute";
	    div.style.left = x + "px";
	    div.style.top = y + "px";
	    div.style.width = unitX + "px";
	    div.style.height = unitY + "px";
	    div.style.backgroundColor = "Gold";
	    document.body.appendChild(div);
	    k.push(div);
	}

    }

    total = nX * nY;
    temp = null;

    for (i = 0;i < total;i++)
    {

	j = Math.floor(Math.random() * k.length);
	temp = k[i];
	k[i] = k[j];
	k[j] = temp;

    }

    handl = setInterval(function() {

			    if (k.length > 0)
			    {


				temp = k.pop();
				// alert(i);
				// temp.style.display = "none";
				temp.parentElement.removeChild(temp);
				// alert(k.length);

			    } }, 1000 / 60);

}
