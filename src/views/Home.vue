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
        <button type="button" class="bg-transparent border-2 border-black px-3 rounded-full hover:bg-gray-300" @click="showModal = true;">
          新增具體項目
        </button>
      </div>
    </header>

    <!-- Modal -->
    <ItemModal v-if="showModal" @close="showModal = false" @add="addListDetail"/>

    <h1 class="text-center text-7xl font-extrabold mb-10">TO - DO - LIST</h1>
    <div class="w-2/4 mx-auto h-14 mb-10">
      <div class="w-full h-full rounded-full bg-white px-10 shadow-md hover:shadow-lg">
        <input type="text" class="w-full h-full focus:outline-none text-xl" id="inputText"
         @keyup.enter='addList'/>
      </div>
    </div>

    <main class="grid grid-cols-3 gap-10 main-h">
      <section class="text-center border-t-8 border-yellow-400 bg-gray-50 shadow-md h-full rounded overflow-auto scrolll relative">
        <h2 class="text-3xl text-gray-600 py-2 bg-yellow-400 sticky z-10 transform transition-transform ease-in-out duration-700 top-0"
         :class="{'-translate-y-14':!(scroll.todoScroll)}">TO-DO</h2>
        <h2 class="text-3xl text-gray-600 py-4 w-full absolute top-0 z-0">TO-DO</h2>
        <draggable v-model="todoList" group="list"  animation="200" @add="resetState(todoList, 'todo')" class="grid grid-cols-1 p-5 gap-5">
          <div v-for='(item,index) in todoList' :key='item.id'>
            <ItemModal v-if="showInsideModal === item.id" v-bind="item" :index="index" @close="showInsideModal = false" @add="addListDetail"/>
            <div class="border-2 border-gray-600 border-opacity-40 bg-gray-100 relative transition-shadow duration-500 hover:shadow-md hover:bg-gray-50">
              <div class="absolute top-2/4 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-full hover:animate-ping" style="width:1.875rem;height:1.875rem"></div>
              <div class="absolute top-2/4 left-0 transform -translate-x-1/2 -translate-y-1/2 bg-gray-600 rounded-full" style="height:1.875rem">
                <font-awesome-icon icon="chevron-circle-right" rotation="180" class="text-3xl text-gray-300"/>
              </div>
              <div class="group absolute top-2/4 right-0 transform translate-x-1/2 -translate-y-1/2" style="width:1.875rem;height:1.875rem">
                <div class="absolute rounded-full bg-primary w-full h-full opacity-50 group-hover:animate-ping"></div>
                <div class="relative rounded-full bg-gray-500 w-full h-full group-hover:bg-primary">
                  <font-awesome-icon icon="chevron-circle-right" @click="nextList(item,index)" class="text-3xl text-gray-200"/>
                </div>
              </div>
              <div class="group mx-8">
                <h3 class="text-2xl font-bold group-hover:text-primary overflow-ellipsis overflow-hidden">
                  {{item.title}}
                </h3>
                <div class="mb-1 multiline-ellipsis">
                  {{item.content}}
                </div>
                <div class="flex border-t-2 border-gray-600 border-opacity-40 mb-1">
                  <button class="flex-1 p-1" @click='showInsideModal = item.id'><font-awesome-icon icon="list-ul" class="text-lg text-gray-500 group-hover:text-primary"/></button>
                  <span class="flex-auto border-l-2 border-r-2 border-gray-600 border-opacity-40 p-1 inline-block" v-if="!(item.due_date)">新增日：{{dateObj.month}} {{dateObj.date}} </span>
                  <span class="flex-auto border-l-2 border-r-2 border-gray-600 border-opacity-40 p-1 inline-block text-red-600" v-if="item.due_date">期限日：{{item.due_date | dateFilter}} </span>
                  <button class="flex-1 p-1" @click='removeList(item,index)'><font-awesome-icon icon="trash-alt" class="text-lg text-gray-500 group-hover:text-red-500"/></button>
                </div>
              </div>
            </div>
          </div>
        </draggable>
      </section>

      <section class="text-center border-t-8 border-blue-300 bg-gray-50
       shadow-md h-full rounded overflow-auto scrolll relative">
        <h2 class="text-3xl text-gray-600 py-2 bg-blue-300 sticky z-10
         transform transition-transform ease-in-out duration-700 top-0"
         :class="{'-translate-y-14':!(scroll.doingScroll)}">DOING</h2>
        <h2 class="text-3xl text-gray-600 py-4 w-full absolute top-0 z-0">DOING</h2>
        <draggable v-model="doingList" group="list" animation="200" @add="resetState(doingList, 'doing')" class="grid grid-cols-1 p-5 gap-5">
          <div v-for='(item,index) in doingList' :key='item.id'>
            <ItemModal v-if="showInsideModal === item.id" v-bind="item" :index="index" @close="showInsideModal = false" @add="addListDetail"/>
            <div class="border-2 border-gray-600 border-opacity-40 bg-gray-100 relative transition-shadow duration-500 hover:shadow-md hover:bg-gray-50">
              <div class="group absolute top-2/4 left-0 transform -translate-x-1/2 -translate-y-1/2" style="width:1.875rem;height:1.875rem">
                <div class="absolute rounded-full bg-primary w-full h-full opacity-50 group-hover:animate-ping"></div>
                <div class="relative rounded-full bg-gray-500 w-full h-full group-hover:bg-primary">
                  <font-awesome-icon icon="chevron-circle-right" rotation="180" @click="item.state = 'doing'" class="text-3xl text-gray-200"/>
                </div>
              </div>
              <div class="group absolute top-2/4 right-0 transform translate-x-1/2 -translate-y-1/2" style="width:1.875rem;height:1.875rem">
                <div class="absolute rounded-full bg-primary w-full h-full opacity-50 group-hover:animate-ping"></div>
                <div class="relative rounded-full bg-gray-500 w-full h-full group-hover:bg-primary">
                  <font-awesome-icon icon="chevron-circle-right" @click="item.state = 'doing'" class="text-3xl text-gray-200"/>
                </div>
              </div>
              <div class="group mx-8">
                <h3 class="text-2xl font-bold group-hover:text-primary overflow-ellipsis overflow-hidden">
                  {{item.title}}
                </h3>
                <div class="mb-1 multiline-ellipsis">
                  {{item.content}}
                </div>
                <div class="flex border-t-2 border-gray-600 border-opacity-40 mb-1">
                  <button class="flex-1 p-1" @click='showInsideModal = item.id'><font-awesome-icon icon="list-ul" class="text-lg text-gray-500 group-hover:text-primary"/></button>
                  <span class="flex-auto border-l-2 border-r-2 border-gray-600 border-opacity-40 p-1 inline-block" v-if="!(item.due_date)">新增日：{{dateObj.month}} {{dateObj.date}} </span>
                  <span class="flex-auto border-l-2 border-r-2 border-gray-600 border-opacity-40 p-1 inline-block text-red-600" v-if="item.due_date">期限日：{{item.due_date | dateFilter}} </span>
                  <button class="flex-1 p-1" @click='removeList(item,index)'><font-awesome-icon icon="trash-alt" class="text-lg text-gray-500 group-hover:text-red-500"/></button>
                </div>
              </div>
            </div>
          </div>
        </draggable>
      </section>

      <!-- <section class="text-center border-t-8  bg-gray-50
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
      </section> -->
    </main>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import ItemModal from '@/components/ItemModal.vue';

export default {
  name: 'Home',
  data() {
    return {
      dateObj: {
        year: '',
        month: '',
        date: '',
      },
      todoList: [],
      doingList: [],
      doneList: [],
      scroll: {
        todoScroll: false,
        doingScroll: false,
        doneScroll: false,
      },
      showModal: false,
      showInsideModal: false,
      // modalObj: {
      //   id: '',
      //   title: '',
      //   description: '',
      //   state: '',
      //   due_date: '',
      // },
    };
  },
  created() {
    this.getTime();
  },
  mounted() {
    const scrollArray = [...document.querySelectorAll('.scrolll')];
    scrollArray.forEach((currentValue, index) => currentValue.addEventListener('scroll', (e) => {
      switch (index) {
        case 0:
          if (e.target.scrollTop > 70) { this.scroll.todoScroll = true; break; }
          this.scroll.todoScroll = false;
          break;
        case 1:
          if (e.target.scrollTop > 70) { this.scroll.doingScroll = true; break; }
          this.scroll.doingScroll = false;
          break;
        default:
          if (e.target.scrollTop > 70) { this.scroll.doneScroll = true; break; }
          this.scroll.doneScroll = false;
      }
    }, true));
  },
  components: {
    draggable,
    ItemModal,
  },
  // computed: {
  //   todoList() {
  //     return this.workList.filter((item) => item.state === 'todo');
  //   },
  //   doingList() {
  //     return this.workList.filter((item) => item.state === 'doing');
  //   },
  //   doneList() {
  //     return this.workList.filter((item) => item.state === 'done');
  //   },
  // },
  methods: {
    // handleScroll(e, index) {
    //   // this.scrollTop = e.target.scrollTop;
    // },
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
        description: '',
        due_date: '',
      };
      this.todoList.push(newItem);
      this.$nextTick(() => {
        document.getElementById('inputText').value = '';
      });
    },
    nextList(item, index) {
      if (item.state === 'todo') {
        this.todoList.splice(index, 1);
        item.state = 'doing';
        this.doingList.push(item);
      }
    },
    addListDetail(modalObj, index) {
      if (!modalObj.id) {
        const timeStamp = Math.floor(Date.now());
        modalObj.id = timeStamp;
        switch (modalObj.state) {
          case 'todo':
            this.todoList.push(modalObj);
            this.resetModalObj();
            this.showModal = false;
            break;
          case 'doing':
            this.doingList.push(modalObj);
            this.resetModalObj();
            this.showModal = false;
            break;
          default:
            this.doneList.push(modalObj);
            this.resetModalObj();
            this.showModal = false;
        }
      } else {
        switch (modalObj.state) {
          case 'todo':
            this.todoList.splice(index, 1, modalObj);
            this.showInsideModal = false;
            break;
          case 'doing':
            this.doingList.splice(index, 1, modalObj);
            this.showInsideModal = false;
            break;
          default:
            this.doneList.splice(index, 1, modalObj);
            this.showInsideModal = false;
        }
      }
    },
    resetModalObj() {
      this.modalObj = {
        id: '',
        title: '',
        description: '',
        state: '',
        due_date: '',
      };
    },
    removeList(item, index) {
      switch (item.state) {
        case 'todo':
          this.todoList.splice(index, 1);
          break;
        case 'doing':
          this.doingList.splice(index, 1);
          break;
        default:
          this.doneList.splice(index, 1);
      }
    },
    resetState(currentArray, state) {
      currentArray.forEach((currentValue) => {
        if (!(currentValue.state === state)) {
          currentValue.state = state;
        }
      });
    },
  },
};
</script>

<style lang="scss">
  .main-h {
    height: 30rem;
  }
  .multiline-ellipsis {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
