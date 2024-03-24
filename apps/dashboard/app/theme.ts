import { createTheme } from '@mantine/core';

const mantineTheme = createTheme({
  components: {
    Text: {
      defaultProps: { c: '#f8f8f2' },
    },
  },
});

export default mantineTheme;
