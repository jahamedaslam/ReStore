import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";



export default function AboutPage(){
const [validationErrors, setValidationErrors] = useState<string[]>([]);

function getValidationError(){
    agent.TestError.getValidationError()
    .then(()=> console.log('should not see this'))
    .catch(error=> setValidationErrors(error));
}

    return(
        <Container>
            <Typography gutterBottom variant="h2">Error For Testing Purpose</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => agent.TestError.get400Error().catch(error=>console.log(error))}>Test Error 400</Button>
                <Button variant="contained" onClick={() => agent.TestError.get401Error().catch(error=>console.log(error))}>Test Error 401</Button>
                <Button variant="contained" onClick={() => agent.TestError.get404Error().catch(error=>console.log(error))}>Test Error 404</Button>
                <Button variant="contained" onClick={() => agent.TestError.get500Error().catch(error=>console.log(error))}>Test Error 500</Button>
                <Button variant="contained" onClick={getValidationError}>Test Validation Error</Button>
            </ButtonGroup>

            {validationErrors.length>0 &&
                <Alert severity="error">
                    <AlertTitle>Validation Error</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key = {error}>
                            <ListItemText>{error}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            }
        </Container>
    )

}