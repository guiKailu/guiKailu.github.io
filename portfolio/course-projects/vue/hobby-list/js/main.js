Vue.component("app-hobby", {
  props: [
    "hobby"
  ],
  template: `
    <li v-on:click="removeHobby(hobby)">{{ hobby }}</li>
  `,
  methods: {
    removeHobby(){
      this.$emit('hobbyremoved', this.hobby);
    }
  }
});

Vue.component("app-hobby-list", {
  data: function () {
    return {
      hobbies: [
        "swimming",
        "dancing",
        "hiking"
      ],
      red: 'red',
      blue: 'blue',
      userHobby: "",
      hobbyWasDeleted: false,
      deleted: "Hobby deleted!"
    }
  },
  template:  `
    <div>
      <input type="text" v-model="userHobby" v-on:keydown="clearMessage">
      <button @click="addHobby">Add New Hobby</button>
      <div v-if="hobbyWasDeleted">
        <p>{{ deleted }}</p>
      </div>
      <p
        :class="{
          'multiple-hobbies': hobbies.length > 3
        }">Number of hobbies:
        <span :style="{
          color: hobbies.length > 3 ? red : blue,
          fontSize: hobbies.length > 3 ? hobbies.length * 5 + 'px' : '1em'
        }">{{ hobbies.length }}</span>
      </p>
      <ul>
        <app-hobby v-for="hby in hobbies" v-bind:hobby="hby" @hobbyremoved="removeHobby($event)"></app-hobby>
      </ul>

    </div>`,
    methods: {
      addHobby(){
        this.hobbies.push(this.userHobby);
        this.userHobby = '';
      },
      removeHobby(hobby){
        var position = this.hobbies.indexOf(hobby);
        this.hobbies.splice(position, 1);
        this.hobbyWasDeleted = true;
      },
      clearMessage(){
        this.hobbyWasDeleted = false;
      }
    }
});

new Vue({ el: "#app" });
