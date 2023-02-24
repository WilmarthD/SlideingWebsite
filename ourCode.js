//Tracking mouse to control scrolling past the pictures
const track = document.getElementById("image-track");

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX; //Tracking mouse initial x position (basically an invisible slider)
}

window.onmousemove = e => {
    if(track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth/2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage; //Keeps track from resetting each time, holding its place when scrolling

    track.dataset.percentage = Math.min(Math.max(nextPercentage, -120), 0);

    //track.style.transform = `translate(${nextPercentage}%, -50%)`;
    track.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for(const image of track.getElementsByClassName("image")){
        //image.style.objectPosition = `${nextPercentage + 100} 50%`
        image.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

window.onmouseup = () =>{
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

const expandImage = document.getElementById('expand-image');
const expandedText = document.getElementById('expanded-text');

expandImage.addEventListener('click', function() {
// toggle the display of the expanded text
expandedText.style.display = expandedText.style.display === 'none' ? 'block' : 'none';
});

// function expandImage() {
//     var expandedImage = document.createElement("div");
//     expandedImage.className = "expanded-image";
//     var img = document.createElement("img");
//     img.src = "images/Face.PNG";
//     expandedImage.appendChild(img);
//     document.body.appendChild(expandedImage);
//   }
  