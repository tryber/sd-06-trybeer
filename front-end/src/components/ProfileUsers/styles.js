import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#fbb80f',
    // margin: '0',
    // padding: '0',
    height: '100vh',
    textAlign: 'center',
    paddingTop: '100px',
  },
  nameContainer: {
    margin: '10px 10px 10px 10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
  buttonContainer: {
    margin: '10px 10px 10px 10px',
    textAlign: 'right',
  },
  buttonField: {
    fontSize: '15px',
    padding: '5px 5px 0px 5px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
}));
export default useStyles;
