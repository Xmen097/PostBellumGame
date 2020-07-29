function saveJSON(data, async) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "/admin/save", async);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("data="+data);
}
function blocking_save() {
    engine.abort();
    engine.process(editor.toJSON());
    saveJSON(JSON.stringify(editor.toJSON()), false);
}

head.js('static/PostBellumGame-NodeManager/lib/rete.min.js', 'static/PostBellumGame-NodeManager/lib/vue.min.js', 'static/PostBellumGame-NodeManager/lib/vue-render-plugin.min.js', 'static/PostBellumGame-NodeManager/lib/connection-plugin.min.js', 'static/PostBellumGame-NodeManager/lib/minimap-plugin.min.js', 'static/PostBellumGame-NodeManager/lib/lodash.min.js', 'static/PostBellumGame-NodeManager/lib/alight.min.js', 'static/PostBellumGame-NodeManager/lib/context-menu-plugin.min.js',
    function() {
head.js('static/PostBellumGame-NodeManager/controls.js', 'static/PostBellumGame-NodeManager/components.js', function() {

(async () => {
    var container = document.querySelector('#rete');
    var components = [new LocationComponent(), new ChoiceComponent(), new StartComponent()];
    
    editor = new Rete.NodeEditor('demo@0.1.0', container);
    editor.use(ConnectionPlugin.default);
    editor.use(VueRenderPlugin.default); 
    editor.use(ContextMenuPlugin.default);
    editor.use(MinimapPlugin.default);   

    engine = new Rete.Engine('demo@0.1.0');
    
    components.map(c => {
        editor.register(c);
        engine.register(c);
    });


    var response;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          response = JSON.parse(this.responseText);
          console.log(response);
      }
    };
    xhttp.open("GET", "/static/game.json?_=" + new Date().getTime(), false); //add timestamp to avoid cache
    xhttp.send();
    while(typeof response == "undefined") {}
    await editor.fromJSON(response);

    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
        console.log(editor.toJSON());
        await engine.abort();
        await engine.process(editor.toJSON());
        saveJSON(JSON.stringify(editor.toJSON()), true);
    });

    editor.view.resize();
    editor.trigger('process');

})();

});
});