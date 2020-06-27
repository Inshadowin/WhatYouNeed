import moment from "moment";
import settings from '../settings/index';

const getDate = (strDate, format, ...params) => {
    if (!format) return moment(strDate);

    const res = moment(strDate, format, ...params);
    return withFormatters(res);
};

const withFormatters = obj => {
    enrichDateFormat(obj);
    enrichTimeFormat(obj);
    enrichDateTimeFormat(obj);
    enrichDateTimeFullFormat(obj);

    return obj;
};

const enrichDateFormat = obj => {
    obj.formatUserDate = () => obj.format(settings.dateFormats.viewDateFormat);
};
const enrichTimeFormat = obj => {
    obj.formatUserTime = () => obj.format(settings.dateFormats.viewTimeFormat);
};
const enrichDateTimeFormat = obj => {
    obj.formatUserDateTime = () => obj.format(settings.dateFormats.viewDateTimeFormat);
};
const enrichDateTimeFullFormat = obj => {
    obj.formatUserDateTimeFull = () => obj.format(settings.dateFormats.viewDateTimeFormatFull);
};

export default (strDate, format = settings.dateFormats.serverFormat, ...params) =>
    getDate(strDate, format, ...params);
