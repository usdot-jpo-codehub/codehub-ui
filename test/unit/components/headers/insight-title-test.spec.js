import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { InsightTitle } from '../../../../src/components/headers/insight-title';


describe('Test - insight-title : ', () => {
  let testTimeout;

  beforeEach( () => {
    testTimeout = 3000;
  });

  test('Test instance of the component', (done) => {
    let insightTitle = new InsightTitle({});
    expect(insightTitle.lastUpdated).toBeNull();
    done();
  }, testTimeout);

  test('Test getLocalDateTime', (done) => {
    let insightTitle = new InsightTitle({});
    let dtStr = '2020-10-16 00:00:00';
    let dt = insightTitle.getLocalDateTime(dtStr);
    expect(dt).not.toBeNull();
    done();
  }, testTimeout);
});
