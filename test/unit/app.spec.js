import {App} from '../../src/app';

class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}

jest.useFakeTimers();

describe('the App module', () => {
  let sut;
  let mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('ITS CodeHub');
  });

  it('should have a popular route', () => {
    let r = sut.router.routes.filter(x => x.name == 'popular');
    expect(r.length > 0).toBeTruthy();
    expect(r[0].name).toEqual('popular');
    expect(r[0].route).toEqual('');
    expect(r[0].title).toEqual('Home');
    expect(r[0].nav).toBeTruthy();
    expect(r[0].settings.isTopLevelMenu_noChildren).toBeTruthy();
  });

});
