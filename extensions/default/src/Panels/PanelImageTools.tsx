import React from 'react';
import PropTypes from 'prop-types';
import { CommandsManager, ServicesManager, useToolbar } from '@ohif/core';
import './PanelImageTools.css';

const toolGroup = new Set([
  'RotateRight',
  'RotateLeft',
  'FlipHorizontal',
  'FlipVertical',
  'Invert',
  'Reset',
  'Cine',
  'Capture',
  'MoreTools',
  'InfoTools',
]);

export default function PanelImageTools({ servicesManager }): React.FunctionComponent {
  const { toolbarButtons, onInteraction } = useToolbar({
    servicesManager,
    buttonSection: 'primary',
  });

  return (
    <div className="space-y-2 p-2 text-white">
      <div className="flex flex-wrap">
        {toolbarButtons.map(toolDef => {
          if (!toolDef || !toolGroup.has(toolDef.id)) {
            return null;
          }

          const { id, Component, componentProps } = toolDef;
          const tool = (
            <Component
              key={id}
              id={id}
              toolTipPosition="right"
              onInteraction={onInteraction}
              servicesManager={servicesManager}
              {...componentProps}
            />
          );

          const isSplitButton = !!componentProps?.groupId;
          const className = isSplitButton
            ? 'flex justify-center mr-2'
            : 'flex flex-1 justify-center';

          return (
            <div
              key={id}
              className={className}
            >
              {tool}
            </div>
          );
        })}
      </div>
    </div>
  );
}

PanelImageTools.propTypes = {
  commandsManager: PropTypes.instanceOf(CommandsManager).isRequired,
  servicesManager: PropTypes.instanceOf(ServicesManager).isRequired,
};
