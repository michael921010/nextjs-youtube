import { parseISO, format } from "date-fns";
import { zhTW } from "date-fns/locale";

const locale = zhTW;
const pattern = "yyyy年MM月dd日";

export const dateFmt = (date) => format(parseISO(date), pattern, { locale });
