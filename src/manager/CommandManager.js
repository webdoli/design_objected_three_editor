export class CommandManager {
    
    constructor() {
        this.history = [];
        this.redoStack = [];
    }

    execute( command ) {
        command.execute();
        this.history.push( command );
        this.redoStack = [];
    }

    undo() {
        const command = this.history.pop();
        if( command ) {
            command.undo();
            this.redoStack.push( command );
        }
    }

    redo() {
        const command = this.redoStack.pop();
        if( command ) {
            command.execute();
            this.history.push( command );
        }
    }

}