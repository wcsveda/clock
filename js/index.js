function firstByClass(cls) {
    return document.getElementsByClassName(cls)[0];
}

const radius = 22;

function set(n, element) {
    const rads = ((n * 30 - 90) * Math.PI) / 180;
    const x = Math.cos(rads) * radius;
    const y = Math.sin(rads) * radius;

    element.style.transform = `translateX(${x - 1}vh) translateY(${y - 2}vh)`
}

Array.from(document.getElementsByClassName('hour_mark'))
    .forEach((element, index) => set(index + 1, element));

const hourHand = document.getElementById('hour_hand');
const minuteHand = document.getElementById('minute_hand');
const secondHand = document.getElementById('second_hand');

function angles(count) {
    const array = Array.of(count + 1);
    const div = 360/count;

    for (let n = 1; n <= count ; n++) 
        array[n] = `rotate(${n * div - 90}deg)`;
        
    return array;
}

const hour_angles = angles(12);
const minute_angles = angles(60);

function updateClock() {
    let date = new Date();
    let hour = date.getHours() % 12,
        minute = date.getMinutes(),
        second = date.getSeconds();
    
    hourHand.style.transform = hour_angles[hour];
    minuteHand.style.transform = minute_angles[minute];
    secondHand.style.transform = minute_angles[second];
}

setInterval(updateClock, 1000);
updateClock();