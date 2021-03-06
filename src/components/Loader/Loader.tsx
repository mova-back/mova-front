import * as React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

interface IProps {
  className?: string;
}

const Loader: React.FC<IProps> = ({ className }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      className={className}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
