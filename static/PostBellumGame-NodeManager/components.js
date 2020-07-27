class LocationComponent extends Rete.Component {
    constructor(){
        super("Location");
    }

    builder(node) {
        var name = new TextControl(this.editor, 'name', {placeholder: "name"});
        var text = new LongTextControl(this.editor, 'description', {placeholder: "description", id:"vertical"});
        var bg = new ImageControl(this.editor, 'background', node.id);
        var inp = new Rete.Input('locations', "Inputs", locationSocket, true);
        var out = new Rete.Output('choices', "Outputs", choiceSocket);

        return node
            .addInput(inp)
            .addControl(name)
            .addControl(text)
            .addControl(bg)
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.id;
    }
}

class ChoiceComponent extends Rete.Component {
    constructor(){
        super("Choice");
    }

    builder(node) {
        var name = new LongTextControl(this.editor, 'name', {placeholder: "name", id:"horizontal"});
        var inp = new Rete.Input('input', "Inputs", choiceSocket, true);
        var out = new Rete.Output('output', "Outputs", locationSocket);

        return node
            .addInput(inp)
            .addControl(name)
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.id;
    }
}

class StartComponent extends Rete.Component {
    constructor(){
        super("Start");
    }

    builder(node) {
        var out = new Rete.Output('output', "Start", locationSocket);

        return node
            .addOutput(out);
    }

    worker(node, inputs, outputs) {
        outputs['num'] = node.id;
    }
}