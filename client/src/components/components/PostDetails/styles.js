import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: theme.shape.borderRadius * 2,  // Dynamic border radius
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  card: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: theme.shape.borderRadius * 2,
    margin: theme.spacing(1.25), // Spacing using theme
    flex: 1,
  },
  imageSection: {
    maxWidth: '50%',
    marginLeft: theme.spacing(2.5),
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '100%',
      height: 'auto',   
    },
  },
  recommendedPosts: {
    borderRadius: theme.shape.borderRadius * 2,
    display: 'flex',
    justifyContent: 'space-around',
    gap: theme.spacing(2), // Add spacing between recommended posts
    flexWrap: 'wrap',       // Adjusts for variable screen widths
    // [theme.breakpoints.down('sm')]: {
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   textAlign: 'center',
    // },
    border: `1px solid ${theme.palette.grey[300]}`, // Light border
    padding: theme.spacing(1.5),                    // Inner padding for better spacing
    boxShadow: theme.shadows[1],    
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    height: '39vh',
    backgroundColor: theme.palette.background.paper, // Theme-based background
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),  // Improved spacing
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: theme.spacing(3.75),
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  commentBox: {
    width: '60%',
    marginRight: theme.spacing(3.75),
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  recommendedPost: {
    width: '200px',
    borderRadius: theme.shape.borderRadius * 2,
    margin: '10px',
    cursor: 'pointer',
    border: `1px solid ${theme.palette.grey[300]}`, // Light border
    padding: theme.spacing(1.5),                    // Inner padding for better spacing
    boxShadow: theme.shadows[1],  
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows[3],                  // Slightly stronger shadow on hover
    },  
    
  },
}));
