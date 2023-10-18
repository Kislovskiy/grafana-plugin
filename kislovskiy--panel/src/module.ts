import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
// import { SimplePanel } from './components/SimplePanel';
import { SimpleTable } from './components/SimpleTable';

export const plugin = new PanelPlugin<SimpleOptions>(SimpleTable).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'text',
      name: 'Simple text option',
      description: 'Description of panel option',
      defaultValue: 'Default value of text input option',
    });
});
