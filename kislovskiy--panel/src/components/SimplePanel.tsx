import React, { useRef, useEffect } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css } from '@emotion/css';
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
  const svgRef = useRef(null);

  const fixedAxisLength = 10; // Define the fixed axis length

  useEffect(() => {
    if (data.series.length > 0 && svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Clear any existing content in the SVG
      svg.selectAll('*').remove();

      // Create a group for the coordinate system
      const coordinateSystem = svg
        .append('g')
        .attr('transform', `translate(40, ${height - 40})`);

      const xScale = d3.scaleLinear().domain([0, fixedAxisLength]).range([0, width]);
      const xAxis = d3.axisBottom(xScale).ticks(fixedAxisLength);
      coordinateSystem
        .append('g')
        .attr('class', 'x-axis')
        .call(xAxis);

      const yScale = d3.scaleLinear().domain([0, fixedAxisLength]).range([0, -height]);
      const yAxis = d3.axisLeft(yScale).ticks(fixedAxisLength);
      coordinateSystem
        .append('g')
        .attr('class', 'y-axis')
        .call(yAxis);

      coordinateSystem
        .append('circle')
        .attr('cx', xScale(5))
        .attr('cy', yScale(5))
        .attr('r', 50)
        .style('fill', 'red');

      coordinateSystem
        .append('text')
        .attr('x', xScale(1))
        .attr('y', yScale(1))
        .text(`Text option value: ${options.text}`)
        .style('fill', 'gray');
    }
  }, [data, options, theme.colors.primary.main, width, height]);

  return (
    <div
      className={styles.wrapper}
      style={{
        width: width + 'px',
        height: height + 'px',
      }}
    >
      <svg
        ref={svgRef}
        className={styles.svg}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox={`0 0 ${width} ${height}`}
      />
    </div>
  );
};

export default SimplePanel;
