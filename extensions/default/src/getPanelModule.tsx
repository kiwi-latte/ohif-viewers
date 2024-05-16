import React from 'react';
import {
  WrappedPanelStudyBrowser,
  PanelMeasurementTable,
  PanelImageTools,
  PanelLayoutSettings,
} from './Panels';
import i18n from 'i18next';

// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails

function getPanelModule({ commandsManager, extensionManager, servicesManager }) {
  const wrappedMeasurementPanel = () => {
    return (
      <PanelMeasurementTable
        commandsManager={commandsManager}
        servicesManager={servicesManager}
        extensionManager={extensionManager}
      />
    );
  };

  const wrappedLayoutSettingsPanel = () => {
    return (
      <PanelLayoutSettings
        commandsManager={commandsManager}
        servicesManager={servicesManager}
      />
    );
  };

  const wrappedImageToolsPanel = () => {
    return <PanelImageTools commandsManager={commandsManager} />;
  };

  return [
    {
      name: 'seriesList',
      iconName: 'tab-studies',
      iconLabel: 'Studies',
      label: i18n.t('SidePanel:Studies'),
      component: WrappedPanelStudyBrowser.bind(null, {
        commandsManager,
        extensionManager,
        servicesManager,
      }),
    },
    {
      name: 'measure',
      iconName: 'tab-linear',
      iconLabel: 'Measure',
      label: i18n.t('SidePanel:Measurements'),
      secondaryLabel: i18n.t('SidePanel:Measurements'),
      component: wrappedMeasurementPanel,
    },
    {
      name: 'layoutSettings',
      iconName: 'tool-layout',
      iconLabel: 'Layout',
      label: 'Layout',
      secondaryLabel: 'Layout',
      component: wrappedLayoutSettingsPanel,
    },
    {
      name: 'imageTools',
      iconName: 'icon-settings',
      iconLabel: 'Image Tools',
      label: 'Image Tools',
      secondaryLabel: 'Image Tools',
      component: wrappedImageToolsPanel,
    },
  ];
}

export default getPanelModule;
