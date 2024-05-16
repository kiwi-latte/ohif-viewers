import React from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton } from '@ohif/ui';
import { CommandsManager, ServicesManager } from '@ohif/core';
import { WrappedCinePlayer } from './WrappedCinePlayer';
import './PanelImageTools.css';

const imageTools = [
  { icon: 'tool-rotate-right', commandName: 'rotateViewportCW' },
  { icon: 'tool-rotate-left', commandName: 'rotateViewportCCW' },
  { icon: 'tool-flip-horizontal', commandName: 'flipViewportHorizontal' },
  { icon: 'tool-flip-vertical', commandName: 'flipViewportVertical' },
  { icon: 'tool-invert', commandName: 'invertViewport' },
];

export default function PanelImageTools({
  commandsManager,
  servicesManager,
}): React.FunctionComponent {
  return (
    <div className="space-y-2 p-2 text-white">
      <div className="flex flex-wrap justify-between">
        {imageTools.map(tool => (
          <IconButton
            key={tool.icon}
            size="toolbar"
            className="hover:bg-primary-dark"
            onClick={() => commandsManager.runCommand(tool.commandName)}
          >
            <Icon name={tool.icon} />
          </IconButton>
        ))}
      </div>
      <div className="bg-secondary-light h-px w-full"></div>
      <div className="cine-player-wrapper relative space-y-2 px-2">
        <p className="text-base">Image Play</p>
        <WrappedCinePlayer servicesManager={servicesManager} />
      </div>
    </div>
  );
}

PanelImageTools.propTypes = {
  commandsManager: PropTypes.instanceOf(CommandsManager).isRequired,
  servicesManager: PropTypes.instanceOf(ServicesManager).isRequired,
};
