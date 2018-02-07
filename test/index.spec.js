import WxShare from '../build/WxShare';

describe('test spec', () => {
  let
    wxShare = new WxShare()
  ;

  test('Default Test', () => {
    expect(wxShare).toBeTruthy();
  });
});