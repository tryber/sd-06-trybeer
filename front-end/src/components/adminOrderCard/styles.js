import { makeStyles } from '@material-ui/core/styles';

const EIGHT = 8;

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(EIGHT),
    paddingBottom: theme.spacing(EIGHT),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default useStyles;
