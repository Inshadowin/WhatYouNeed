import moment from "moment";
import settings from '../settings/index';

class WynDate extends moment {
    constructor(...props) {
        super(...props);
        this.settings = settings;
    }

    get settings() { return this.settings };
    set settings(value = {}) { this.settings = { ...this.settings, ...value } };

    formatUserDate = () => this.format(this.settings.dateFormats.viewDateFormat);
    formatUserTime = () => this.format(this.settings.dateFormats.viewTimeFormat);
    formatUserDateTime = () => this.format(this.settings.dateFormats.viewDateTimeFormat);
    formatUserDateTimeFull = () => this.format(this.settings.dateFormats.viewDateTimeFormatFull);
}

const getDate = (strDate, format = settings.dateFormats.serverFormat, ...params) => format ? new WynDate(strDate, format, ...params) : new WynDate(strDate);

export default getDate;