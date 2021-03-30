import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardGrid: {
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80vw',
    // Os 3 primeiros ajeitam o card com header/entre si
    padding: '0px 10px 0px 10px',
    margin: '20px 10px auto 10px',
    transform: 'translateY(70px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
  },
  quantityContainer: {
    fontSize: '35px',
    fontWeight: '600',
  },
  nameContainer: {
    fontSize: '35px',
    fontWeight: '600',
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  unityPrice: {
    fontSize: '20px',
  },
  deleteContainer: {
    padding: '0',
    marginLeft: '10px',
  },
}));

export default useStyles;
