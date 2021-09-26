<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 bg-gray-600 bg-opacity-80 z-30">
    <div class="absolute bg-gray-100 top-14 left-2/4 transform -translate-x-1/2
      border border-gray-600 p-1 shadow-lg" style="width:400px;height:500px">
      <div class="relative border-8 border-gray-600 h-full p-3">
        <h3 class="text-3xl text-center pt-3 pb-5">項目詳情</h3>
        <div class="flex mb-5">
          <label for="title" class="text-xl mx-3">標題</label>
          <input type="text" class="border border-gray-500 rounded p-1 focus:outline-none focus:ring focus:border-blue-300" name="title" id="title" placeholder="請輸入標題" v-model="modalObj.title">
        </div>
        <div class="flex mb-5">
          <label for="description" class="text-xl mx-3">說明</label>
          <textarea class="border border-gray-500 rounded p-1 resize-none focus:outline-none focus:ring focus:border-blue-300" name="description" id="description" rows="5" cols="26" placeholder="請輸入內容" v-model="modalObj.description"></textarea>
        </div>
        <div class="flex items-center mb-5" v-if="!index">
          <label for="state" class="text-xl mx-3">狀態</label>
          <div class="flex justify-around w-2/3">
            <label><input type="radio" class="align-middle" name="state" value="todo" v-model="modalObj.state"/> todo</label>
            <label><input type="radio" class="align-middle" name="state" value="doing" v-model="modalObj.state"/> doing</label>
            <label><input type="radio" class="align-middle" name="state" value="done" v-model="modalObj.state"/> done</label>
          </div>
        </div>
        <div class="flex">
          <label for="due_date" class="text-xl mx-3">期限日</label>
          <input type="date" v-model="modalObj.due_date" class="border border-gray-500 focus:outline-none focus:ring focus:border-blue-300" name="due_date" id="due_date">
        </div>
        <button class="absolute right-24 bottom-6 py-2 px-4 border border-red-500  text-red-500 rounded hover:bg-red-500 hover:text-white" @click="$emit('close')">取消</button>
        <button class="absolute right-4 bottom-6 py-2 px-4 border border-primary  text-primary rounded hover:bg-primary hover:text-white" @click="addListDetail">確認</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemModal',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: 'todo',
    },
    due_date: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: 0,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      modalObj: {
        title: this.title,
        description: this.description,
        state: this.state,
        due_date: this.due_date,
        id: this.id,
      },
    };
  },
  methods: {
    addListDetail() {
      this.$emit('add', this.modalObj, this.index);
    },
  },
};
</script>
