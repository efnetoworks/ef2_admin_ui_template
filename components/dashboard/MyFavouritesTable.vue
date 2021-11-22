<template>
  <!-- POSTED ADS START -->
  <div class="ps-posted-ads ps-my-ads">
    <div class="ps-posted-ads__heading">
      <h5>
        My Favourite Ads
        <span v-if="favourite_ads.data && favourite_ads.data.length != 0">
          ({{ favourite_ads.from }} - {{ favourite_ads.to }})
        </span>
      </h5>
    </div>

    <div v-if="$fetchState.pending">Fetching ads...</div>
    <div v-else-if="$fetchState.error">error fetching ads...</div>
    <div v-else>
      <div v-if="favourite_ads.data && favourite_ads.data.length == 0">
        <div class="ps-no-ads" style="display: block">
          <div>
            <figure>
              <img src="images/grid-list/img-03.png" alt="Image Description" />
            </figure>
            <h5>No Favourite Ad Yet :(</h5>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="ps-items-heading">
          <h6>Title</h6>
          <h6>Status</h6>
          <h6>Actions</h6>
        </div>
        <ul>
          <li>
            <div v-for="(ad, index) in favourite_ads.data" :key="ad.id">
              <div class="ps-posted-ads__title">
                <h6>Title</h6>
                <div>
                  <figure>
                    <img
                      src="~assets/images/insights/icon/img-01.jpg"
                      alt="Images Description"
                    />
                  </figure>
                  <div class="ps-description">
                    <h5>${{ ad.listing.price }}</h5>
                    <h6>{{ ad.listing.name }}</h6>
                  </div>
                </div>
              </div>
              <div class="ps-posted-ads__status">
                <h6>Status</h6>
                <button v-if="ad.listing.featured == 1" class="btn ps-btn ps-featured" style="margin-bottom: 5px">Featured</button>
                <button v-if="ad.listing.status == 1" class="btn ps-btn ps-active" style="margin-bottom: 5px">Active</button>
                <button v-if="ad.listing.status == 0" class="btn ps-btn ps-inactive">Inactive</button>
              </div>
              <div class="ps-posted-ads__actions">
                <h6>Actions</h6>
                <span
                  ><NuxtLink
                    :to="`/listing/${ad.listing.slug}`"
                    target="_blank"
                    class="ps-edit"
                    ><i class="ti-eye"></i> View</NuxtLink
                  ><span>/</span>
                  <a href="javascript:void(0);" @click="remove_favourite_ad(ad.listing.id, index)" class="ps-delete"
                    ><i class="ti-trash"></i> Remove</a
                  ></span
                >
              </div>
            </div>
          </li>
        </ul>

        <div class="ps-page">
          <div class="ps-button-left">
            <button
              :disabled="favourite_ads.prev_page_url == null"
              @click="
                fetchPaginationFavouriteAds(favourite_ads.current_page - 1)
              "
              class="btn ps-btn"
            >
              <span class="lnr lnr-chevron-left"></span>
            </button>
          </div>
          <div class="ps-button-num">
            <template v-for="(link, index) in favourite_ads.links">
              <button
                :disabled="favourite_ads.current_page == link.label"
                @click="fetchPaginationFavouriteAds(link.label)"
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
              :disabled="favourite_ads.next_page_url == null"
              @click="
                fetchPaginationFavouriteAds(favourite_ads.current_page + 1)
              "
              class="btn ps-btn disabled"
            >
              <span class="lnr lnr-chevron-right"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- POSTED ADS END -->
</template>

<script>
export default {
  name: "ServicesTable",
  data() {
    return {
      favourite_ads: [],
      page_number: 1,
    };
  },
  methods: {
    fetchPaginationFavouriteAds(page) {
      // show loader
      this.page_number = page;

      // run fetch
      this.$fetch();
    },
    async remove_favourite_ad(listing_id, index) {

      const data = {
        listing_id: listing_id
      }

      var vm = this

      console.log(this.favourite_ads)

      await this.$axios.$post("/user/favourite-listing", data).then(response => {
        location.reload();
      });
    },
  },
  async fetch() {
    // fetch user ads
    this.favourite_ads = await this.$axios.$get(
      "/user/favourite-listing?page=" + this.page_number
    );
  },

  // call fetch only on client-side
  fetchOnServer: false,
};
</script>

<style lang="scss" scoped></style>
