import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#fbb80f',
    height: '100vh',
    textAlign: 'center',
    paddingTop: '100px',
  },
  paper: {
    margin: '10px 10px 10px 10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
}));

export default useStyles;
