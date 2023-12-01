import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

const NoResultsFoundCard = () => {
  return(
    <Card className='no-result-card' sx={{width:"100%", margin: "auto", marginBottom: "1rem", height:"fit-content", borderRadius: "10px"}} >
      <CardActionArea sx={{height: "100%"}}>
        <CardContent sx={{textAlign: 'center'}}>
          <Typography gutterBottom variant="h5" component="div">
            {'Oops! No results found!'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NoResultsFoundCard