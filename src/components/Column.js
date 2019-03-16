import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Droppable, Draggable } from "react-beautiful-dnd";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class Column extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Draggable draggableId={this.props.activity.id} index={this.props.index}>
        {provided => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Droppable droppableId={this.props.activity.id} type="detail">
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <List
                    subheader={
                      <ListSubheader>{this.props.activity.title}</ListSubheader>
                    }
                    className={classes.root}
                  >
                    {this.props.details.map((detail, index) => (
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

export default withStyles(styles)(Column);
