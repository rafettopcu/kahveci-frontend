<template>
  <div>
    <a-button shape="round" size="large" icon="plus" type="primary"
      >Yeni Ürün Ekle</a-button
    >
    <a-table :columns="columns" :dataSource="products">
      <a slot="name" slot-scope="text, record">
        <span v-if="editId && editId === record._id"></span>
        <span v-else>{{ text }}</span>
      </a>
      <span slot="photo" slot-scope="text">
        <img width="50" :src="text" alt="" />
      </span>
      <span slot="action" slot-scope="text, record">
        <a-row type="flex" :gutter="4">
          <a-col>
            <a-button shape="round" size="small" type="danger">Sil</a-button>
          </a-col>
          <a-col>
            <a-button shape="round" size="small" @click="clickEdit(record._id)"
              >Düzenle</a-button
            >
          </a-col>
        </a-row>
      </span>
    </a-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      columns: [
        {
          title: "name",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "photo",
          dataIndex: "photo",
          key: "photo",
          scopedSlots: { customRender: "photo" }
        },
        {
          title: "price",
          dataIndex: "price",
          key: "price"
        },
        {
          title: "Action",
          key: "action",
          scopedSlots: { customRender: "action" }
        }
      ],

      editId: null
    };
  },
  computed: {
    ...mapState(["products"])
  },
  methods: {
    ...mapActions(["getProducts"]),
    clickEdit(productId) {
      this.editId = productId;
    }
  },
  async created() {
    await this.getProducts();
  }
};
</script>
