import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Input from "./Input";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { deleteActivityName, deleteDetailName } from "../actions";

const mapDispatchToProps = dispatch => {
  return {
    deleteActivityName: payload => dispatch(deleteActivityName(payload)),
    deleteDetailName: payload => dispatch(deleteDetailName(payload))
  };
};

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class NestedListItem extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const {
      classes,
      activity,
      index,
      details,
      deleteActivityName,
      deleteDetailName
    } = this.props;
    console.log(activity);
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
                  <ListItem button onClick={this.handleClick}>
                    <ListItemIcon
                      {...provided.dragHandleProps}
                      aria-label="Drag"
                    >
                      <DragIndicatorIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={activity.name} />
                    <ListItemIcon>
                      <DeleteIcon
                        onClick={() => deleteActivityName(activity.id)}
                      />
                    </ListItemIcon>
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {details.map((detail, index) => (
                        <Draggable
                          key={detail.id}
                          draggableId={detail.id}
                          index={index}
                        >
                          {provided => (
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <ListItem button className={classes.nested}>
                                <ListItemIcon
                                  {...provided.dragHandleProps}
                                  aria-label="Drag"
                                >
                                  <DragIndicatorIcon />
                                </ListItemIcon>
                                <Input item={detail} />
                                <ListItemIcon aria-label="Delete">
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
                  </Collapse>
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

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(NestedListItem)
);
