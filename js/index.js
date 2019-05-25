

const radius = 22;

Array.from(document.getElementsByClassName('hour_mark'))
    .forEach((element, index) => {
        const n = index + 1;
        const rads = ((n * 30 - 90) * Math.PI) / 180;
        const x = Math.cos(rads) * radius;
        const y = Math.sin(rads) * radius;

        element.style.transform = `translateX(${x - 1}vh) translateY(${y - 2}vh)`
    });

function _angles(count) {
    const array = Array.of(count + 1);
    const div = 360 / count;

    for (let n = 1; n <= count; n++)
        array[n] = `rotate(${n * div - 90}deg)`;

    return array;
}

const angles = _angles(60);
angles[0] = angles[60];

class Clock {
    constructor(id, hourOff, minuteOff, secondOff) {
        const item = document.getElementById(id);
        this.hourHand = this.child(item, 'hour_hand'),
        this.minuteHand = this.child(item, 'minute_hand'),
        this.secondHand = this.child(item, 'second_hand'),
        this.titleElem = this.child(item, 'title');
        this.title = this.titleElem.innerText;
        this.offset = {hour: hourOff || 0, minute: minuteOff || 0, second: secondOff || 0};
    }
    child(item, cls) {
        return item.getElementsByClassName(cls)[0];
    }
}

const clocks = [
    new Clock("utc_clock"),
    new Clock("india_clock", 5, 30),
    new Clock("new_york_clock", -4),
];

function updateClock() {
    let date = new Date();
    for (const c of clocks) {
        let hour = date.getUTCHours()  + c.offset.hour,
        minute = date.getUTCMinutes()  + c.offset.minute,
        second = date.getUTCSeconds() + c.offset.second;

        if(second > 60) {
            minute++;
            second -= 60;
        }
        if(minute > 60) {
            hour++;
            minute -= 60;
        }

        let hr = (hour % 12) * 5;
        c.titleElem.innerText = `${c.title}(${map(hour%12 || 12)}:${map(minute)}:${map(second)})`

        c.minuteHand.style.transform = angles[minute];
        c.hourHand.style.transform = angles[hr] ;
        c.secondHand.style.transform = angles[second];    
    }
}
function map(n) {
    return n < 10 ? `0${n}` : n;
}

setInterval(updateClock, 1000);
updateClock();