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
      <Droppable droppableId={this.props.column.id}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <List
              subheader={
                <ListSubheader>{this.props.column.title}</ListSubheader>
              }
              className={classes.root}
            >
              {this.props.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {provided => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <ListItem>
                        <ListItemText primary={task.content} />
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
    );
  }
}

Column.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Column);
