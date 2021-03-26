import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 80,
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: 15,
    margin: 20,
    maxWidth: 500,
  },
}));

export default useStyles;
