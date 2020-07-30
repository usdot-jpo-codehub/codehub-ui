import {App} from '../../src/app';
import StageConfig from '../../src/stageConf';
import environment from '../../src/environment';


describe('the app', () => {
  it('says hello', () => {
    expect(new App(StageConfig, environment).version).not.toBeNull();
  });
});
