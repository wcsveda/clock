function firstByClass(cls) {
    return document.getElementsByClassName(cls)[0];
}

const rad_per_deg = 0.0174533;
const radius = 22;

function set(n) {
    const element = firstByClass('hour_mark_'+n);
    const rads = rad_per_deg * (n * 30 - 90);
    const x = Math.cos(rads) * radius;
    const y = Math.sin(rads) * radius;

    element.style.transform = `translateX(${x}vh) translateY(${y}vh)`
}

for (let n = 1; n < 13; n++) 
set(n);
