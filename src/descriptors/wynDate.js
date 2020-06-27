import moment from "moment";
import settings from '../settings/index';

class WynDate extends moment {
    formatUserDate = () => {
        return this.format(settings.dateFormats.viewDateFormat);
    }
    formatUserTime = () => {
        return this.format(settings.dateFormats.viewTimeFormat);
    }
    formatUserDateTime = () => {
        return this.format(settings.dateFormats.viewDateTimeFormat);
    }
    formatUserDateTimeFull = () => {
        return this.format(settings.dateFormats.viewDateTimeFormatFull);
    }
}

const getDate = (strDate, format, ...params) => {
    if (!format) return new WynDate(strDate);

    return new WynDate(strDate, format, ...params);
};

export default (strDate, format = settings.dateFormats.serverFormat, ...params) => getDate(strDate, format, ...params);