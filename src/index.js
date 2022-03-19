import CreateInstance from '@cycjimmy/awesome-js-funcs/esm/designPattern/CreateInstance';

import WxShare from './WxShare';

const instance = CreateInstance();

/**
 * wxShare
 * @returns {*}
 */
export default () => {
  if (instance()) {
    return instance();
  }

  const wxShare = new WxShare();
  instance(wxShare);

  return wxShare;
};
