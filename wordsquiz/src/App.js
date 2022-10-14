import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";

export default function App() {
  return (
    <Container>
      <Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <TextField id="outlined-basic" label="Test 1" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-basic" label="test 2" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <TextField id="outlined-basic" label="test 3" variant="outlined" />
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained">OK</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
