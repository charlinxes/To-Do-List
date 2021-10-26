<template>
  <div class="container mx-auto">
    <Header v-bind="dateObj" @show-modal="showModal = true"/>

    <!-- Modal -->
    <ItemModal v-if="showModal" @close="showModal = false" @add="addListDetail"/>

    <h1 class="text-center md:text-7xl text-5xl font-extrabold mb-10">TO - DO - LIST</h1>
    <div class="lg:w-2/4 md:w-3/5 w-3/4 mx-auto h-14 mb-10">
      <div class="w-full h-full rounded-full bg-white px-10 shadow-md hover:shadow-lg">
        <input type="text" class="w-full h-full focus:outline-none text-xl" id="inputText"
         placeholder="請輸入新增項目" @keyup.enter='addListBrief'/>
      </div>
    </div>

    <main class="grid lg:grid-cols-3 md:grid-cols-2 gap-10 md:mx-6 mb-12 mx-10">

      <section class="max-h-99 text-center border-t-8 border-yellow-300 bg-gray-50 shadow-md rounded overflow-y-auto scroll relative">
        <h2 class="text-3xl text-gray-600 py-2 bg-yellow-300 sticky z-10 transform transition-transform ease-in-out duration-700 top-0"
         :class="{'-translate-y-14':!(scroll.todoScroll)}">TO-DO</h2>
        <h2 class="text-3xl text-gray-600 py-4 w-full absolute top-0 z-0">TO-DO</h2>
        <draggable v-model="todoList" group="list" delay="200" animation="200" @add="resetState(todoList, 'todo')" class="grid grid-cols-1 p-5 gap-5">
          <div v-for='(item,index) in todoList' :key='item.id'>
            <ItemModal v-if="showInsideModal === item.id" v-bind="item" :index="index" @close="showInsideModal = false" @add="addListDetail"/>
            <ItemFrame v-bind="item" :index="index" :month="dateObj.month" :date="dateObj.date" @show-modal="showInsideModal = item.id"
             @remove-item="removeItem(item,index)" @last-list="lastList(item,index)" @next-list="nextList(item,index)"/>
          </div>
        </draggable>
      </section>

      <section class="max-h-99 text-center border-t-8 border-blue-300 bg-gray-50 shadow-md rounded overflow-y-auto scroll relative h-auto">
        <h2 class="text-3xl text-gray-600 py-2 bg-blue-300 sticky z-10 transform transition-transform ease-in-out duration-700 top-0"
         :class="{'-translate-y-14':!(scroll.doingScroll)}">DOING</h2>
        <h2 class="text-3xl text-gray-600 py-4 w-full absolute top-0 z-0">DOING</h2>
        <draggable v-model="doingList" group="list"  delay="200" animation="200" @add="resetState(doingList, 'doing')" class="grid grid-cols-1 p-5 gap-5">
          <div v-for='(item,index) in doingList' :key='item.id'>
            <ItemModal v-if="showInsideModal === item.id" v-bind="item" :index="index" @close="showInsideModal = false" @add="addListDetail"/>
            <ItemFrame v-bind="item" :index="index" :month="dateObj.month" :date="dateObj.date" @show-modal="showInsideModal = item.id"
             @remove-item="removeItem(item,index)" @last-list="lastList(item,index)" @next-list="nextList(item,index)"/>
          </div>
        </draggable>
      </section>

      <section class="max-h-99 text-center border-t-8 border-green-300 bg-gray-50 shadow-md rounded overflow-y-auto scroll relative">
        <h2 class="text-3xl text-gray-600 py-2 bg-green-300 sticky z-10 transform transition-transform ease-in-out duration-700 top-0"
         :class="{'-translate-y-14':!(scroll.doneScroll)}">DOING</h2>
        <h2 class="text-3xl text-gray-600 py-4 w-full absolute top-0 z-0">DONE</h2>
        <draggable v-model="doneList" group="list" delay="200" animation="200" @add="resetState(doneList, 'done')" class="grid grid-cols-1 p-5 gap-5">
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
import Header from '@/components/Header.vue';
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
    };
  },
  created() {
    this.getTime();
    if (localStorage.getItem('todoList')) {
      this.todoList = this.storage('todoList');
    }
    if (localStorage.getItem('doingList')) {
      this.doingList = this.storage('doingList');
    }
    if (localStorage.getItem('doneList')) {
      this.doneList = this.storage('doneList');
    }
  },
  mounted() {
    const scrollArray = [...document.querySelectorAll('.scroll')];
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
    Header,
    ItemModal,
    ItemFrame,
  },
  methods: {
    getTime() {
      this.dateObj.year = this.$dayjs().year();
      this.dateObj.month = this.$dayjs().format('MMM');
      this.dateObj.date = this.$dayjs().date();
    },
    addListBrief(event) {
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
      this.storage('todoList', this.todoList);
      this.$nextTick(() => {
        document.getElementById('inputText').value = '';
      });
    },
    addListDetail(modalObj, index) {
      if (!modalObj.id) {
        const timeStamp = Math.floor(Date.now());
        modalObj.id = timeStamp;
        switch (modalObj.state) {
          case 'todo':
            this.todoList.push(modalObj);
            this.showModal = false;
            this.storage('todoList', this.todoList);
            break;
          case 'doing':
            this.doingList.push(modalObj);
            this.showModal = false;
            this.storage('doingList', this.doingList);
            break;
          default:
            this.doneList.push(modalObj);
            this.showModal = false;
            this.storage('doneList', this.doneList);
        }
      } else {
        switch (modalObj.state) {
          case 'todo':
            this.todoList.splice(index, 1, modalObj);
            this.showInsideModal = false;
            this.storage('todoList', this.todoList);
            break;
          case 'doing':
            this.doingList.splice(index, 1, modalObj);
            this.showInsideModal = false;
            this.storage('doingList', this.doingList);
            break;
          default:
            this.doneList.splice(index, 1, modalObj);
            this.showInsideModal = false;
            this.storage('doneList', this.doneList);
        }
      }
    },
    lastList(item, index) {
      if (item.state === 'doing') {
        this.doingList.splice(index, 1);
        item.state = 'todo';
        this.todoList.push(item);
        this.storage('todoList', this.todoList);
        this.storage('doingList', this.doingList);
      } else {
        this.doneList.splice(index, 1);
        item.state = 'doing';
        this.doingList.push(item);
        this.storage('doingList', this.doingList);
        this.storage('doneList', this.doneList);
      }
    },
    nextList(item, index) {
      if (item.state === 'todo') {
        this.todoList.splice(index, 1);
        item.state = 'doing';
        this.doingList.push(item);
        this.storage('todoList', this.todoList);
        this.storage('doingList', this.doingList);
      } else {
        this.doingList.splice(index, 1);
        item.state = 'done';
        this.doneList.push(item);
        this.storage('doingList', this.doingList);
        this.storage('doneList', this.doneList);
      }
    },
    removeItem(item, index) {
      switch (item.state) {
        case 'todo':
          this.todoList.splice(index, 1);
          this.storage('todoList', this.todoList);
          break;
        case 'doing':
          this.doingList.splice(index, 1);
          this.storage('doingList', this.doingList);
          break;
        default:
          this.doneList.splice(index, 1);
          this.storage('doneList', this.doneList);
      }
    },
    resetState(currentArray, state) {
      currentArray.forEach((currentValue) => {
        if (!(currentValue.state === state)) {
          currentValue.state = state;
        }
      });
    },
    storage(key, value) {
      if (!key) {
        return false;
      }
      if (key && !value) {
        return JSON.parse(localStorage.getItem(key));
      }
      if (key && value) {
        localStorage.setItem(key, JSON.stringify(value));
      }
      return false;
    },
  },
};
</script>
