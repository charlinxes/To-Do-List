<template>
  <header class="w-full h-20 flex justify-end items-center mb-10">
    <div class="flex">
      <div class="flex items-center justify-between mr-3">
        <p class="text-5xl mr-1">{{date}}</p>
        <p class="flex flex-col">
          <span>{{month}}</span>
          <span>{{year}}</span>
        </p>
      </div>
      <button type="button" class="bg-transparent border-2 border-black px-3 rounded-full hover:bg-gray-300 mr-3"
       @click="$emit('show-modal')">
        新增具體項目
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    year: {
      type: Number,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },
};
</script>
