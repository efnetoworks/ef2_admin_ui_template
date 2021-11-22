<template>
  <!-- POSTED ADS START -->
  <div class="ps-posted-ads ps-my-ads">
    <div class="ps-posted-ads__heading">
      <h5>
        My Posted Ads
        <span v-if="listings.data && listings.data.length != 0">
          ({{ listings.from }} - {{ listings.to }})
        </span>
      </h5>
      <NuxtLink to="/user/post-ad" class="btn ps-btn">Post Ad</NuxtLink>
    </div>

    <div v-if="$fetchState.pending" style="height: 300px; display:flex;justify-content:center;align-items:center">Fetching ads...</div>
    <div v-else-if="$fetchState.error" style="height: 300px; display:flex;justify-content:center;align-items:center">error fetching ads...</div>
    <div v-else>
        <div class="ps-items-heading">
          <h6>Title</h6>
          <h6>Status</h6>
          <h6>Package</h6>
          <h6 class="text-center">Actions</h6>
        </div>
        <ul>
          <li>
            <div v-for="ad in listings.data" :key="ad.id">
              <div class="ps-posted-ads__title">
                <h6>Title</h6>
                <div>
                  <figure v-if="ad.images[0]">
                    <img
                      width="50px"
                      height="50px"
                      :src="ad.images[0]['full_url']"
                      alt="Images Description"
                    />
                  </figure>
                  <figure v-else>
                    <img
                      src="~assets/images/insights/icon/img-01.jpg"
                      alt="Images Description"
                    />
                  </figure>
                  <div class="ps-description">
                    <h5 :title="ad.name">{{ $trimString(ad.name, 25) }}</h5>
                    <h6 v-if="ad.status == 0">
                      <span class="text-danger">Please select a package</span>
                    </h6>
                    <h6 v-else>
                      <span class="text-success"
                        >Package is set for this listing</span
                      >
                    </h6>
                  </div>
                </div>
              </div>
              <div class="ps-posted-ads__status">
                <h6>Status</h6>
                <button
                  v-if="ad.featured == 1"
                  class="btn ps-btn ps-featured"
                  style="margin-bottom: 5px"
                >
                  Featured
                </button>
                <button
                  v-if="ad.status == 1"
                  class="btn ps-btn ps-active"
                  style="margin-bottom: 5px"
                >
                  Active
                </button>
                <button v-if="ad.status == 0" class="btn ps-btn ps-inactive">
                  Inactive
                </button>
              </div>
              <div class="ps-posted-ads__status">
                <h6>Package</h6>
                <div class="select">
                  <select
                    name="package"
                    @change="changePackage($event, ad.id)"
                    v-if="user_packages"
                  >
                    <option
                      :value="userPackage.id"
                      v-for="userPackage in user_packages.data"
                      :key="userPackage.id"
                      :selected="
                        ad.current_package &&
                        ad.current_package.id == userPackage.id
                      "
                    >
                      {{ userPackage.package.name }}({{
                        userPackage.package.number_of_listings
                      }})
                    </option>
                  </select>
                  <select v-else>
                    <option>No Package</option>
                  </select>
                </div>
              </div>
              <div class="ps-posted-ads__actions">
                <h6>Actions</h6>
                <!-- <span
                  ><NuxtLink
                    :to="`/listing/${ad.slug}`"
                    class="ps-edit"
                    target="_blank"
                    ><i class="ti-eye"></i> View</NuxtLink
                  ><span>/</span>
                  <NuxtLink :to="`edit-listing/${ad.slug}`" class="ps-edit">
                    <i class="ti-pencil"></i> Edit</NuxtLink
                  >
                  <span>/</span
                  ><a href="javascript:void(0);" class="ps-delete"
                    ><i class="ti-trash"></i> Delete</a
                  ></span
                > -->
                <!-- <div></div>  src="~/assets/images/actionbtn.png" -->
                <img alt="" />
                <div id="menu">
                  <input type="checkbox" id="menu-toggle" />
                  <ul>
                    <li>
                      <NuxtLink
                    :to="`/listing/${ad.slug}`"><i class="ti-eye"></i> View</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink :to="`edit-listing/${ad.slug}`"><i class="ti-pencil"></i> Edit</NuxtLink>
                    </li>
                    <li>
                      <NuxtLink :to="`delete-listing/${ad.slug}`"><i class="ti-trash"></i> Delete</NuxtLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div class="ps-page">
          <div class="ps-button-left">
            <button
              :disabled="listings.prev_page_url == null"
              @click="fetchPaginationListings(listings.current_page - 1)"
              class="btn ps-btn"
            >
              <span class="lnr lnr-chevron-left"></span>
            </button>
          </div>
          <div class="ps-button-num">
            <template v-for="(link, index) in listings.links">
              <button
                :disabled="listings.current_page == link.label"
                @click="fetchPaginationListings(link.label)"
                class="btn ps-btn"
                :key="index"
                v-if="
                  link.label != '&laquo; Previous' &&
                  link.label != 'Next &raquo;'
                "
                :class="{ 'ps-active': link.active }"
              >
                <span>{{ link.label }}</span>
              </button>
            </template>
          </div>
          <div class="ps-button-right">
            <button
              :disabled="listings.next_page_url == null"
              @click="fetchPaginationListings(listings.current_page + 1)"
              class="btn ps-btn disabled"
            >
              <span class="lnr lnr-chevron-right"></span>
            </button>
          </div>
        </div>
      </div>
  </div>
  <!-- POSTED LISTINGS END -->
</template>

<script>
export default {
  name: "ListingsTableDashboard",
  data() {
    return {
      listings: {},
      user_packages: {},
      page_number: 1,
    };
  },
  methods: {
    async changePackage(event, id) {
      let data = new FormData();
      data.append("user_package_id", event.target.value);
      data.append("listing_id", id);

      this.errors = {};
      await this.$axios
        .$post("user/add_listing_to_package", data)
        .then((response) => {
          console.log(response);
          // display success message
          this.$toast.success("Listing was successfully added to Package", {
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
    fetchPaginationListings(page) {
      // show loader
      this.page_number = page;

      // run fetch
      this.$fetch();
    },
  },
  async fetch() {
    // fetch user listings
    this.listings = await this.$axios.$get("/user/listing?page=" + this.page_number)
    this.user_packages = await this.$axios.$get("/user/user-packages");
  },

  // call fetch only on client-side
  fetchOnServer: false,
};
</script>

<style scoped>
select {
   -webkit-appearance:none;
   -moz-appearance:none;
   -ms-appearance:none;
   appearance:none;
   outline:0;
   box-shadow:none;
   border:0!important;
   background: #5c6664;
   background-image: none;
   flex: 1;
   padding: 0 .5em;
   color:#fff;
   cursor:pointer;
   font-size: 13px;
   font-family: 'Open Sans', sans-serif;
}
select::-ms-expand {
   display: none;
}
.select {
   position: relative;
   display: flex;
   width: 90%;
   height: 2.5em;
   line-height: 3;
   background: #5c6664;
   overflow: hidden;
   border-radius: .25em;
}
.select::after {
   content: '\25BC';
   position: absolute;
   top: -3px;
   right: 0;
   padding: 0 .5em;
   background: #2b2e2e;
   cursor:pointer;
   pointer-events:none;
   transition:.25s all ease;
   color: #fff;
}
.select:hover::after {
   color: #23b499;
}

.ps-posted-ads .ps-items-heading h6:first-child {
  padding-left: 20px;
}
.ps-inactive {
  background-color: rgb(252, 124, 124) !important;
  color: #000;
}
@media screen and (min-width: 768px) {
  .ps-posted-ads .ps-items-heading,
  .ps-posted-ads li > div {
    display: grid;
    grid-template-columns: 2fr 0.5fr 1fr 0.5fr;
    align-items: center;
    border-top: 1px solid #eee;
  }
  .ps-posted-ads .ps-items-heading {
    grid-template-columns: 2fr 0.5fr 1fr 0.5fr;
    min-height: 40px;
  }
}

#menu {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 500;
  height: 40px;
  border-radius: 25px;
  overflow: hidden;
  /* background: #00BCD4; */
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); */
  transition: all 0.5s ease;
}
#menu > * {
  float: left;
}

#menu-toggle {
  display: block;
  cursor: pointer;
  opacity: 0;
  z-index: 999;
  margin: 0;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
}
#menu-toggle:checked ~ ul {
  width: 250px;
  background-position: 0px -50px;
  background-color: #CEBE3F;
}

#menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0 0 0 50px;
  height: 50px;
  width: 0px;
  transition: 0.5s width ease;
  /* background-image: url("https://i.imgur.com/3d0vJzn.png"); */
  background-image: url("/assets/images/actionbtn.png");
  background-repeat: no-repeat;
  background-position: 0px 0px;
}

#menu li {
  display: inline-block;
  line-height: 40px;
  width: 50px;
  text-align: center;
  margin: 0;
}
#menu li a {
  font-size: 14px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}
#menu li a:hover {
  opacity: .7;
}
#menu li a:hover i {
  opacity: .7;
  color: white;
}
</style>
