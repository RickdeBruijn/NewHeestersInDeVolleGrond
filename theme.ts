'use client';

import { Container, createTheme, type MantineColorsTuple } from '@mantine/core';
import cx from 'clsx';
import classes from './src/utils/responsiveConainer.module.scss'

// Define custom colors as Mantine-compatible tuples (10 shades each)
const green: MantineColorsTuple = [
  '#f4fbf1', '#e7f5df', '#dcefd1', '#cde2be', '#bed6ab',
  '#b3cd9e', '#aac692', '#9cba81', '#8dad71', '#789b5a',
];

const yellow: MantineColorsTuple = [
  '#fffbea', '#fff3c4', '#ffe992', '#ffe069', '#fdd94d',
  '#fcd438', '#f4d35e', '#e7c246', '#dcb230', '#cba117',
];

const amber: MantineColorsTuple = [
  '#fff2ec', '#fcdccf', '#fac5b0', '#f9ae90', '#f79773',
  '#f68a63', '#ee964b', '#d77f37', '#c16925', '#ab5314',
];

const slate: MantineColorsTuple = [
  '#f1f3f2', '#dde1e0', '#c8cecc', '#b1bab7', '#9aa6a3',
  '#84928f', '#6f7f7b', '#5b6b67', '#475753', '#2f3e46',
];

const honey: MantineColorsTuple = [
  '#fefbf3', '#fcf5e1', '#faefcd', '#f9e9bb', '#f8e4aa',
  '#f7dfa0', '#f7e9c4', '#e4d3aa', '#d1bd92', '#bda87a',
];

export const theme = createTheme({
  colors: {
    green,
    yellow,
    amber,
    slate,
    honey,
  },
  primaryColor: 'yellow',
  primaryShade: 6,

  headings: {
    fontFamily: 'inherit',
    sizes: {
      h1: { fontSize: '2.5rem' },
      h2: { fontSize: '2rem' },
      h3: { fontSize: '1.75rem' },
    },
  },

  fontFamily: 'Inter, sans-serif',
  defaultRadius: 'md',
  defaultGradient: { from: 'yellow.6', to: 'amber.6', deg: 45 },

  components: {
    Button: {
      styles: (theme: any) => ({
        root: {
          backgroundColor: theme.colors.yellow[6],
          color: theme.colors.slate[9],
          '&:hover': {
            backgroundColor: theme.colors.amber[6],
          },
        },
      }),
    },
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
  },
});
