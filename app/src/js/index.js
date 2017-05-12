/**
 * Created by White on 2017/5/12.
 */
new Vue({
  el: '#app',
  data: {
    list: [
      {
        "name": "jin1"
      },
      {
        "name": "jin2"
      },
      {
        "name": "jin3"
      },
    ],
    activeIndex: '1',
    activeIndex2: '1'
  },
  methods: {
    deleteItem: function (index) {
      this.list.splice(index, 1);
    },
    handleSelect: function(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted: function () {
    
  }
});