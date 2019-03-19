import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Droppable, Draggable } from "react-beautiful-dnd";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteActivityName, deleteDetailName } from "../actions";

const mapDispatchToProps = dispatch => {
  return {
    deleteActivityName: payload => dispatch(deleteActivityName(payload)),
    deleteDetailName: payload => dispatch(deleteDetailName(payload))
  };
};

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class Column extends React.Component {
  render() {
    const {
      classes,
      activity,
      index,
      details,
      deleteActivityName,
      deleteDetailName
    } = this.props;
    return (
      <Draggable draggableId={activity.id} index={index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Droppable droppableId={activity.id} type="detail">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <List
                    subheader={
                      <ListSubheader>
                        {activity.title}
                        <ListItemIcon>
                          <DeleteIcon
                            onClick={() => deleteActivityName(activity.id)}
                          />
                        </ListItemIcon>
                      </ListSubheader>
                    }
                    className={classes.root}
                  >
                    {details.map((detail, index) => (
                      <Draggable
                        key={detail.id}
                        draggableId={detail.id}
                        index={index}
                      >
                        {provided => (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <ListItem>
                              <ListItemText primary={detail.content} />
                              <ListItemIcon>
                                <DeleteIcon
                                  onClick={() =>
                                    deleteDetailName({
                                      activityId: activity.id,
                                      detailId: detail.id
                                    })
                                  }
                                />
                              </ListItemIcon>
                            </ListItem>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </List>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }
}

Column.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(Column)
);
