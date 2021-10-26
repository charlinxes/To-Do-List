# To-Do-List
一個基於 Vue 2 和 Tailwind 構建的待辦事項清單

<a name="table-of-contents"></a>
## 目錄
  1. [內容](#content)
  1. [使用工具](#resources)

<a name="content"></a>
## 內容

  - [1.1](#1.1) <a name='1.1'></a> **項目分類**：<br>
  將所有事項分成未完成、進行中和已完成三項，既可以通過點選前一步和後一步箭頭按鈕來轉移項目，也可以直接按住項目進行拖曳

  - [1.2](#1.2) <a name='1.2'></a> **新增/修改項目**：<br>
  直接在輸入欄鍵入內容可進行項目的快速新增，亦可以選擇新增具體細項，註明項目詳情和期限日期。而無論是何種方式所新增的項目都可以在之後進行完善或修改

  **[⬆ 回到頂端](#table-of-contents)**

<a name="resources"></a>
## 使用工具

  - [2.1](#2.1) <a name='2.1'></a> **Vue-Draggable**：<br>
  引入[Vue-Draggable](https://github.com/SortableJS/Vue.Draggable)來實現列表間項目的拖曳功能，之所以選擇引入封裝過的Vue-Draggable而非引入其底層的SortableJS再自己進行封裝，是因為Vue-Draggable是由官方團隊自身進行封裝的且支援了SortableJS的絕大部分功能，已能完美匹配專案的需求

  - [2.2](#2.2) <a name='2.2'></a> **Tailwind**：<br>
  使用Tailwind的原子化class來拼裝樣式，並利用其響應式、hover、focus等不同情況下方便的樣式設置來快速開發專案。

  - [2.3](#2.3) <a name='2.3'></a> **Dayjs**：<br>
  使用Dayjs來處理時間和日期的格式，較自己編寫dateFilter邏輯來調整日期格式不僅更為方便，且未來要調整或更換其他格式時也更為快捷容易。

  **[⬆ 回到頂端](#table-of-contents)**
