head.js('static/PostBellumGame-NodeManager/lib/rete.min.js', 'static/PostBellumGame-NodeManager/lib/vue.min.js', 'static/PostBellumGame-NodeManager/lib/vue-render-plugin.min.js', 'static/PostBellumGame-NodeManager/lib/connection-plugin.min.js', 'static/PostBellumGame-NodeManager/lib/minimap-plugin.min.js', 'static/PostBellumGame-NodeManager/lib/lodash.min.js', 'static/PostBellumGame-NodeManager/lib/alight.min.js', 'static/PostBellumGame-NodeManager/lib/context-menu-plugin.min.js',
    function() {
head.js('static/PostBellumGame-NodeManager/controls.js', 'static/PostBellumGame-NodeManager/components.js', function() {

(async () => {
    var container = document.querySelector('#rete');
    var components = [new LocationComponent(), new ChoiceComponent(), new StartComponent()];
    
    var editor = new Rete.NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin.default);
    editor.use(VueRenderPlugin.default); 
    editor.use(ContextMenuPlugin.default);
    editor.use(MinimapPlugin.default);   

    var engine = new Rete.Engine('demo@0.1.0');
    
    components.map(c => {
        editor.register(c);
        engine.register(c);
    });

    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
      console.log('process');
        await engine.abort();
        await engine.process(editor.toJSON());
        console.log(editor.toJSON());
    });

    editor.view.resize();
    //AreaPlugin.zoomAt(editor);
    editor.trigger('process');

})();

});
});