import 'aurelia-pal-browser';
import 'aurelia-framework';

import * as bootstrapper from 'aurelia-bootstrapper';

export function configure(aurelia) {
  aurelia.use.basicConfiguration();
  aurelia.start().then(() => aurelia.setRoot());
}

function main() {
  bootstrapper.bootstrap(function(aurelia) {
    aurelia.use
      .standardConfiguration()
      .developmentLogging();

    aurelia.start().then(() => aurelia.setRoot('app', document.body));
  });
}

main();
