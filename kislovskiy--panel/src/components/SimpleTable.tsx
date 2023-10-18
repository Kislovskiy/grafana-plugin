import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';

interface Props extends PanelProps<SimpleOptions> {}

export const SimpleTable: React.FC<Props> = ({ options, data, width, height }) => {
    return (
        <h1>
            Hello world!
        </h1>
    )
}
