import React from 'react';
import PropTypes from 'prop-types';
import { Icon, IconButton } from '@ohif/ui';
import { CommandsManager } from '@ohif/core';

const imageTools = [
  { icon: 'tool-rotate-right', commandName: 'rotateViewportCW' },
  { icon: 'tool-rotate-left', commandName: 'rotateViewportCCW' },
  { icon: 'tool-flip-horizontal', commandName: 'flipViewportHorizontal' },
  { icon: 'tool-flip-vertical', commandName: 'flipViewportVertical' },
  { icon: 'tool-invert', commandName: 'invertViewport' },
];

export default function PanelImageTools({ commandsManager }): React.FunctionComponent {
  return (
    <div className="flex flex-wrap justify-between p-2 text-white">
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
  );
}

PanelImageTools.propTypes = {
  commandsManager: PropTypes.instanceOf(CommandsManager).isRequired,
};
