import Bootstrap from './Bootstrap';

Bootstrap.initDomainContainers()
Bootstrap.initPresentationContainers()
Bootstrap.initInfraContainers()
Bootstrap.initConfig()
  .then(async () => {
    await Bootstrap.initDataSources()
    Bootstrap.initHttpApplication()
  })
  .catch(((error) => console.error(error)));
