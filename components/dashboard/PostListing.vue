<template>
  <div>
    <!-- POST NEW AD FORM START -->
    <div class="row">
      <div class="col-md-12">
        <form-wizard class="form-wizard" @onComplete="createAd">
          <tab-content title="Your Ad Category" :selected="true">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="category_id"
                    >Select a category <span class="text-danger">*</span></label
                  >
                  <select
                    class="form-control"
                    :class="hasError('category_id') ? 'is-invalid' : ''"
                    name="category_id"
                    v-model="formData.category_id"
                  >
                    <option value="" selected>Please select a category.</option>
                    <option
                      v-for="category in allCategories"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>

                  <div v-if="errors && errors.category_id" class="text-danger">
                    {{ errors.category_id[0] }}
                  </div>
                  <div v-if="hasError('category_id')" class="invalid-feedback">
                    <div
                      class="text-danger"
                      v-if="!$v.formData.category_id.required"
                    >
                      Please select a category.
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="subcategory_id"
                    >Select a subcategory
                    <span class="text-danger">*</span></label
                  >
                  <select
                    class="form-control"
                    :class="hasError('subcategory_id') ? 'is-invalid' : ''"
                    name="subcategory_id"
                    v-model="formData.subcategory_id"
                    :disabled="allSubcategories == null"
                  >
                    <option value="" selected>
                      Please select a subcategory
                    </option>
                    <option
                      v-for="subcategory in allSubcategories"
                      :key="subcategory.id"
                      :value="subcategory.id"
                    >
                      {{ subcategory.name }}
                    </option>
                  </select>
                  <div
                    v-if="errors && errors.subcategory_id"
                    class="text-danger"
                  >
                    {{ errors.subcategory_id[0] }}
                  </div>
                  <div
                    v-if="hasError('subcategory_id')"
                    class="invalid-feedback"
                  >
                    <div
                      class="error"
                      v-if="!$v.formData.subcategory_id.required"
                    >
                      Please select a subcategory.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </tab-content>

          <tab-content title="Your Ad Details">
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="name"
                    >Ad Name <span class="text-danger">*</span></label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter name that best describes your product or service"
                    v-model="formData.name"
                  />
                  <div v-if="errors && errors.name" class="text-danger">
                    {{ errors.name[0] }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="price">Ad Price</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter only numbers (e.g. 20000)"
                    v-model="formData.price"
                  />
                  <div v-if="errors && errors.price" class="text-danger">
                    {{ errors.price[0] }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="adtype"
                    >Ad Type <span class="text-danger">*</span></label
                  >
                  <select
                    class="form-control"
                    v-model="formData.listing_type_id"
                  >
                    <option value="" disabled selected>
                      Select an ad type
                    </option>
                    <option
                      v-for="adtype in adType"
                      :key="adtype.id"
                      :value="adtype.id"
                    >
                      {{ adtype.name }}
                    </option>
                  </select>
                  <div
                    v-if="errors && errors.listing_type_id"
                    class="text-danger"
                  >
                    {{ errors.listing_type_id[0] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="addescription">Ad Description</label>
                  <div style="height: 200px"
                    class="quill-editor"
                    :content="content"
                    @change="onEditorChange($event)"
                    v-quill:myQuillEditor="editorOption"
                  ></div>
                  <div v-if="errors && errors.description" class="text-danger">
                    {{ errors.description[0] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group" v-if="allStates">
                  <label for="state_id"
                    >State <span class="text-danger">*</span></label
                  >
                  <select class="form-control" v-model="formData.state_id">
                    <option value="" selected>Select State:</option>
                    <option
                      v-for="state in allStates"
                      :key="state.id"
                      :value="state.id"
                    >
                      {{ state.name }}
                    </option>
                  </select>
                  <div v-if="errors && errors.state_id" class="text-danger">
                    {{ errors.state_id[0] }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="city_id"
                    >City <span class="text-danger">*</span></label
                  >
                  <select
                    class="form-control"
                    v-model="formData.city_id"
                    :disabled="allCities == null"
                  >
                    <option value="" selected>Select City:</option>
                    <option
                      v-for="city in allCities"
                      :key="city.id"
                      :value="city.id"
                    >
                      {{ city.name }}
                    </option>
                  </select>
                  <div v-if="errors && errors.city_id" class="text-danger">
                    {{ errors.city_id[0] }}
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="form-group">
                  <label for="address">Street Address</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Emter street address where this product is located (e.g. No 31, Pope John Paul Street, Maitama )"
                    v-model="formData.address"
                  />
                  <div v-if="errors && errors.address" class="text-danger">
                    {{ errors.address[0] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="form-group">
                  <label for="advideo">Video</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="https://www.youtube.com/watch?v=YKSNBIlM_bY"
                    v-model="formData.video"
                  />
                  <div v-if="errors && errors.video" class="text-danger">
                    {{ errors.video[0] }}
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-group tag-group">
                  <label for="tags">Tags</label>
                  <div class="input-group mb-2">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="phone, gadget, electronic"
                      aria-label="Tags*"
                      id="tags"
                      v-on:keyup.enter="addTag"
                      aria-describedby="button-addon2"
                      v-model="tagItem"
                    />
                    <div class="input-group-append">
                      <button
                        class="btn btn-outline-secondary btn-sm add-tag-btn"
                        type="button"
                        id="button-addon2"
                        @click="addTag"
                      >
                        <i class="ti-plus"></i> Add Tag
                      </button>
                    </div>
                  </div>
                  <div v-if="errors && errors.tags" class="text-danger">
                    {{ errors.tags[0] }}
                  </div>
                  <div v-if="tagError">
                    <small class="text-danger">{{ tagError }}</small>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <ul class="tag-list">
                        <li
                          v-for="(tag, index) in formData.tags"
                          :key="index"
                          class="
                            badge
                            rounded-pill
                            pt-2
                            pb-2
                            pl-3
                            pr-3
                            mb-2
                            border
                            mr-2
                          "
                        >
                          {{ tag
                          }}<span
                            @click="removeTag(tag)"
                            class="badge badge-danger ml-2"
                            ><i class="fas fa-times"></i
                          ></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Upload ad image -->
              <div class="col-12">
                <div class="ps-profile-setting__upload">
                  <h5>Ad Images <small>(jpg, png, minimum of 3 images)</small></h5>
                  <div class="ps-profile-setting__uploadarea">
                    <!-- <label for="pictures" class="btn ps-btn pl-3 pr-3"
                      >Select File</label
                    > or Drag and Drop the image down below <i class="far fa-hand-point-down"></i> -->
                    <div class="dropzone-wrapper">
                      <div class="dropzone-desc">
                        <i class="fa fa-download"></i>
                        <p>Choose an image file or drag it here.</p>
                      </div>
                      <input type="file"
                      class="dropzone"
                      name="pictures"
                      id="pictures"
                      style="z-index: 999;"
                      @change="onImageChange"
                      @drop="onImageChange"
                      multiple>
                    </div>
                  </div>
                  <div class="row">
                    <div v-for="(picture, index) in formData.pictures" :key="index" class="col-3 ps-profile-setting__imgs float-left" style="padding: 2px">
                      <label>
                        <span>
                          <img

                            :src="createPictureUrl(picture)"
                            alt="Image Description"
                            style="height: 130px; width: 100%; object-fit: cover"
                          />
                          <a @click="deletePicture(index)" href="javascript:void(0);" class="ps-trash"
                            ><span><i class="ti-trash"></i></span
                          ></a>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Upload ad image -->
            </div>
          </tab-content>
        </form-wizard>
      </div>
    </div>
    <!-- POST NEW AD FORM END -->
  </div>
</template>

<script>
import { ValidationHelper } from "vue-step-wizard";
import { required } from "vuelidate/lib/validators";

export default {
  name: "PostAd",
  mixins: [ValidationHelper],
  data() {
    return {
      formData: {
        tags: [],
        category_id: "",
        subcategory_id: "",
        description: this.content,
        pictures: [],
        name: '',
        listing_type_id: '',
        country_id: '',
        state_id: '',
        city_id: '',
        address: '',
        video: '',
        price: '',
        latitude: '',
        longitude: '',
      },
      tagItem: "",
      tagError: "",
      errors: {},
      action: "/user/listing",
      allCategories: null,
      allSubcategories: null,
      allCountries: null,
      allStates: null,
      allCities: null,
      adType: null,
      validationRules: [
        { category_id: { required }, subcategory_id: { required } },
      ],
      content: "",
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            [{'list': 'ordered'}, {'list': 'bullet'}, 'bold']
          ],
        },
      },
      createdPictures: [],
      // allPictures: [],

    };
  },
  mounted() {
    this.$axios.$get("/front/country").then((response) => {
      this.allCountries = response.data;
      console.log('Countries: ', this.allCountries)
    });
    this.$axios.$get("/front/state").then((response) => {
      this.allStates = response.data;
      console.log('States: ', this.allStates)
    });
    this.$axios.$get("/front/category").then((response) => {
      this.allCategories = response.data;
      console.log('Categories: ', this.allCategories)
    });
    this.$axios.$get("/front/listing-type").then((response) => {
      this.adType = response.data;
      console.log('adType: ', this.allStates)
    });
  },
  watch: {
    "formData.category_id": function (val, oldVal) {
      // make city field to be null
      this.formData.subcategory_id = null;

      this.getSubcategories(val);
    },
    "formData.state_id": function (val, oldVal) {
      // make city field to be null
      this.formData.city_id = null;

      this.getCities(val);
    },
  },
  methods: {
    async createAd() {
      let data = new FormData;

      // append pictures
      this.formData.pictures.forEach((picture) => {
        data.append('ad_pictures[]', picture);
      });

      this.formData.tags.forEach((tag) => {
        data.append('tags[]', tag);
      });

      data.append('name', this.formData.name);
      data.append('description', this.formData.description);
      data.append('listing_type_id', this.formData.listing_type_id);
      data.append('category_id', this.formData.category_id);
      data.append('subcategory_id', this.formData.subcategory_id);
      data.append('country_id', this.formData.country_id);
      data.append('state_id', this.formData.state_id);
      data.append('city_id', this.formData.city_id);
      data.append('address', this.formData.address);
      data.append('video', this.formData.video);
      data.append('price', this.formData.price);
      data.append('latitude', this.formData.latitude);
      data.append('longitude', this.formData.longitude);

      this.errors = {};
      await this.$axios
        .$post(this.action, data, {'Content-Type': 'multipart/form-data'})
        .then((response) => {
          console.log(response)
          this.formData = {}; //Clear input formData.

          // display success message
          this.$toast.success("Ad Created Successfully", {
            icon: {
              name: "check",
              after: false,
            },
            action: {
              text: "OK",
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
              class: "toastCust",
            },
            position: "bottom-center",
            duration: 4000,
            keepOnHover: true,
            iconPack: "fontawesome",
            theme: "bubble",
          });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors || {};
          }
          if (error.response.status === 500) {
            alert("Something went wrong. Please try again!");
          }
        });
    },
    addTag() {
      // clear error
      this.tagError = "";

      // dont allow user to add empty tag
      if (this.tagItem == "" || this.formData.tags === null) {
        this.tagError = "enter a tag";
      } else {
        // split the string into an array
        var arrayItems = this.tagItem.split(",");

        arrayItems.forEach((element) => {
          // remove space from begining and ending of string
          let result = element.trim();

          // add the tag
          if (result != "" && result != null) this.formData.tags.push(result);
        });

        // empty the input field
        this.tagItem = "";
      }

      // focus on the input field so that user can add new tag
      document.getElementById("tags").focus();
    },
    removeTag(tag) {
      const index = this.formData.tags.indexOf(tag);
      if (index > -1) {
        this.formData.tags.splice(index, 1);
      }
    },
    async getSubcategories(id) {
      // make all state city property null
      this.allSubcategories = null;

      await this.$axios
        .$get("/front/subcategories/" + id)
        .then((response) => {
          this.allSubcategories = response.data;
          console.log(this.allSubcategories)
        });
    },
    async getCities(id) {
      // make all state city property null
      this.allCities = null;

      await this.$axios.$get("/front/state-cities/" + id).then((response) => {
        this.allCities = response.data;
      });
    },
    async onEditorChange({ editor, html, text }) {
      // console.log('editor change!', editor, html, text)
      this.formData.description = html;
    },
    // image field detector
    onImageChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      files.forEach((file) => {
        // add file with .png or .jpeg
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
          this.formData.pictures.push(file);
        };

      });

      // clear image field
      document.getElementById('pictures').value = "";

    },
    createPictureUrl(picture){
      const url = URL.createObjectURL(picture);
      return url
    },
    deletePicture(index) {
      if (this.formData.pictures[index] != undefined) {
        this.formData.pictures.splice(index, 1);
      }
    },
  },
};
</script>


<style>
.form-wizard {
  width: 100% !important;
  background-color: transparent !important;
}
.step-body {
  background-color: transparent !important;
  border-radius: 0 !important;
  width: 100% !important;
  -webkit-box-shadow: unset !important;
  box-shadow: unset !important;
  padding: 0 !important;
  margin-top: 40px !important;
}
.step-body,
.step-footer {
  margin-top: 20px;
}
.vue-step-wizard {
  padding: 0 !important;
}
.step-progress .bar {
  background-color: var(--primary-color) !important;
}
.step-pills {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background-color: transparent;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0;
  border-radius: 0 !important;
  -webkit-box-shadow: unset !important;
  box-shadow: unset !important;
}
.step-pills .step-item.active {
  border: 2px solid var(--primary-color) !important;
}
.tabStatus {
  background: rgb(206 190 63);
}
.step-button {
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  position: relative;
  max-width: 30rem;
  text-align: center;
  border: 1px solid;
  border-radius: 5px;
  color: #22292f;
  color: rgba(34, 41, 47, var(--text-opacity));
  padding: 0.8rem 1.25rem;
  font-size: 0.875rem;
  margin: 0.5rem;
  color: #fff;
  outline: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
}
.step-button-next {
  background-color: var(--primary-color) !important;
}
.step-button-submit {
  background-color: #03b135 !important;
}
.step-button-previous {
  background-color: #767676d4 !important;
}
.step-pills .step-item {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 5px 20px;
  list-style-type: none;
  padding: 0.5rem 1.5rem;
}
.form-group label {
  font-weight: 600;
}
.tag-list {
  display: flex;
  flex-wrap: wrap;
}
.tag-list li {
  /* flex: 1 0 21% !important; */
  float: left;
}
.tag-group .add-tag-btn {
  border: 1px solid #adadad99;
}
/* DROPZONE CODE */
.dropzone-desc {
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  text-align: center;
  width: 40%;
  top: 35px;
  font-size: 16px;
}
.dropzone-wrapper {
  border: 2px dashed #91b0b3;
  color: #92b0b3;
  position: relative;
  width: 100%;
  height: 150px;
}
.dropzone,
.dropzone:focus {
  outline: none !important;
  width: 100%;
  height: 150px;
  cursor: pointer;
  opacity: 0;
}
.dropzone-wrapper:hover,
.dropzone-wrapper.dragover {
  background: #ecf0f5;
}
/***** DROPZONE CODE */


@media screen and (max-width: 768px) {
  .step-item {
    border-radius: 0 !important;
  }
  .step-pills .step-item {
    background-color: #f5f5f5;
    border-radius: 10px;
    padding: 5px 20px;
    list-style-type: none;
    padding: 0.2rem 0.5rem;
  }
  span.tabLabel {
    display: block !important;
    font-size: 13px !important;
  }
}
</style>

