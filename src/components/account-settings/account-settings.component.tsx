// react
import React, { Fragment, useContext } from "react";

// contexts
import { UserContext } from "../../contexts/user/user.context";

// material ui
import { ListSubheader, Divider } from "@material-ui/core";

// components
import AuthListItem from "../auth-list-item/auth-list-item.component";
import BackupRestoreListItem from "../backup-restore-list-item/backup-restore-list-item.component";

const AccountSettings = () => {
  const {
    user: { currentUser }
  } = useContext(UserContext);

  return (
    <Fragment>
      <ListSubheader>Account</ListSubheader>
      <AuthListItem />
      {currentUser && (
        <Fragment>
          <Divider variant="middle" component="li" />
          <BackupRestoreListItem />
        </Fragment>
      )}
    </Fragment>
  );
};

export default AccountSettings;
