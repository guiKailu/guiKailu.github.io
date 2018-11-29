Vue.component('app-username', {
  props: ['username'],
  template: `<p v-on:click="usernameClicked">{{ username }}
</p>`,
  methods: {
    usernameClicked() {
      this.$emit('usrclicked', this.username);
    }
  }
});

new Vue({
  el: "#app",
  data: {
    name: 'Max',
    elements: []
  },
  methods: {
    changeName: function() {
      this.name = 'Yann'
    },
    addElement: function(){
      this.elements.push(this.elements.length + 1);
    },
    getColor: function(number){
      return number % 2 == 0 ? 'green' : 'red';
    },
    userWasClicked(name){
      alert(name);
    }
  }
});




new Vue({
  el: "#app2",
  data: {
    message: 'goodness'
  },
  methods: {

  }
});
