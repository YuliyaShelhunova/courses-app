export const Utils = {
    dateFormatter(date) {
        return date?.replaceAll('/', '.');
    },

    timeFormatter(time) {
        const hoursFormatters = this.stringTimeFormatter(Math.floor(time / 60));
        const minutesFormatters = this.stringTimeFormatter(time % 60);

        return time ? `${hoursFormatters}:${minutesFormatters} hours` : "00:00 hours";
    },

    stringTimeFormatter(time) {
        return (time < 10) ?  `0${time}` : `${time}`;
    },
    
    generateCurrentDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        return dd + '/' + mm + '/' + yyyy;
    }
}