import { CODES_ARRAY, EUROPE_LIST } from './const';
const formatTorrentTitle = (title) => {
  // 保留5.1 H.264中间的点
  return title.replace(/(?<!(([^\d]+\d{1})|([^\w]+H)))(\.)/ig, ' ').replace(/\.(?!(\d+))/, ' ').trim();
};

const getUrlParam = (key) => {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)');
  const regArray = location.search.substr(1).match(reg);
  if (regArray) {
    return unescape(regArray[2]);
  }
  return '';
};
// 获取音频编码
const getAudioCodes = (title) => {
  let codes = '';
  const formatTitle = title.replace(/:|-|\s/g, '').toLowerCase();
  for (let i = 0; i < CODES_ARRAY.length; i++) {
    if (formatTitle.includes(CODES_ARRAY[i])) {
      codes = CODES_ARRAY[i];
      break;
    }
  }
  return codes;
};

// 获取副标题
const getSubTitle = (data) => {
  const titles = data.trans_title.join('/');
  const { director = [] } = data;
  const directorArray = director.map(item => {
    return replaceEngName(item.name);
  });
  // 演员只选择前两位
  const mainCast = data.cast.slice(0, 2).map(cast => {
    return replaceEngName(cast.name);
  });
  const directorStr = directorArray.length > 0 ? `|导演: ${directorArray.join(' ')}` : '';
  const castStr = mainCast.length > 0 ? `|主演:${mainCast.join(' ')}` : '';
  return titles + directorStr + castStr;
};
/*
* 替换豆瓣演员中的英文名称
* @param {any}
* @return
* */
const replaceEngName = (string) => {
  return string.replace(/\s+[A-Za-z\s]+/, '');
};

const getAreaCode = (area) => {
  const europeList = EUROPE_LIST;
  if (area) {
    if (area.match(/USA|Canada/i)) {
      return 'US';
    } else if (europeList.includes(area)) {
      return 'EU';
    } else if (area.match(/Japan/i)) {
      return 'JP';
    } else if (area.match(/Korea/i)) {
      return 'KR';
    } else if (area.match(/Taiwan/i)) {
      return 'TW';
    } else if (area.match(/Hong Kong/i)) {
      return 'HK';
    } else if (area.match(/China/i)) {
      return 'CN';
    }
  }
  return 'OT';
};

export {
  getUrlParam,
  formatTorrentTitle,
  getAudioCodes,
  replaceEngName,
  getSubTitle,
  getAreaCode,
}
;