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

    <main class="grid lg:grid-cols-3 md:grid-cols-2 gap-10 mx-6">

      <section class="text-center border-t-8 border-yellow-300 bg-gray-50 shadow-md item-height rounded overflow-auto scrolll relative">
        <h2 class="text-3xl text-gray-600 py-2 bg-yellow-300 sticky z-10 transform transition-transform ease-in-out duration-700 top-0"
         :class="{'-translate-y-14':!(scroll.todoScroll)}">TO-DO</h2>
        <h2 class="text-3xl text-gray-600 py-4 w-full absolute top-0 z-0">TO-DO</h2>
        <draggable v-model="todoList" group="list"  animation="200" @add="resetState(todoList, 'todo')" class="grid grid-cols-1 p-5 gap-5">
          <div v-for='(item,index) in todoList' :key='item.id'>
            <ItemModal v-if="showInsideModal === item.id" v-bind="item" :index="index" @close="showInsideModal = false" @add="addListDetail"/>
            <ItemFrame v-bind="item" :index="index" :month="dateObj.month" :date="dateObj.date" @show-modal="showInsideModal = item.id"
             @remove-item="removeItem(item,index)" @last-list="lastList(item,index)" @next-list="nextList(item,index)"/>
          </div>
        </draggable>
      </section>

      <section class="text-center border-t-8 border-blue-300 bg-gray-50 shadow-md item-height rounded overflow-auto scrolll relative">
        <h2 class="text-3xl text-gray-600 py-2 bg-blue-300 sticky z-10 transform transition-transform ease-in-out duration-700 top-0"
         :class="{'-translate-y-14':!(scroll.doingScroll)}">DOING</h2>
        <h2 class="text-3xl text-gray-600 py-4 w-full absolute top-0 z-0">DOING</h2>
        <draggable v-model="doingList" group="list" animation="200" @add="resetState(doingList, 'doing')" class="grid grid-cols-1 p-5 gap-5">
          <div v-for='(item,index) in doingList' :key='item.id'>
            <ItemModal v-if="showInsideModal === item.id" v-bind="item" :index="index" @close="showInsideModal = false" @add="addListDetail"/>
            <ItemFrame v-bind="item" :index="index" :month="dateObj.month" :date="dateObj.date" @show-modal="showInsideModal = item.id"
             @remove-item="removeItem(item,index)" @last-list="lastList(item,index)" @next-list="nextList(item,index)"/>
          </div>
        </draggable>
      </section>

      <section class="text-center border-t-8 border-green-300 bg-gray-50 shadow-md item-height rounded overflow-auto scrolll relative">
        <h2 class="text-3xl text-gray-600 py-2 bg-green-300 sticky z-10 transform transition-transform ease-in-out duration-700 top-0"
         :class="{'-translate-y-14':!(scroll.doneScroll)}">DOING</h2>
        <h2 class="text-3xl text-gray-600 py-4 w-full absolute top-0 z-0">DONE</h2>
        <draggable v-model="doneList" group="list" animation="200" @add="resetState(doneList, 'done')" class="grid grid-cols-1 p-5 gap-5">
          <div v-for='(item,index) in doneList' :key='item.id'>
            <ItemModal v-if="showInsideModal === item.id" v-bind="item" :index="index" @close="showInsideModal = false" @add="addListDetail"/>
            <ItemFrame v-bind="item" :index="index" :month="dateObj.month" :date="dateObj.date" @show-modal="showInsideModal = item.id"
             @remove-item="removeItem(item,index)" @last-list="lastList(item,index)" @next-list="nextList(item,index)"/>
          </div>
        </draggable>
      </section>

    </main>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import ItemModal from '@/components/ItemModal.vue';
import ItemFrame from '@/components/ItemFrame.vue';

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
    ItemFrame,
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
    lastList(item, index) {
      if (item.state === 'doing') {
        this.doingList.splice(index, 1);
        item.state = 'todo';
        this.todoList.push(item);
      } else {
        this.doneList.splice(index, 1);
        item.state = 'doing';
        this.doingList.push(item);
      }
    },
    nextList(item, index) {
      if (item.state === 'todo') {
        this.todoList.splice(index, 1);
        item.state = 'doing';
        this.doingList.push(item);
      } else {
        this.doingList.splice(index, 1);
        item.state = 'done';
        this.doneList.push(item);
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
    removeItem(item, index) {
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
  .item-height {
    max-height: 30rem;
    min-height: 5rem;
  }
  .multiline-ellipsis {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
