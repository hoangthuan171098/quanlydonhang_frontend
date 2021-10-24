export default function TimeDiff(dateStart, dateEnd){
    let msec = dateEnd - dateStart
    var yy = Math.floor(msec / 1000 / 60 / 60 / 24/ 365);
    msec -= yy * 1000 * 60 * 60* 24 * 365;
    var mt = Math.floor(msec / 1000 / 60 / 60 / 24/ 30);
    msec -= mt * 1000 * 60 * 60* 24 * 30;
    var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
    msec -= dd * 1000 * 60 * 60* 24;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;
    return {
        years: yy,
        months: mt,
        days: dd,
        hours: hh,
        minutes: mm,
        seconds: ss
    }
}