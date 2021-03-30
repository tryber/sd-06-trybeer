import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    backgroundColor: '#fbb80f',
    paddingBottom: '100px',
    height: '100%',
    justifyContent: 'center',
  },
  cardGrid: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '70vw',
    // Os 3 primeiros ajeitam o card com header/entre si
    padding: '0px 10px 0px 10px',
    margin: '20px 10px auto 10px',
    transform: 'translateY(70px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    '&:hover': {
      backgroundColor: '#32325b',
      color: 'white',
    },
  },
  titleContainer: {
    fontSize: '35px',
    fontWeight: '600',
    textAlign: 'left',
  },
  priceContainer: {
    fontSize: '40px',
    fontWeight: '600',
    textAlign: 'right',
  },
  adressContainer: {
    fontSize: '40px',
    fontWeight: '600',
    textAlign: 'left',
  },
  statusContainer: {
    fontSize: '35px',
    fontWeight: '600',
    textAlign: 'right',
  },
}));

export default useStyles;
