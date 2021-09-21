<template>
  <div class="container mx-auto">
    <header class="w-full h-20 flex justify-end items-center mb-10">
      <div class="flex">
        <div class="flex items-center justify-between mr-4">
          <p class="text-5xl mr-1">{{dateObj.date}}</p>
          <p class="flex flex-col">
            <span>{{dateObj.month}}</span>
            <span>{{dateObj.year}}</span>
          </p>
        </div>
        <button type="button" class="bg-transparent border-2 border-black px-3
          rounded-full hover:bg-gray-300">
          新增具體項目
        </button>
      </div>
    </header>
    <h1 class="text-center text-7xl font-extrabold mb-10">TO - DO - LIST</h1>
    <div class="w-2/4 mx-auto h-14 mb-10">
      <div class="w-full h-full rounded-full bg-white px-10 shadow-md hover:shadow-lg">
        <input type="text" class="w-full h-full focus:outline-none text-xl" id="inputText"
         @keyup.enter='addList'/>
      </div>
    </div>

    <main class="grid grid-cols-3 gap-10 h-96">
      <section class="text-center border-t-8 border-yellow-400 bg-gray-50
       shadow-md h-full rounded overflow-auto">
        <h2 class="text-4xl text-gray-600 py-5 top-0 scrolll">TO DO</h2>
        <ul class="grid grid-cols-2 px-5 gap-5">
          <li v-for='item in todoList' :key='item.id' >
            <div class="border-2 border-gray-600 border-opacity-40">
              <h3 class="text-2xl font-bold">{{item.title}}</h3>
              <button @click="item.state = 'doing'">下一步</button>
              <div>{{item.content}}</div>
              <button @click='removeList(item.id)'>查看/編輯</button>
              <button @click='removeList(item.id)'>刪除</button>
            </div>
          </li>
        </ul>
      </section>

      <section class="text-center border-t-8 border-blue-300 bg-gray-50
       shadow-md h-full rounded">
        DOING
        <ul>
          <li v-for='item in doingList' :key='item.id' >
            <input type='checkbox' v-model='item.complete'>
            <span :class='{dele:item.complete}' >{{item.content}}</span>
            <button @click='removeList(item.id)'>移除</button>
          </li>
        </ul>
      </section>

      <section class="text-center border-t-8 border-green-300 bg-gray-50
       shadow-md h-full rounded">
        DONE
        <ul>
          <li v-for='item in doneList' :key='item.id' >
            <input type='checkbox' v-model='item.complete'>
            <span :class='{dele:item.complete}' >{{item.content}}</span>
            <button @click='removeList(item.id)'>移除</button>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue';

export default {

  name: 'Home',
  data() {
    return {
      dateObj: {
        year: '',
        month: '',
        date: '',
      },
      workList: [],
      // scrollHeight: '',
      // scrollTop: '',
    };
  },
  created() {
    this.getTime();
    // const tt = document.querySelector('.scrolll').scrollHeight;
  },
  components: {
  },
  computed: {
    todoList() {
      return this.workList.filter((item) => item.state === 'todo');
    },
    doingList() {
      return this.workList.filter((item) => item.state === 'doing');
    },
    doneList() {
      return this.workList.filter((item) => item.state === 'done');
    },
  },
  methods: {
    getTime() {
      const mydate = new Date();
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
        'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      this.dateObj.year = mydate.getFullYear();
      this.dateObj.month = months[mydate.getMonth()];
      this.dateObj.date = mydate.getDate();
    },
    addList(event) {
      if (!event.target.value) return;
      const timeStamp = Math.floor(Date.now());
      const msg = event.target.value.trim();
      const newItem = {
        id: timeStamp,
        state: 'todo',
        title: msg,
      };
      this.workList.push(newItem);
      this.$nextTick(() => {
        document.getElementById('inputText').value = '';
      });
    },
  },
};
</script>

<style lang="scss">

</style>
