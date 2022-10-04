import Bootstrap from './Bootstrap';

Bootstrap.initDomainContainers()
Bootstrap.initPresentationContainers()
Bootstrap.initInfraContainers()
Bootstrap.initConfig()
  .then(() => {
    Bootstrap.initHttpApplication()
  })
  .catch(((error) => console.error(error)));
