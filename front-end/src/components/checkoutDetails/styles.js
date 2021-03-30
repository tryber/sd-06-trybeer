import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '90px',
  },
  cardGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80vw',
  },
  totalValueContainer: {
    alignSelf: 'flex-end',
    fontSize: '35px',
    fontWeight: '600',
  },
  formContainer: {
    alignSelf: 'flex-start',
    width: '80vw',
  },
  adressContainer: {
    margin: '10px 0px 0px 0px',
    fontSize: '35px',
    fontWeight: '400',
  },
  buttonContainer: {
    margin: '10px 0px 0px 0px',
    backgroundColor: '#32325b',
    color: 'white',
    fontWeight: '600',
    fontSize: '30px',
    '&:hover': {
      backgroundColor: '#32325b',
    },
  },
}));
export default useStyles;
