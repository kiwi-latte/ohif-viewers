import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Icon, LayoutPreset, LayoutSelector, Tooltip } from '@ohif/ui';
import { ServicesManager, CommandsManager } from '@ohif/core';
import { defaultCommonPresets } from '../Toolbar/ToolbarLayoutSelector';

const MAX_LAYOUT_ROWS = 5;
const MAX_LAYOUT_COLUMNS = 6;

export function PanelLayoutSettings({ servicesManager, commandsManager }): React.FunctionComponent {
  const [isDisabledTooltip, setIsDisabledTooltip] = useState(false);

  const handleMouseEnter = useCallback(() => setIsDisabledTooltip(false), []);

  const { customizationService } = servicesManager.services;
  const presets = customizationService.get('commonPresets') || defaultCommonPresets;

  const onSelection = useCallback(props => {
    setIsDisabledTooltip(true);
    commandsManager.run({
      commandName: 'setViewportGridLayout',
      commandOptions: { ...props },
    });
  }, []);

  return (
    <div className="flex flex-wrap justify-between p-2 text-white">
      {presets.map((preset, index) => (
        <LayoutPreset
          key={index}
          classNames="rounded hover:bg-primary-dark group p-1 cursor-pointer"
          icon={preset.icon}
          commandOptions={preset.commandOptions}
          onSelection={onSelection}
        />
      ))}

      <div onMouseEnter={handleMouseEnter}>
        <Tooltip
          showHideDelay={50}
          isDisabled={isDisabledTooltip}
          content={
            <LayoutSelector
              onSelection={onSelection}
              rows={MAX_LAYOUT_ROWS}
              columns={MAX_LAYOUT_COLUMNS}
            />
          }
        >
          <div className="hover:bg-primary-dark group cursor-pointer rounded p-1">
            <Icon
              className="group-hover:text-primary-light"
              name="layout-common-2x3"
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}

PanelLayoutSettings.propTypes = {
  commandsManager: PropTypes.instanceOf(CommandsManager).isRequired,
  servicesManager: PropTypes.instanceOf(ServicesManager).isRequired,
};
