import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function SettingsAboutTab() {
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography>PWA Quanto</Typography>
          <Typography>Version 1.0.0</Typography>
          <Typography>Created by Sean LEE</Typography>
          <Typography>
            Email:{" "}
            <Link href="mailto:seanleecoder@gmail.com">
              seanleecoder@gmail.com
            </Link>
          </Typography>
          <Typography>
            Github:{" "}
            <Link
              href="https://github.com/ilovepku/"
              target="_blank"
              rel="noopener"
            >
              https://github.com/ilovepku/
            </Link>
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography>Credits</Typography>
          <Typography>
            Thanks to the creators of the following libraries:
          </Typography>
          <Typography>- @material-ui for UI components</Typography>
          <Typography>- localforage for offline storage</Typography>
          <Typography>- nanoid as ID generator</Typography>
          <Typography>- notistack for notification snackbars</Typography>
          <Typography>- react-beautiful-dnd for drag and drop lists</Typography>
          <Typography>- create-react-app, redux, react-redux</Typography>
          <Typography>- redux-persist to persist redux store</Typography>
          <Typography>- victory for data visualization</Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default SettingsAboutTab;
