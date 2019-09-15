// react
import React from "react";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import EmailIcon from "@material-ui/icons/Email";
import WebIcon from "@material-ui/icons/Web";
import StarIcon from "@material-ui/icons/Star";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

/* const theme = createMuiTheme({
  overrides: {
    MuiSvgIcon: {
      root: {
        fill: "#85754E",
        fontSize: "20px"
      }
    }
  }
}); */

const useStyles = makeStyles({
  container: {
    //display: "grid",
    //alignItems: "center",
    //gridTemplateColumns: "8% 22% auto",
    //gridGap: "22px 5px"
  }
});

function SettingsAboutTab() {
  const classes = useStyles();
  return (
    <Card>
      {/* <MuiThemeProvider theme={theme}> */}
      <CardContent className={classes.container}>
        <ContactSupportIcon />
        <Typography>Version</Typography>
        <Typography>1.0.0</Typography>
        <PermIdentityIcon />
        <Typography>Created by</Typography>
        <Typography>Sean LEE</Typography>
        <EmailIcon />
        <Typography>Email</Typography>
        <Link href="mailto:seanleecoder@gmail.com">seanleecoder@gmail.com</Link>
        <WebIcon />
        <Typography>Github</Typography>
        <Link
          href="https://github.com/ilovepku/"
          target="_blank"
          rel="noopener"
        >
          https://github.com/ilovepku/
        </Link>
        <StarIcon />
        <Typography>Credits</Typography>
        <Typography>
          <strong>- @material-ui</strong> for UI components
          <br />
          <strong>- nanoid</strong> as ID generator
          <br />
          <strong>- react-beautiful-dnd</strong> for drag and drop lists
          <br />
          <strong>- create-react-app</strong>
          <br />
          <strong>- victory</strong> for data visualization
        </Typography>
      </CardContent>
      {/* </MuiThemeProvider> */}
    </Card>
  );
}

export default SettingsAboutTab;
