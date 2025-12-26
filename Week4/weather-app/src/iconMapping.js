import icon01d from './icons/01d.svg';
import icon01n from './icons/01n.svg';
import icon02d from './icons/02d.svg';
import icon02n from './icons/02n.svg';
import icon03d from './icons/03d.svg';
import icon03n from './icons/03n.svg';
import icon04d from './icons/04d.svg';
import icon04n from './icons/04n.svg';
import icon09d from './icons/09d.svg';
import icon09n from './icons/09n.svg';
import icon10d from './icons/10d.svg';
import icon10n from './icons/10n.svg';
import icon11d from './icons/11d.svg';
import icon11n from './icons/11n.svg';
import icon13d from './icons/13d.svg';
import icon13n from './icons/13n.svg';
import icon50d from './icons/50d.svg';
import icon50n from './icons/50n.svg';

const iconMap = {
    "01d": icon01d,
    "01n": icon01n,
    "02d": icon02d,
    "02n": icon02n,
    "03d": icon03d,
    "03n": icon03n,
    "04d": icon04d,
    "04n": icon04n,
    "09d": icon09d,
    "09n": icon09n,
    "10d": icon10d,
    "10n": icon10n,
    "11d": icon11d,
    "11n": icon11n,
    "13d": icon13d,
    "13n": icon13n,
    "50d": icon50d,
    "50n": icon50n,
};

export const getIcon = (iconCode) => {
    return iconMap[iconCode];
};
