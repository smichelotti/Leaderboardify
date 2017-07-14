import { LeaderboardifyNgPage } from './app.po';

describe('leaderboardify-ng App', () => {
  let page: LeaderboardifyNgPage;

  beforeEach(() => {
    page = new LeaderboardifyNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
