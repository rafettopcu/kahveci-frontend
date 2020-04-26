<template>
  <div>
    <h3>Ürünler</h3>
    <a-row type="flex" gutter="10">
      <a-col :span="6">
        <a-form-item label="Ad">
          <a-input v-model="newProduct.name"></a-input>
        </a-form-item>
      </a-col>

      <a-col :span="6">
        <a-form-item label="Fiyat">
          <a-input v-model="newProduct.price"></a-input>
        </a-form-item>
      </a-col>

      <a-col :span="6">
        <a-form-item label="Görsel linki">
          <a-input v-model="newProduct.photo"></a-input>
        </a-form-item>
      </a-col>

      <a-col :span="6">
        <a-form-item label="Skor var mı?">
          <a-checkbox v-model="newProduct.hasScore"></a-checkbox>
        </a-form-item>
      </a-col>
    </a-row>

    <a-button
      shape="round"
      size="large"
      icon="plus"
      type="primary"
      class="mb-4"
      @click="add"
      >Yeni Ürün Ekle</a-button
    >
    <table style="width:100%" class="table">
      <tr>
        <th>Ad</th>
        <th>Fiyat</th>
        <th>Görsel</th>
        <th>Skor var mı?</th>
        <th></th>
      </tr>
      <tr v-for="(item, index) in products" :key="index">
        <td>
          <contenteditable
            tag="div"
            :class="{ edit: item.editMode }"
            :contenteditable="item.editMode"
            v-model="item.name"
            :noNL="true"
          />
        </td>
        <td>
          <contenteditable
            tag="div"
            :class="{ edit: item.editMode }"
            :contenteditable="item.editMode"
            v-model="item.price"
            :noNL="true"
          />
        </td>
        <td><img :src="item.photo" width="50" alt="" /></td>
        <td>
          <a-checkbox
            v-model="item.hasScore"
            :disabled="!item.editMode"
          ></a-checkbox>
        </td>
        <td>
          <a-button
            size="small"
            type="danger"
            style="margin-right:4px"
            @click="deleteProduct(item._id)"
            >Sil</a-button
          >
          <a-button
            size="small"
            v-if="!item.editMode"
            @click="item.editMode = true"
            >Düzenle</a-button
          >
          <a-button
            size="small"
            v-if="item.editMode"
            @click="
              () => {
                item.editMode = false;
                save(item);
              }
            "
            >Kaydet</a-button
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      editMode: false,
      newProduct: {
        name: null,
        price: null,
        photo: null,
        hasScore: false
      }
    };
  },
  computed: {
    ...mapState(["products"])
  },
  methods: {
    ...mapActions([
      "getProducts",
      "updateProduct",
      "addProduct",
      "deleteProduct"
    ]),
    clickEdit(productId) {
      this.editId = productId;
    },
    async save(item) {
      console.log(item);

      await this.updateProduct({
        id: item._id,
        changes: {
          name: item.name,
          price: item.price,
          hasScore: item.hasScore,
          photo: item.photo
        }
      });
      item.editMode = false;
    },
    add() {
      this.addProduct(this.newProduct);
    }
  },
  async created() {
    await this.getProducts();
  }
};
</script>
<style>
.edit {
  border-bottom: 1px solid grey;
}
</style>
