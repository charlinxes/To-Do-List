<template>
  <div class="border-2 border-gray-600 border-opacity-40 relative transition-shadow duration-500 hover:shadow-md"
    :class="{'bg-yellow-100': state === 'todo','hover:bg-yellow-50': state === 'todo','bg-blue-100': state === 'doing',
    'hover:bg-blue-50': state === 'doing', 'bg-green-100': state === 'done', 'hover:bg-green-50': state === 'done'}">
    <div class="group absolute top-2/4 left-0 transform -translate-x-1/2 -translate-y-1/2" v-if="!(state === 'todo')" style="width:1.875rem;height:1.875rem">
      <div class="absolute rounded-full bg-primary w-full h-full opacity-50 group-hover:animate-ping"/>
      <div class="relative rounded-full bg-gray-500 w-full h-full group-hover:bg-primary">
        <font-awesome-icon icon="chevron-circle-right" rotation="180" @click="$emit('last-list')" class="text-3xl"
         :class="{'text-blue-50': state === 'doing','text-green-50': state === 'done'}"/>
      </div>
    </div>
    <div class="group absolute top-2/4 right-0 transform translate-x-1/2 -translate-y-1/2" v-if="!(state === 'done')" style="width:1.875rem;height:1.875rem">
      <div class="absolute rounded-full bg-primary w-full h-full opacity-50 group-hover:animate-ping"/>
      <div class="relative rounded-full bg-gray-500 w-full h-full group-hover:bg-primary">
        <font-awesome-icon icon="chevron-circle-right" @click="$emit('next-list')" class="text-3xl"
         :class="{'text-yellow-50': state === 'todo','text-blue-50': state === 'doing'}"/>
      </div>
    </div>
    <div class="group">
      <h3 class="text-2xl font-bold truncate"
       :class="{'group-hover:text-yellow-500': state === 'todo','group-hover:text-blue-500': state === 'doing','group-hover:text-primary': state === 'done'}">
        {{title}}
      </h3>
      <div class="mb-1 multiline-ellipsis">
        {{description}}
      </div>
      <div class="flex border-t-2 border-gray-600 border-opacity-40 mb-1">
        <button class="flex-1 p-1" @click="$emit('show-modal')"><font-awesome-icon icon="list-ul" class="text-lg text-gray-500"
         :class="{'group-hover:text-yellow-500': state === 'todo','group-hover:text-blue-500': state === 'doing','group-hover:text-primary': state === 'done'}"/></button>
        <span class="flex-auto border-l-2 border-r-2 border-gray-600 border-opacity-40 p-1 inline-block" v-if="!(due_date)">新增日：{{month}} {{date}} </span>
        <span class="flex-auto border-l-2 border-r-2 border-gray-600 border-opacity-40 p-1 inline-block text-red-400" v-if="due_date">期限日：{{due_date | dateFilter}} </span>
        <button class="flex-1 p-1" @click="$emit('remove-item')"><font-awesome-icon icon="trash-alt" class="text-lg text-gray-500 group-hover:text-red-500"/></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    state: {
      type: String,
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

<style>
  .multiline-ellipsis {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
</style>
