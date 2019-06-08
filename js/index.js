function translate(children, div, radius, ticks) {
    let n = 1;

    for (const element of children) {
        const rads = ((n * div - 90) * Math.PI) / 180;
        const x = Math.cos(rads) * radius;
        const y = Math.sin(rads) * radius;

        element.style.top = (49 + y) + "%";
        element.style.left = (49 + x) + "%";

        if (ticks)
            element.style.transform = `rotate(${n * div - 90}deg)`;
        n++;
    }
}

class Clock {
    constructor(element) {
        const hands = [...element.getElementsByClassName('hands')];
        this.hourHand = hands.find(t => t.classList.contains('hour_hand'));
        this.minuteHand = hands.find(t => t.classList.contains('minute_hand'));
        this.secondHand = hands.find(t => t.classList.contains('second_hand'));
        this.digitalClock = element.querySelector('.title > span');

        translate(element.getElementsByClassName('hour_mark'), 30, 37);
        translate(element.getElementsByClassName('tick_mark'), 6, 43, true);

        const os = element.dataset.zoneoffset.split(':');

        this.offset = {
            hour: os[0] ? parseInt(os[0]) : 0,
            minute: os[1] ? parseInt(os[1]) : 0,
            second: os[2] ? parseInt(os[2]) : 0,
        };
    }
}

const clocks = Array.from(document.getElementsByClassName('clock-container'), c => new Clock(c));
const numbers = new Array(61);
for (let n = 0; n < 61; n++) {
    numbers[n] = n < 10 ? '0' + n : String(n);
}

const angles = (() => {
    const array = new Array(61);
    const count = 60;
    const div = 360 / count;

    for (let n = 1; n <= count; n++)
        array[n] = `rotate(${n * div - 90}deg)`;

    array[0] = array[count];
    return array;
})();


// let h = 12, m = 0, s = 0;

function updateClock() {
    const date = new Date();
    const utc_hour = date.getUTCHours(),
        utc_minute = date.getUTCMinutes(),
        utc_second = date.getUTCSeconds();

    /**
 *
const utc_hour = h,
    utc_minute = m,
    utc_second = s++;
    */

    for (const c of clocks) {
        console.log(utc_hour);
        let hour = utc_hour + c.offset.hour,
            minute = utc_minute + c.offset.minute,
            second = utc_second + c.offset.second;


        if (second < 0) {
            minute--;
            second += 60;
        }
        if (second > 60) {
            minute++;
            second -= 60;
        }
        if (minute < 0) {
            hour--;
            minute += 60;
        }
        if (minute > 60) {
            hour++;
            minute -= 60;
        }

        if (hour < 0)
            hour = 24 + hour;

        /**
         * if(c.offset.hour == 0) {
            h = hour;
            m = minute + 1;
            s = second + 1;
        }
         */

        c.digitalClock.innerText = numbers[hour % 24 || 24] + ':' + numbers[minute] + ':' + numbers[second];

        c.minuteHand.style.transform = angles[minute];
        c.hourHand.style.transform = angles[hour % 12 * 5 + Math.floor(minute / 12)];
        c.secondHand.style.transform = angles[second];
    }
}

setInterval(updateClock, 1000);
updateClock();