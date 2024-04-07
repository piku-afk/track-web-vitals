import { createTheme, Skeleton } from '@mantine/core';

const mantineTheme = createTheme({
  components: {
    Skeleton: Skeleton.extend({
      vars: () => ({
        root: {
          ' --mantine-color-body': ' #282a36',
          ' --mantine-color-dark-4': '#1d1b22',
        },
      }),
    }),
    Text: {
      defaultProps: { c: '#f8f8f2' },
    },
  },
});

export default mantineTheme;
