
var numSocket = new Rete.Socket('Number value');

var VueNumControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
  template: '<input type="number" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""/>',
  data() {
    return {
      value: 0,
    }
  },
  methods: {
    change(e){
      this.value = +e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}

class NumControl extends Rete.Control {

  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueNumControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}



var textSocket = new Rete.Socket('Text value');

var VueTextControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData', 'placeholder'],
  template: '<input type="text" :placeholder="placeholder" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""/>',
  data() {
    return {
      value: "",
    }
  },
  methods: {
    change(e){
      this.value = e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}

class TextControl extends Rete.Control {

  constructor(emitter, key, {readonly, placeholder}={}) {
    super(key);
    this.component = VueTextControl;
    this.props = { emitter, ikey: key, readonly, placeholder };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}



var longTextSocket = new Rete.Socket('Text value');

var VueLongTextControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData', 'placeholder', 'id'],
  template: '<textarea type="text" :class="id" :placeholder="placeholder" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""/>',
  data() {
    return {
      value: "",
    }
  },
  methods: {
    change(e){
      this.value = e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}

class LongTextControl extends Rete.Control {

  constructor(emitter, key, {readonly, placeholder, id}={}) {
    super(key);
    this.component = VueLongTextControl;
    this.props = { emitter, ikey: key, readonly, placeholder, id};
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}




var imageSocket = new Rete.Socket('Text value');

var VueImageControl = {
  props: ['emitter', 'ikey', 'getData', 'putData', 'identifier', 'id'],
  template: '<div class="imageViewer"><img class="imageViewer" alt="Background image" ><br><form action="/admin" method="POST" enctype=multipart/form-data><input type="text" name="id" style="visibility: hidden; height:0px" :value="id"><input class="imageViewer" name="file" type="file" :value="value" @input="change($event)" @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""/></form></div>',
  data() {
    return {
      value: "",
      id: -1
    }
  },
  methods: {
    change(e){
      this.update();
    },
    update() {
      if (this.ikey){
        this.putData(this.ikey, "1")
      }
      blocking_save();
      this.$el.children[2].submit();
    }
  },
  mounted() {
    if(this.getData(this.ikey))
      this.$el.firstChild.src = "/static/img/"+this.id+"?_=" + new Date().getTime();  // added to avoid image caching
  }
}

class ImageControl extends Rete.Control {

  constructor(emitter, key, identifier) {
    super(key);
    this.component = VueImageControl;
    this.props = { emitter, ikey: key, id: identifier};
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}




var locationSocket = new Rete.Socket("Location value");

class LocationControl extends Rete.Control {

  constructor(emitter, key) {
    super(key);
    this.component = VueTextControl;
    this.props = { emitter, ikey: key};
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}




var choiceSocket = new Rete.Socket("Choice value");

class ChoiceControl extends Rete.Control {

  constructor(emitter, key) {
    super(key);
    this.component = VueTextControl;
    this.props = { emitter, ikey: key };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}



