import React, { useEffect, useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2, useTheme2 } from '@grafana/ui';
import * as d3 from 'd3';

interface Props extends PanelProps<SimpleOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme2();
  const styles = useStyles2(getStyles);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    // Clear the existing SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);

    // Extract the time series data
    const timeSeries = data.series[0];

    // Extract x and y values
    const xValues = timeSeries.fields[0].values;
    const yValues = timeSeries.fields[1].values;

    // Create a scale for x and y values
    const xScale = d3.scaleLinear()
      .domain([d3.min(xValues) || 0, d3.max(xValues) || 1])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(yValues) || 0, d3.max(yValues) || 1])
      .range([height, 0]);

    // Create data points on the scatter plot
    svg.selectAll('circle')
      .data(xValues)
      .enter()
      .append('circle')
      .attr('cx', (d) => xScale(d))
      .attr('cy', (d, i) => yScale(yValues[i]))
      .attr('r', 4)
      .style('fill', theme.colors.primary.main);
  }, [data, width, height, theme]);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <svg
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        ref={svgRef}
      />

      <div className={styles.textBox}>
        {options.showSeriesCount && <div>Number of series: {data.series.length}</div>}
        <div>Text option value: {options.text}</div>
      </div>
    </div>
  );
};
