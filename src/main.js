export function configure(aurelia) {
  const materialize = 'materialize-css';

  // return System.import(materialize).then(() => {

  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-dialog')
    .plugin('aurelia-ui-virtualization');
  // .plugin('aurelia-materialize-bridge', bridge => {
  //   bridge
  //     .useButton()
  //     .useCollapsible()
  //     .useModal()
  //     .useTabs();
  // });

  if ('{BRANCH}' != 'master') { aurelia.use.developmentLogging(); } // eslint-disable-line


  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());

  // });
}
