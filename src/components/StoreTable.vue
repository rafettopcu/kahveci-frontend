<template>
  <div>
    <h3>Mağazalar</h3>
    <a-row type="flex" gutter="10">
      <a-col :span="6">
        <a-form-item label="Ülke">
          <a-input v-model="newCaffe.country"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="Şehir">
          <a-input v-model="newCaffe.city"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="Şube adı">
          <a-input v-model="newCaffe.district_name"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="Telefon">
          <a-input v-model="newCaffe.phone_number"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="lat">
          <a-input v-model="newCaffe.lat"></a-input>
        </a-form-item>
      </a-col>
      <a-col :span="6">
        <a-form-item label="lng">
          <a-input v-model="newCaffe.lng"></a-input>
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
      >Yeni Şube Ekle</a-button
    >
    <table style="width:100%" class="table">
      <tr>
        <th>country</th>
        <th>city</th>
        <th>district_name</th>
        <th>phone_number</th>
        <th>lat</th>
        <th>lng</th>
        <th></th>
      </tr>
      <tr v-for="(item, index) in caffes" :key="index">
        <td>
          <contenteditable
            tag="div"
            :class="{ edit: item.editMode }"
            :contenteditable="item.editMode"
            v-model="item.country"
            :noNL="true"
          />
        </td>

        <td>
          <contenteditable
            tag="div"
            :class="{ edit: item.editMode }"
            :contenteditable="item.editMode"
            v-model="item.city"
            :noNL="true"
          />
        </td>

        <td>
          <contenteditable
            tag="div"
            :class="{ edit: item.editMode }"
            :contenteditable="item.editMode"
            v-model="item.district_name"
            :noNL="true"
          />
        </td>

        <td>
          <contenteditable
            tag="div"
            :class="{ edit: item.editMode }"
            :contenteditable="item.editMode"
            v-model="item.phone_number"
            :noNL="true"
          />
        </td>

        <td>
          <contenteditable
            tag="div"
            :class="{ edit: item.editMode }"
            :contenteditable="item.editMode"
            v-model="item.lat"
            :noNL="true"
          />
        </td>

        <td>
          <contenteditable
            tag="div"
            :class="{ edit: item.editMode }"
            :contenteditable="item.editMode"
            v-model="item.lng"
            :noNL="true"
          />
        </td>

        <td>
          <a-button
            size="small"
            type="danger"
            style="margin-right:4px"
            @click="deleteCaffe(item._id)"
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
      newCaffe: {
        country: null,
        city: null,
        district_name: null,
        phone_number: null,
        lat: null,
        lng: null
      }
    };
  },
  computed: {
    ...mapState(["caffes"])
  },
  methods: {
    ...mapActions(["getAllCaffes", "addCaffe", "updateCaffe", "deleteCaffe"]),

    async save(item) {
      await this.updateCaffe({
        id: item._id,
        changes: {
          country: item.country,
          city: item.city,
          district_name: item.district_name,
          phone_number: item.phone_number,
          lat: item.lat,
          lng: item.lng
        }
      });
      item.editMode = false;
    },
    add() {
      this.addCaffe(this.newCaffe);
    }
  },
  async created() {
    await this.getAllCaffes();
    console.log(this.caffes);
  }
};
</script>
<style>
.edit {
  border-bottom: 1px solid grey;
}
</style>
