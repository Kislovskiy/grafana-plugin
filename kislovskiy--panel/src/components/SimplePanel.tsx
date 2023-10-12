import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    // Ensure we have data and the SVG container element
    if (data.series.length > 0 && svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Clear any existing content in the SVG
      svg.selectAll('*').remove();

      // Create the circle
      svg
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 50)
        .style('fill', theme.colors.primary.main);

      svg
        .append('text')
        .attr('x', 0)
        .attr('y', 0)
        .text(`Text option value: ${options.text}`);
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
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
      />
    </div>
  );
};

export default SimplePanel;
