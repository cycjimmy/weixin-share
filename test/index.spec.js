import WxShare from '../build/weixin-share';

describe('test spec', () => {
  const wxShare = new WxShare();

  test('Default Test', () => {
    expect(wxShare).toBeTruthy();
  });
});
