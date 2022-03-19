/* eslint no-undef: off */
import wxShare from '../src/index';

describe('wxShare', () => {
  const wxShareIns = wxShare();
  it('Singleton mode: wxShareIns should be wxShare().', () => {
    expect(wxShareIns).toBe(wxShare());
  });
});
