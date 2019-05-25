function firstByClass(cls) {
    return document.getElementsByClassName(cls)[0];
}

const radius = 22;

function set(n) {
    const element = firstByClass('hour_mark_'+n);
    const rads = ((n * 30 - 90) * Math.PI)/180;
    const x = Math.cos(rads) * radius;
    const y = Math.sin(rads) * radius;

    element.style.transform = `translateX(${x - 1}vh) translateY(${y - 2}vh)`
}

for (let n = 1; n < 13; n++) 
set(n);
