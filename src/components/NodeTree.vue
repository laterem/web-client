<template>
  <span
    class="caret"
    :class="{ 'caret-down': isActive }"
    @click="isActive = !isActive"
  >
    <input
      :value="nodeName"
      :name="categoryIdName"
      :id="categoryIdName"
      disabled="true"
    />
    <!-- Here must go buttons
        of category name editing
        v-if="isEditable" -->
  </span>
  <ul v-show="isActive" :id="categoryUlId">
    <!-- Category render -->
    <li v-for="child in childrenCategories" v-show="isActive" :key="child">
      <NodeTree :node="child"></NodeTree>
    </li>
    <!-- Work render -->
    <li v-for="child in childrenWorks" v-show="isActive" :key="child">
      <span style="border: none">
        <router-link :to="'/student/works/' + child.id">{{
          child.name
        }}</router-link>
      </span>
      <!-- Progress line -->
    </li>
  </ul>
</template>

<script>
import NodeTree from "./NodeTree.vue";

export default {
  name: "NodeTree",
  components: {
    NodeTree,
  },
  props: {
    node: Object,
    isEditable: Boolean,
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    childrenCategories() {
      let _childrenCategories = [];
      for (let i = 0; i < this.node.children.length; i++) {
        if (this.node.children[i].type == "category") {
          _childrenCategories.push(this.node.children[i]);
        }
      }
      return _childrenCategories.length ? _childrenCategories : undefined;
    },
    childrenWorks() {
      let _childrenWorks = [];
      for (let i = 0; i < this.node.children.length; i++) {
        if (this.node.children[i].type == "work") {
          _childrenWorks.push(this.node.children[i]);
        }
      }
      return _childrenWorks.length ? _childrenWorks : undefined;
    },
    nodeName() {
      return this.node.name;
    },
    categoryIdName() {
      return "input-" + this.node.id;
    },
    categoryUlId() {
      return "category-id-" + this.node.id;
    },
  },
};
</script>
