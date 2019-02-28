
describe('App', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000');
  });

  it('App runs well', async () => {
    await page.waitFor(3000);
    await page.screenshot({ path : 'screenshots/App.png' });
  });

});
